const express = require("express");
const LoginVerify = require("../Middlewares/LoginVerify");
const MessageController = require("../Controller/MessageController");
const uploadAudios = require("../Util/UploadAudios");
const route = express.Router();
const multer=require('multer');
const uploadFunction = require("../Util/UploadEmages");

// const upload = uploadAudios('Audios','audio')

const upload=uploadFunction('Messages','message')


route.route('/').post(upload.single('image'),MessageController.createMessage)
route.route('/:chat_id').get(MessageController.getAllmessages)
route.route('/notification').post(MessageController.sendNotification)
route.route('/notification/:receiver_id').get(MessageController.getNotification)
route.route('/notification/read').post(MessageController.isReadMessage)

module.exports = route  