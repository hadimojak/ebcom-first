const { collection } = require("../db/conn");
require("dotenv").config();
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const request = require("request-promise-native");

async function createUser(req, reply) {
  const { username, password } = req.body;
  try {
    const user = await collection.get(username);
    if (user.content.username === username) {
      // console.log(user.content);
      return reply.send({ message: "user already exict", error: true });
    }
    //show some error in ui
  } catch (error) {
    //user not exict
    // console.log("user not exict");
    const result = await collection.insert(username, {
      id: uuidv4(),
      username,
      password: bcrypt.hashSync(password, 12),
    });
    //redirect to signin page
    return reply.code(201).send({ ...result, error: false });
  }
}

async function loginUser(req, reply) {
  const { username, password } = req.body;
  try {
    const user = await collection.get(username);
    const passIsCurrect = bcrypt.compareSync(password, user.content.password);
    if (!passIsCurrect) {
      return reply
        .code(401)
        .send({ message: "password must be incurrect !", error: true });
    }
    const data = await request.post({
      url: "http://localhost:4000/generate",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: username }),
    });

    return reply.code(201).send(data);
  } catch (error) {
    return reply.code(401).send({ message: "user not found", error: true });
  }
}
async function logoutUser(req, reply) {
  req.headers.authorization = "";
  reply.code(300).send("user signout");
}

async function getPermissions(req, reply) {
  reply.code(200).send("resources");
}

async function addPermission(req, reply) {}
async function getPermission(req, reply) {}
async function updatePermission(req, reply) {}
async function removePermission(req, reply) {}
async function addAccess(req, reply) {}

module.exports = {
  createUser,
  loginUser,
  logoutUser,
  getPermissions,
  addPermission,
  getPermission,
  updatePermission,
  removePermission,
  addAccess,
};
