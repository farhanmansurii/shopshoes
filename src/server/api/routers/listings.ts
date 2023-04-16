import { z } from "zod";

import { createTRPCRouter, protectedProcedure, publicProcedure } from "~/server/api/trpc";

export const listingsRouter = createTRPCRouter({
  list: publicProcedure.query(({
    ctx
  }) => {
    return ctx.prisma.listing.findMany()
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
