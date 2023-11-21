const { selectTopics, readEndpoints, selectArticlesById } = require("./app.model")

exports.getAllTopics = (req,res,next) =>{
    selectTopics().then(data =>{
       
    res.status(200).send({topics:data})
       
    }).catch(err => {
       next(err)
    })
}
exports.getAllEndpoints=(req,res, next)=>{
readEndpoints().then((result)=>{
    const enpoints ={...result}

})
}
exports.getArticleByArticleID=(req,res,next)=>{
const {article_id} = req.params
selectArticlesById(article_id).then(article =>{
    res.status(200).send(article)
}).catch(err =>{
    next(err)
})
}
