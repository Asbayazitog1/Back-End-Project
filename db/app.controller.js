const { log } = require("console")
const { selectTopics, selectArticlesById,selectAllArticles, selectCommentsByArticleID, insertNewComment, checkUsersByUserName, alterArticleByArticleID, removeCommentByCommetnId } = require("./app.model")
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
exports.getAllArticles =(req,res,next) =>{
    const query = req.query
selectAllArticles(query).then((articles)=>{
    res.status(200).send({articles : articles})
}).catch(err =>{
    next(err)
})
}
exports.getAllCommentsByArticleId =(req,res,next) => {
const {article_id} = req.params
selectArticlesById(article_id).then((article)=>{

    return selectCommentsByArticleID(article_id)
})
.then(comments =>{
    res.status(200).send({comments : comments})
}).catch(err => {
    next(err)
})
}
exports.addNewCommentByArticleId =(req,res,next) => { 
const newComment =req.body
const username = req.body.username
const {article_id} =req.params
const checkArticleExists = selectArticlesById(article_id) 
const checkUser= checkUsersByUserName(username)
const insetCommentIfExits =insertNewComment(newComment,article_id)

Promise.all([checkArticleExists,checkUser,insetCommentIfExits])
.then(result => {
    res.status(201).send({comment :result[2][0]})
})
.catch((err)=>{
    next(err)
})
}
exports.updateArticleByArticleId = (req,res,next) => {
    const {article_id} =req.params
    const {inc_votes} = req.body
    const checkArticleExists = selectArticlesById(article_id) 
    const updateArticle =alterArticleByArticleID(inc_votes,article_id)
Promise.all([checkArticleExists,updateArticle]).then(result =>{
    res.status(200).send({article :result[1]})
}).catch((err)=>{
    next(err)
})
}
exports.deleteCommentByCommentID =(req,res,next) =>{
removeCommentByCommetnId().then(()=>{
    res.send(204)
})
}