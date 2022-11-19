const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
var couchbase  = require('couchbase')


var cluster =  couchbase.Cluster.connect('couchbase://127.0.0.1:5984', {
  username: 'h.arbabi',
  password: 'mojak_@1516',
})

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.get("/", function (req, res) {
  res.send("Working........");
});
app.listen(3000, function () {
  console.log("Server is started on Port 3000");
});
