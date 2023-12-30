import { RouteOptions } from 'fastify'
import * as controllers from '../controllers'
import { title } from 'process'

type RouteConfig = Record<string, RouteOptions>

const routes: RouteConfig = {
  createPost: {
    method: 'POST',
    url: '/posts',
    handler: controllers.createPost,
    schema: {
      body: {
        type: 'object',
        properties: {
          title: { type: 'string' },
          content: { type: 'string' },
          author: { type: 'string' }
        },
        required: ['title', 'content', 'author']
      }
    }
  },
  updatePost: {
    method: 'PATCH',
    url: '/posts/:id',
    handler: controllers.updatePost,
    schema: {
      body: {
        type: 'object',
        properties: {
          title: { type: 'string' },
          content: { type: 'string' },
          author: { type: 'string' }
        },
      },
      params: {
        type: 'object',
        properties: {
          id: { type: 'integer' }
        }
      }
    }
  },
  deletePost: {
    method: 'DELETE',
    url: '/posts/:id',
    handler: controllers.deletePost,
    schema: {
      params: {
        type: 'object',
        properties: {
          id: { type: 'integer' }
        }
      }
    }
  },
  getPostDetails: {
    method: 'GET',
    url: '/posts/:id',
    handler: controllers.getPostDetails,
    schema: {
      params: {
        type: 'object',
        properties: {
          id: { type: 'integer' }
        }
      }
    }
  },
  getPosts: {
    method: 'GET',
    url: '/posts',
    handler: controllers.getPosts,
    schema: {
      querystring: {
        author: { type: 'string'},
        id: { type: 'integer'},
        title: { type: 'string'},
        page: { type: 'integer'},
        limit: { type: 'integer'},
      }
    }
  },
}

export const renderRoutes = Object.values(routes)
