import { Prisma } from '@prisma/client';
import { PostQuery } from '../controllers';

export const constructPostWhereCondition = (query: PostQuery): Prisma.PostWhereInput => {
  return {
    ...(query.author && { author: query.author }),
    ...(query.id && { id: query.id }),
    ...(query.title && { title: query.title }),
  }
}