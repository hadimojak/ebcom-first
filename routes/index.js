const request = require("request-promise-native");
const { collection, bucket } = require("../db/conn");

module.exports = function (fastify, options, done) {
  fastify.post("/signin", async function (req, reply) {
    const { username, password } = req.body;
    const userExict = await collection.insert(username, {
      username: username,
      password: password,
    });
    console.log(userExict.value);
    // const data = await request.post({
    //   url: "http://localhost:4000/login",
    // });
  }),
    fastify.get("/bye", async function (req, reply) {
      return { bye: req.auth + " good bye" };
    });
  done();
};
