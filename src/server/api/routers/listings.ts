import { z } from "zod";

import { createTRPCRouter, protectedProcedure, publicProcedure } from "~/server/api/trpc";

export const listingsRouter = createTRPCRouter({
  list: publicProcedure.query(({
    ctx
  }) => {
    return ctx.prisma.listing.findMany()
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
    z.object({ name: z.string(), description: z.string(), price: z.number() })
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
  })
});
