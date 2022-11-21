// CommonJs
const Fastify = require("fastify");
const request = require("request-promise-native");
const app = Fastify({ logger: true });
const { cluster,bucket,collection,couchbase } = require("./db/conn");
require("dotenv").config();

// app.addHook("preValidation", async function (req, reply) {
//   if (!req.auth) {
//     const data = await request.get({
//       url: "http://localhost:4000/",
//     });
//     req.auth = data;
//     return;
//   }
// });

app.register(require("./routes/index"));

const start = async () => {
  try {
    // const userExict = await collection.insert('username', {
    //   username: 'username',
    //   password: 'password',
    // });
    console.log(app.printRoutes());
    await app.listen({ port: 3000 });
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};
start();
