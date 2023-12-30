import supertest from 'supertest'
import { app } from './helpers'

test('signup', async () => {
  const users = await supertest(app.server)
    .post('/posts')
    .send({})
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(500)

})

test('login', async () => {
  const res = await supertest(app.server)
    .post('/login')
    .send({
      email: 'user@g.com',
      password: 'password',
    })
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200)

  expect(res.body).toHaveProperty('data.user')
  expect(res.body).toHaveProperty('data.accessToken')
})
