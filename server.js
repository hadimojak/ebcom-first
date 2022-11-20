// CommonJs
const fastify = require("fastify");
const {get} = require("./services/auth/auth.service");

const app = fastify({
  logger: {
    level: "info",
    file: "./service.log",
    serializers: {
      res(res) {
        return {
          statusCode: res.statusCode,
          request: res.raw.input,
          headers: res.raw.headers,
          payload: res.raw.payload,
        };
      },
    },
  },
  pluginTimeout: 3000,
  ignoreTrailingSlash: true,
  bodyLimit: 10240,
  keepAliveTimeout: 15000,
});

app.decorate("authentication", async (req, reply) => {});
// app.addHook("preHandler", function (req, reply, done) {
//   req.user = "meee";
//   done();
// });

const opts = {
  schema: {
    response: {
      200: {
        type: "object",
        // properties: {
        //   hello: { type: "string" },
        //   number: { type: "number" },
        // },
      },
    },
  },
};
app.get("/", opts, (req, reply) => {
  reply.send("hellow ", req.user);
});

/**
 * Run the server!
 */
const start = async () => {
  try {
    await app.listen({ port: 3000 });
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};
start();
