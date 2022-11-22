const couchbase = require("couchbase");
require("dotenv").config();
const clusterConnStr = process.env.CB_URL;
const username = process.env.CB_USER;
const password = process.env.CB_PASS;
const bucketName = process.env.CB_BUCKET;

const cluster = new couchbase.Cluster(clusterConnStr, {
  username: username,
  password: password,
});

const bucket = cluster.bucket(bucketName);
const collection = bucket.defaultCollection();

module.exports = { collection: collection, cluster: cluster, bucket: bucket };
