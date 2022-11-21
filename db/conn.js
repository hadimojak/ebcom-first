const couchbase = require("couchbase");
require("dotenv").config();

const clusterConnStr = process.env.CB_URL;
const username = process.env.CB_USER;
const password = process.env.CB_PASS;
const bucketName = process.env.CB_BUCKET;



(async function () {
  const cluster = new couchbase.Cluster(clusterConnStr, {
    username: username,
    password: password,
  });
  const bucket = cluster.bucket(bucketName);
  const defaultScope = bucket.scope("_default");
  const collection = bucket.collection("testUser");
  
  const userExict = await collection.insert('username', {
    username: 'username',
    password: 'password',
  });
})();

// module.exports = { couchbase, cluster, bucket, collection };
