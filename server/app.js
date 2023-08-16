const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const helmet = require("helmet");
const http = require("http");
const socket = require("socket.io");

const app = express();
const router = require("./router/router");
require("dotenv").config();


//middlewares

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//creating socket io for backend
const server = http.createServer(app);
const io = socket(server);


io.on("connection", (socket)=>{
    console.log("user connected");


    socket.on("message", (data)=>{
        io.emit("message", data);
    })

    socket.on('disconnect', () => {
        console.log('User disconnected');
      });
      chatController(io); 
})


//Connecting MongoDB 
mongoose.connect(`${process.env.MONGODB_URL}`)
.then(()=>{
    console.log("MongoDB conntected!!");
})
.catch((error)=>{
    console.error("can't connect to mongodb: ", error.message);
})


//Request handler
app.use("/", router);

//Port listiner
app.listen(process.env.PORT, ()=>{
    console.log(`server is running in port: ${process.env.PORT}`);
})