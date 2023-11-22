const { selectTopics, selectArticlesById } = require("./app.model")
const fs =require("fs/promises")
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


exports.getAllTopics = (req,res,next) =>{
    selectTopics().then(data =>{
       
    res.status(200).send({topics:data})
       
    }).catch(err => {
       next(err)
    })
}
exports.getArticleByArticleID=(req,res,next)=>{
const {article_id} = req.params
selectArticlesById(article_id).then(article =>{
    res.status(200).send({articles:article})
}).catch(err =>{
    next(err)
})
}
