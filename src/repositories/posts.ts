import { Prisma } from "@prisma/client"
import { prisma as prismaClient } from "../helpers/utils"
import { Post, postSchema } from "../schema/posts";


export const createPostRepo = async (data: Prisma.PostCreateInput): Promise<Post> => {
  return prismaClient.post.create({
    data,
    ...postSchema,
  });
}

export const getOnePostRepo = async (whereCondition: Prisma.PostWhereInput): Promise<Post | null> => {
  return prismaClient.post.findFirst({
    where: whereCondition,
    ...postSchema
  })
}

export const updatePostRepo = async (where: Prisma.PostWhereUniqueInput, data: Prisma.PostUpdateInput): Promise<Post> => {
  return prismaClient.post.update({
    where,
    data,
    ...postSchema,
  })
}

export const deletePostRepo = async (where: Prisma.PostWhereUniqueInput): Promise<void> => {
  await prismaClient.post.delete({
    where,
  });
}

export const getListOfPostsRepo = async (where: Prisma.PostWhereInput, limit: number, skip: number): Promise<[number, Post[]]> => {
  return Promise.all([
    prismaClient.post.count({ where }),
    prismaClient.post.findMany({
      where,
      skip,
      take: limit,
      orderBy: {
        createdAt: 'desc',
      }
    })
  ]);
}

