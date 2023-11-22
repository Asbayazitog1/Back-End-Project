const { selectTopics } = require("./app.model")
const fs =require("fs/promises")
const endpoints = require("../endpoints.json")
exports.getAllTopics = (req,res,next) =>{
    selectTopics().then(data =>{
       
    res.status(200).send({topics:data})
       
    }).catch(err => {
       next(err)
    })
}
exports.getAllEndpoints=(req,res, next)=>{
return fs.readFile(`./endpoints.json`,'utf-8').then(result =>{
    return JSON.parse(result)
}).then(data =>{
    res.status(200).send({endpoints:data})
})


}
