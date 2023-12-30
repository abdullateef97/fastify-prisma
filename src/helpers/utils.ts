import { PrismaClient } from '@prisma/client'

export const isDev = () => process.env.NODE_ENV === 'development'

export const envs = {
  PORT: parseInt(process.env.PORT || '4000', 10),
  HOST: process.env.HOST || 'http://localhost',
  CORS_HOST: process.env.CORS_HOST || 'http://localhost:3000/',
}

export const prisma = new PrismaClient()
