const express = require("express");
const server = express();

server.use((req,res,next)=>{
    console.log(`Hit for ${req.url}`);
    next();
})

server.get("/get-data", (req,res)=>{
    res.write("Hello ");
    res.end("[1,2,3,4,5,6,7]")
})

server.listen(5000, ()=>{
    console.log("Started service on Port 5000");
})