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
  const token = req.headers.authorization.split(" ")[1];
  try {
    const decoded = jwt.verify(token, jwtSecrtet);
    res.statusCode = 200;
    res.send(decoded);
  } catch (error) {
    res.statusCode = 401;
    return res.send(error.message);
  }
});

// an API route for the authorization/authentication step
authenticate.post("/generate", function (req, res, next) {
  const { username } = req.body;
  const token = jwt.sign({ username }, jwtSecrtet, {
    expiresIn: 5000, // 12 hours
  });
  res.statusCode = 201;
  return res.send({ username, token });
});

authenticate.listen(4000, function () {
  console.log("Server is started on Port 4000");
});
