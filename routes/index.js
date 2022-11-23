const {
  createUser,
  loginUser,
  logoutUser,
  getPermissions,
  addPermission,
  getPermission,
  updatePermission,
  removePermission,
  addAccess,
} = require("./controller");
const request = require("request-promise-native");

async function auth(fastify, options, next) {
  fastify.post("/signup", createUser);
  fastify.post("/signin", loginUser);
  next();
}

async function general(fastify, options, next) {
  fastify.post("/signout", logoutUser);
  fastify.get("/permissionClass", getPermissions);
  fastify.post("/addPermission", addPermission);
  fastify.get("/getPermission", getPermission);
  fastify.put("/updatePermission", updatePermission);
  fastify.delete("/removePermission", removePermission);
  fastify.post("/addAccess", addAccess);

  fastify.addHook("onRequest", async (req, res) => {
    if (!req.headers.authorization) {
      return res.code(401).send({ message: "not authorized" });
      //redirect to signin page
    }
    try {
      const data = await request.post({
        url: "http://localhost:4000/verify",
        headers: {
          "Content-Type": "application/json",
          Authorization: req.headers.authorization
            ? "bearer " + req.headers.authorization.split(" ")[1]
            : "",
        },
      });
      console.log("access granted");
      return;
    } catch (error) {
      res.code(401).send(error.message);
    }
  });
  next();
}
//

module.exports = { auth, general };
