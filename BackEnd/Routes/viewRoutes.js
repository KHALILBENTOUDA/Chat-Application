const express = require("express");
const LoginVerify = require("../Middlewares/LoginVerify");
const viewController = require("../Controller/ViewController");
const route = express.Router();

route.route('/').post(viewController.createView)
route.route('/getall').post(viewController.getAllUsersView)

module.exports = route