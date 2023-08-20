const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const helmet = require("helmet");
const http = require("http");


const app = express();
const router = require("./router/router");
const { log } = require("console");
require("dotenv").config();


//middlewares

// app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));


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
const server = app.listen(process.env.PORT, ()=>{
    console.log(`server is running in port: ${process.env.PORT}`);
})

const io = require("socket.io")(server, {
    pingTimeout: 60000,
    cors: {
        origin: "http://localhost:5173"
    },
})

io.on("connection", (socket)=>{
    console.log("connected to socket.io");
    console.log(socket.id);

    socket.on("sendMessage", (message)=>{
        console.log(message);
        socket.emit(message);
    })
})

