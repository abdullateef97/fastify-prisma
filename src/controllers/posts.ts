import { FastifyRequest, RouteHandlerMethod } from 'fastify';
import { createPostRepo, deletePostRepo, getListOfPostsRepo, getOnePostRepo, updatePostRepo } from '../repositories/posts';
import { Prisma } from '@prisma/client';
import { logError } from '../helpers/errors';
import { constructPostWhereCondition } from '../helpers/post';
import config from '../helpers/config';

type IdParam = { id: number };
export type PostQuery = {
  author?: string;
  id?: number;
  title?: string;
  page?: number;
  limit?: number;
}

export const createPost: RouteHandlerMethod = async (req, res) => {
  try {
    const post = await createPostRepo(req.body as Prisma.PostCreateInput);
    return res.send({ data: { post } })
  } catch (error: any) {
    logError('Error creating post', error);
    res.status(500).send({ error: `${error.message ? error.message : 'error creating post'}` })
  }
}

export const updatePost: RouteHandlerMethod = async (req, res) => {
  try {
    const { id } = req.params as IdParam;
    let  post = await getOnePostRepo({ id });
    if (!post) {
      res.status(404).send({ error: `invalid post id` });
    }

    post = await updatePostRepo({ id }, req.body as Prisma.PostUpdateInput)
    return res.send({ data: { post } })
  } catch (error: any) {
    logError('Error updating post', error);
    res.status(500).send({ error: `${error.message ? error.message : 'error updating post'}` })
  }
}

export const deletePost: RouteHandlerMethod = async (req, res) => {
  try {
    const { id } = req.params as IdParam;
    const  post = await getOnePostRepo({ id });
    if (!post) {
      res.status(404).send({ error: `invalid post id` });
    }
    await deletePostRepo({ id });
    return res.send({ message: 'successfully deleted post' })
  } catch (error: any) {
    logError('Error updating post', error);
    res.status(500).send({ error: `${error.message ? error.message : 'error updating post'}` })
  }
}

export const getPostDetails: RouteHandlerMethod = async (req, res) => {
  try {
    const { id } = req.params as IdParam;
    const  post = await getOnePostRepo({ id });
    if (!post) {
      res.status(404).send({ error: `invalid post id` });
    }
    return res.send({ data: { post } })
  } catch (error: any) {
    logError('Error getting post details', error);
    res.status(500).send({ error: `${error.message ? error.message : 'error getting post details'}` })
  }
}

export const getPosts: RouteHandlerMethod = async (req, res) => {
  try {
    const query = req.query as PostQuery;
    const where = constructPostWhereCondition(query);

    const limit = query.limit || config.defaultLimit;
    const page = query.page || 1;
    const skip = (page - 1) * limit;
    const [totalCount, posts] = await getListOfPostsRepo(where, limit, skip);
    return res.send({ data: { 
      posts,
      page,
      count: posts.length,
      totalCount,
     } })
  } catch (error: any) {
    logError('Error getting posts', error);
    res.status(500).send({ error: `${error.message ? error.message : 'error getting posts'}` })
  }
}