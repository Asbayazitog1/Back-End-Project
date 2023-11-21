const express = require("express");
const { handlePsqErrors, handleCustomErrors, handleServerErrors, handleBadPath } = require("./errors");
const { getAllTopics } = require("./app.controller");

const app =express()

app.use(express.json())

app.get('/api/topics', getAllTopics)




app.all( (req,res,next) =>{
    res.status(404).send("Not Found")
});


module.exports = app;