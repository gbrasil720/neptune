import { fastifyCors } from '@fastify/cors'
import chalk from 'chalk'
import fastify from 'fastify'

import { createTeamBasedOnManagerId } from './routes/create-team-based-on-manager-id'
import { createTeamManager } from './routes/create-team-manager'
import { createUser } from './routes/create-user'
import { deleteUser } from './routes/delete-user'
import { getManagerDetails } from './routes/get-manager-details'
import { getSpecificUser } from './routes/get-specific-user'
import { getUsers } from './routes/get-users'
import { updateUserRole } from './routes/update-user-role'
import { deleteTeam } from './routes/delete-team'

const app = fastify()

app.register(fastifyCors, {
	origin: '*',
})

app.register(createUser)
app.register(getUsers)
app.register(getSpecificUser)
app.register(updateUserRole)
app.register(deleteUser)
app.register(createTeamBasedOnManagerId)
app.register(createTeamManager)
app.register(getManagerDetails)
app.register(deleteTeam)

app.listen({ port: 3333 }).then(() => {
	console.log(
		`🚀 ${chalk.greenBright(
			'[API] Started running successfully at http://localhost:3333'
		)}`
	)
})
