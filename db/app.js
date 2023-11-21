const express = require("express");
const { handlePsqErrors, handleCustomErrors, handleServerErrors } = require("./errors");
const { getAllTopics, getAllEndpoints, getArticleByArticleID } = require("./app.controller");
// const apiRouter = require('./routes/api')

const app =express()

app.use(express.json())

app.get('/api/topics', getAllTopics)
app.get('/api/articles/:article_id',getArticleByArticleID)
app.get("/api",getAllEndpoints)



app.all('*' ,(req,res,next) =>{
    res.status(404).send({msg:"Not Found"})
});


app.use(handlePsqErrors);
app.use(handleCustomErrors);



module.exports = app;