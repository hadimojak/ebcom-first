const AccessRole = {
  title: "string",
  description: "OTP ;string",
  clientId: "string ;uuid",
  permissionIds: ["string ;uuid"],
  itemsAccess: ["string"],
  attributes: ["string"],
};

const Permission = {
  access: "string",
  fields: ["string"],
  limitations: { elk: {}, qsl: "string" },
  attributes: {
    KEY: VALUE,
  },
  status: "string; enum: ACTIVE|INACTIVE",
  permissionClass: "string",
};

module.exports = { AccessRole, Permission };
