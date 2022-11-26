const AccessRole = {
  id: "uuid",
  clientId: "uuid",
  title: "string",
  description: !"OTP ;string",
  clientId: "string ;uuid",
  permissionIds: ["string ;uuid"],
  itemsAccess: ["string"],
  attributes: { KEY: VALUE },
  status: "string; enum: ACTIVE|INACTIVE",
  creator: "string",
  createdts: "string",
  updator: !"string",
  updatedts: !"string",
};

const Permission = {
  id: "uuid",
  access: "string",
  fields: ["string"],
  limitations: { elk: {}, qsl: "string" },
  attributes: !{
    KEY: VALUE,
  },
  status: "string; enum: ACTIVE|INACTIVE",
  permissionClass: "string",
  creator: "string",
  createdts: "string",
  updator: !"string",
  updatedts: !"string",
};

module.exports = { AccessRole, Permission };
