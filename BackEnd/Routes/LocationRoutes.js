const express = require("express");
const LoginVerify = require("../Middlewares/LoginVerify");
const LocationController = require("../Controller/LocationController");
const route = express.Router();

route.route('/').post(LocationController.getUserLoaciton)


module.exports = route