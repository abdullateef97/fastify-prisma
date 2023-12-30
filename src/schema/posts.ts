import { Prisma } from '@prisma/client';

export const postSchema = {
  select: {
    id: true,
    author: true,
    content: true,
    title: true,
    createdAt: true,
    updatedAt: true
  },
};

export type Post = Prisma.PostGetPayload<typeof postSchema>;