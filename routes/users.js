const express = require("express");
const router = express.Router();

router.get("/", (req,res)=>{
    res.send("Get request")
})

router.post("/", (req,res)=>{
    res.send("Post request")
})


module.exports = router;