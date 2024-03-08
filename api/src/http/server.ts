import fastify from "fastify";
import chalk from "chalk";

import { createUser } from "./routes/create-user";
import { getUsers } from "./routes/get-users";
import { getSpecificUser } from "./routes/get-specific-user";
import { updateUserRole } from "./routes/update-user-role";
import { deleteUser } from "./routes/delete-user";
import fastifyCors from "@fastify/cors";

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
      "[API] Started running successfully at http://localhost:3333"
    )}`
  );
});
