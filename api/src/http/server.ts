import fastify from 'fastify'
import chalk from 'chalk'

import { createUser } from './routes/create-user'

const app = fastify()

app.register(createUser)

app.listen({ port: 3333 }).then(() => {
  console.log(`🚀 ${chalk.greenBright('[API] Started running successfully at http://localhost:3333')}`)
})