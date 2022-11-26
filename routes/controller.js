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
      userId: uuidv4(),
      clientId: uuidv4(),
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
    const parsedData = JSON.parse(data);
    return reply.code(201).send({
      token: parsedData.token,
      clientId: user.content.clientId,
      userId: user.content.userId,
      username: user.content.username,
    });
  } catch (error) {
    return reply.code(401).send({ message: "user not found", error: true });
  }
}
async function logoutUser(req, reply) {
  req.headers.authorization = "";
  reply.code(300).send("user signout");
}

async function addPermission(req, reply) {}
async function getPermission(req, reply) {
  const clientId = req.headers.client_id;
  const permissionId = req.params.permissionId;
}
async function inquiryPermission(req, reply) {}
async function updatePermission(req, reply) {}
async function patchPermission(req, reply) {}
async function removePermission(req, reply) {}

async function addRole(req, reply) {}
async function getRole(req, reply) {}
async function inquiryRole(req, reply) {}
async function inquiryRolePermission(req, reply) {}
async function updateRole(req, reply) {}
async function patchRole(req, reply) {}
async function removeRole(req, reply) {}

module.exports = {
  createUser,
  loginUser,
  logoutUser,

  patchPermission,
  addPermission,
  getPermission,
  updatePermission,
  removePermission,
  inquiryPermission,

  addRole,
  getRole,
  inquiryRole,
  inquiryRolePermission,
  updateRole,
  patchRole,
  removeRole,
};
