const Fastify = require("fastify");
const app = Fastify({ logger: true });
const route = require("./routes/index");
const fs = require("fs");
const path = require("path");
require("dotenv").config();
require("./db/conn");


app.register(route.auth);
app.register(route.general);

const start = async () => {
  try {
    await app.listen({ port: 3000 });
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};
start();
