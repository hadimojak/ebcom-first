var express = require("express");
var https = require("https");
var fs = require("fs");
require("dotenv").config();
var jwt = require("jsonwebtoken");

const jwtSecrtet = process.env.TOKEN_SECRET;

var authenticate = express();
authenticate.use(express.urlencoded());
authenticate.use(express.json());

// just a generic home page for a web portal if desired.
authenticate.post("/verify", function (req, res) {
  console.log("heeerreee");
  const token = req.headers.authorization.split(" ")[1];

  const decoded = jwt.verify(token, jwtSecrtet);
  console.log(decoded);
  res.send(decoded);
});

// an API route for the authorization/authentication step
authenticate.post("/login", function (req, res, next) {
  const { username, password } = req.body;
  console.log(jwt.sign({ user: username }, jwtSecrtet));
  res.send({ username: username, password:password });
});

// this is an API call to verify the access_token when it's passed
// authenticate.post("/verify", function (req, res) {
//   // get the token that was passed in the authenticate.
//   // might make more sense to put this in the header
//   var token = req.header.authorization;

//   // decode the token to verify
//   var decoded = jwt.verify(token, process.env.SECRET, function (err, decoded) {
//     if (err) {
//       // if there is an error, the token is not valid!
//       res.send({ success: false });
//     } else {
//       // if no error, send the decoded token to the client with
//       // authorization metadata payload
//       res.send(decoded);
//     }
//   });
// });

authenticate.listen(4000, function () {
  console.log("Server is started on Port 4000");
});

module.exports = authenticate;
