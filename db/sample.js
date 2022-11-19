const { Ottoman, Schema, SearchConsistency } = require("ottoman");
const ottoman = new Ottoman();

async function main() {
  // Replace the following connection details with your own
  const endpoint = "cb.<your-endpoint>.cloud.couchbase.com";
  const cloudRootCertificate = "./cert.pem";
  const username = "username";
  const password = "Password1!";
  const bucketName = "travel-sample";

  const connection = await ottoman.connect({
    connectionString: `couchbases://${endpoint}`,
    username: username,
    password: password,
    bucketName: bucketName,
    trustStorePath: cloudRootCertificate,
    kvTimeout: 10000, // milliseconds
  });
}

main();
