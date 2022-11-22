const request = require("request-promise-native");

const { createUser,loginUser,logoutUser } = require("./createUser");

module.exports = function (fastify, options, next) {
  fastify.post("/signup", createUser);
  fastify.post("/signin", loginUser);
  fastify.post("/signout", logoutUser);
  next();
};
