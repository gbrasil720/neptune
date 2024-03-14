import { fastifyCors } from "@fastify/cors";
import chalk from "chalk";
import fastify from "fastify";

import { createUser } from "./routes/create-user";
import { deleteUser } from "./routes/delete-user";
import { getSpecificUser } from "./routes/get-specific-user";
import { getUsers } from "./routes/get-users";
import { updateUserRole } from "./routes/update-user-role";

const app = fastify();

app.register(fastifyCors, {
	origin: "*",
});

app.register(createUser);
app.register(getUsers);
app.register(getSpecificUser);
app.register(updateUserRole);
app.register(deleteUser);

app.listen({ port: 3333 }).then(() => {
	console.log(
		`🚀 ${chalk.greenBright(
			"[API] Started running successfully at http://localhost:3333",
		)}`,
	);
});
