import { useAuth, useUser } from "@clerk/nextjs";
import { clerkClient } from "@clerk/nextjs/server";
import { z } from "zod";

import { createTRPCRouter, protectedProcedure, publicProcedure } from "~/server/api/trpc";

export const listingsRouter = createTRPCRouter({
  list: publicProcedure.query(({
    ctx
  }) => {
    return ctx.prisma.listing.findMany()
  }),
  getMessages: publicProcedure.query(({
    ctx,
  }) => {
    const userId = ctx.auth?.userId
    return ctx.prisma.listing.findMany({
      where: {
        userId: userId || ''
      }, include: {
        message: true
      }
    })

  }),
  sendMessage: protectedProcedure
    .input(z.object({ message: z.string(), fromUserName: z.string(), fromUser: z.string(), listingId: z.string() }))
    .mutation(async ({ input, ctx }) => {

      const message = await ctx.prisma.message.create({
        data: {
          fromUser: input.fromUser,
          fromUserName: input.fromUserName,
          listingId: input.listingId,
          message: input.message,
        },
      });
      return message;
    }),
  deleteList: publicProcedure.query(({
    ctx
  }) => {
    return ctx.prisma.listing.findMany()
  }),

  listUnique: publicProcedure.input(
    z.object({
      userId: z.string()
    })
  ).query(({
    ctx, input
  }) => {
    return ctx.prisma.listing.findMany({
      where: {
        userId: input.userId
      }
    })
  }),

  get: publicProcedure.input(
    z.object({ id: z.string() })
  ).query(({
    ctx, input
  }) => {
    return ctx.prisma.listing.findUnique({
      where: {
        id: input.id
      }
    })
  }),
  create: protectedProcedure.input(
    z.object({ name: z.string(), description: z.string(), price: z.number(), image: z.string(), isOriginal: z.boolean(), size: z.string(), condition: z.string() })
  ).mutation(async ({ input, ctx }) => {
    if (!ctx.prisma || !ctx.prisma.listing) {
      throw new Error('Prisma context not initialized correctly');
    }
    await ctx.prisma.listing.create({
      data: {
        ...input, userId: ctx.auth.userId
      }
    });
    return { success: true };
  }),
  delete: protectedProcedure.input(
    z.object({ id: z.string() })
  ).mutation(async ({ input, ctx }) => {
    if (!ctx.prisma || !ctx.prisma.listing) {
      throw new Error('Prisma context not initialized correctly');
    }
    const listing = await ctx.prisma.listing.findUnique({ where: { id: input.id } });
    if (!listing) {
      throw new Error(`Listing with ID ${input.id} not found`);
    }
    if (listing.userId !== ctx.auth.userId) {
      throw new Error('You are not authorized to delete this listing');
    }
    await ctx.prisma.listing.delete({ where: { id: input.id } });
    return { success: true };
  })
});
