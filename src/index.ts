import { app } from './app'
import { envs } from './helpers/utils'

const start = async () => {
  console.log('app starting');
  await app.listen({
    port: envs.PORT
  })
  app.log.info(`app running on ${envs.HOST}:${envs.PORT}/`)
}

start()
