const express = require("express");
const LoginVerify = require("../Middlewares/LoginVerify");
const IntrestControlle = require("../Controller/IntrestControlle");
const route = express.Router();

route.route('/').get(IntrestControlle.getAllInterests)


module.exports = route