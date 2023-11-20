const express = require("express");
const { handlePsqErrors, handleCustomErrors, handleServerErrors } = require("./errors");
const { getAllTopics } = require("./app.controller");

const app =express()

app.use(express.json())

app.get('/api/topics', getAllTopics)



app.use(handlePsqErrors);
app.use(handleCustomErrors);
app.use(handleServerErrors);


module.exports = app;