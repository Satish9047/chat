const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const helmet = require("helmet");
const http = require("http");
const {Server} = require("socket.io");
const router = require("./router/router");

const app = express();
// const { log } = require("console");
require("dotenv").config();
app.use(cors())

//Socket.io
const httpServer = http.createServer(app);
const io = new Server(httpServer, {
    pingTimeout: 60000,
    cors: {
        origin: "http://localhost:5173"
    }
})


//middlewares
app.use(helmet());
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



//socket handler
io.on("connection", (socket)=>{
    console.log("user connected: ", socket.id);

    socket.on("sendMessage", (message)=>{
        console.log(message);
        io.emit("receiveMessage", message);
    })
})


//Port listiner
httpServer.listen(process.env.PORT, ()=>{
    console.log(`server is running in port: ${process.env.PORT}`);
})

