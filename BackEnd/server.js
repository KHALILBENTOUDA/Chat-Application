require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const path = require("node:path");
const cors = require("cors");
const AuthRoutes=require("./Routes/authRoutes");
const ChatRoutes=require("./Routes/ChatRoutes");
const LocationRoutes=require("./Routes/LocationRoutes");
const UserInterest=require("./Routes/InterstRoutes");
const notificationRoute=require("./Routes/notificationRoutes");
const MessageRoutes=require("./Routes/MessageRoutes");
const ViewRoutes=require("./Routes/viewRoutes");
const UserRoutes=require("./Routes/UserRoutes");
const EmagesRoutes=require("./Routes/EmageRoutes");
const statusText = require("./Util/statusText");
const AppErrorClass = require("./Middlewares/AppErrorClass");
const app = express();

app.use(cors({
  origin:['http://localhost:5173'],
  credentials:true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(bodyParser.json());
const PORT = process.env.PORT;


// routes 
app.use('/api/v1',AuthRoutes)
app.use('/api/v1/user',UserRoutes)
app.use('/api/v1/chat',ChatRoutes)
app.use('/api/v1/intrestes',UserInterest)
app.use('/api/v1/location',LocationRoutes)
app.use('/api/v1/message',MessageRoutes)
app.use('/api/v1/view',ViewRoutes)
app.use('/api/v1/Emages',EmagesRoutes)
app.use('/api/v1/notification',notificationRoute)
app.use('/uploads',express.static(path.join(__dirname, 'uploads')))

// routes not found 
app.all('*',(req,res,next)=>{
    next(new AppErrorClass(404,'Page Not Found',statusText.FAIL))
})

// handle oll the errors in tne app
app.use((error,req,res,next)=>{
    const statusText=error.statusText || "error"
    const status=error.status || 500
    res.status(status).json({
        status: statusText,
        message:error.message,
        code:status,
    })

})


app.listen(PORT, () => {
  console.log("server runing in port", PORT);
});


// catch errors outside of the server

process.on("unhandledRejection", (err) => {
  console.error("unhandledRejection Error :", err);
  server.close(() => {
    console.error("Shut down...");
    process.exit(1);
  });
});
