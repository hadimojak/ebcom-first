const { collection } = require("../db/conn");
require("dotenv").config();
const { v4: uuidv4 } = require("uuid");

async function createUser(req, reply) {
  const { username, password } = req.body;
  try {
    const user = await collection.get(username);
    if (user.content.username === username)
      return reply.send({ message: "user already exict" });
  } catch (error) {
    //user not exict
    console.log("user not found");
    const result = await collection.insert(username, {
      id: uuidv4(),
      username,
      password,
    });
    return reply.code(200).send(result);
  }
}

async function loginUser(req, reply) {
  const { username, password } = req.body;
}

module.exports = { createUser, loginUser };
