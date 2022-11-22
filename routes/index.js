const request = require("request-promise-native");

const { createUser,loginUser } = require("./createUser");

module.exports = function (fastify, options, next) {
  fastify.post("/signin", createUser);
  fastify.post("/login", loginUser);
  next();
};
