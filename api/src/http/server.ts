import fastify from 'fastify'
import chalk from 'chalk'

import { createUser } from './routes/create-user'
import { getUsers } from './routes/get-users'
import { getSpecificUser } from './routes/get-specific-user'

const app = fastify()

app.register(createUser)
app.register(getUsers)
app.register(getSpecificUser)

app.listen({ port: 3333 }).then(() => {
  console.log(`🚀 ${chalk.greenBright('[API] Started running successfully at http://localhost:3333')}`)
})