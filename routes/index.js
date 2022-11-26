const {
  createUser,
  loginUser,
  logoutUser,
  getPermission,
  inquiryPermission,
  addPermission,
  updatePermission,
  patchPermission,
  removePermission,
  addRole,
  getRole,
  inquiryRole,
  inquiryRolePermission,
  removeRole,
  updateRole,
  patchRole,
} = require("./controller");
const request = require("request-promise-native");

async function auth(fastify, options, next) {
  fastify.post("/signup", createUser);
  fastify.post("/signin", loginUser);
  next();
}

async function general(fastify, options, next) {
  fastify.post("/signout", logoutUser);

  fastify.get("/getPermission/:permissionId", getPermission);
  fastify.get("/permissionsInquiry", inquiryPermission);
  fastify.post("/addPermission", addPermission);
  fastify.put("/updatePermission/:permissionId", updatePermission);
  fastify.patch("/patchPermission/:permissionId", patchPermission);
  fastify.delete("/removePermission/:permissionId", removePermission);

  fastify.get("/getRole/:roleId", getRole);
  fastify.get("/getInquiryRoles", inquiryRole);
  fastify.post("/addRole", addRole);
  fastify.get("/getRole/:roleId/permissions", inquiryRolePermission);
  fastify.put("/updateRole/:roleId", updateRole);
  fastify.patch("/patchRole/:roleId", patchRole);
  fastify.post("/removeRole/:roleId", removeRole);

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
