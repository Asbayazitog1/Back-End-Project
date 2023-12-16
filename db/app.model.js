const db = require("../db/connection")
const {  convertTimestampToDate } = require("./seeds/utils")

exports.selectTopics =() =>{
    const queryString =`SELECT * FROM topics`
    return db.query(queryString).then(({ rows })=>{
     return rows
    })
}


exports.selectArticlesById=(article_id)=>{
const queryString =`SELECT * FROM articles WHERE article_id =$1;`
  return db.query(queryString,[article_id]).then(result =>{
    if(result.rows.length === 0){
        return Promise.reject({ status: 404, msg: "article not found" })
    }
    return result.rows[0]
  })
}

exports.selectAllArticles = (query) =>{
  const sort_by = query.sort_by
  const order = query.order
  const allowedSortBy =['author','title','article_id','topic','created_at','votes','article_img_url','comment_count']
  if(sort_by && !allowedSortBy.includes(sort_by)){
    return Promise.reject({ status: 400, msg: "Invalid sort option" })
  }
  let queryString =`SELECT article_id, author, title,topic, created_at, votes, article_img_url ,(SELECT COUNT(article_id) FROM comments WHERE articles.article_id = comments.article_id) AS comment_count FROM articles`

  const sortOrder =(order && order ==="asc")?'ASC':'DESC'

  if(sort_by){
    queryString +=` ORDER BY ${sort_by} ${sortOrder};`
  }


  return db.query(queryString).then(({rows})=>{
    rows.forEach(row => {
      row.comment_count =+row.comment_count
    })
    
    return rows
  })
}

exports.selectCommentsByArticleID = (article_id) =>{
 
const queryString = `SELECT comment_id,votes,created_at,author,body,article_id FROM comments WHERE article_id = $1 ORDER BY created_at DESC;`
 return db.query(queryString,[article_id]).then(({rows}) => {
  return rows
 })
}
exports.insertNewComment =(newComment,id) => {
  const created_at = new Date().valueOf()
  const date =convertTimestampToDate({created_at})
  if(!newComment.body || !newComment.username){
      return Promise.reject({ status: 400, msg: "bad request body" })
      
  }
  const newCommentData ={
    body: newComment.body  ,
    author :  newComment.username ,
    article_id : id,
    votes :0,
    created_at : date.created_at

  }
  const insertCommentsQueryStr =`INSERT INTO comments(body, author, article_id, votes, created_at) VALUES($1,$2,$3,$4,$5) RETURNING*;`
  
  return db.query(insertCommentsQueryStr,[newCommentData.body,newCommentData.author,newCommentData.article_id,newCommentData.votes,newCommentData.created_at]).then(({rows})=>{
    return rows
  })
  
}
exports.checkUsersByUserName = (username) =>{
  
  const queryString =`SELECT * FROM users WHERE username = $1;`
  return db.query(queryString,[username]).then(({rows})=>{
    if(rows.length===0){
      return Promise.reject({ status: 404, msg: "user not found" })
    }
    
    return rows
  })
}
exports.alterArticleByArticleID = (incValue,article_id) =>{
  if(!incValue || typeof incValue === "string"){
    return Promise.reject({status:400 , msg:"invalid input"})
  }
  const queryString = `UPDATE articles SET votes = votes + $1 WHERE article_id = $2 RETURNING *;`
const queryInput =[incValue,article_id]
return db.query(queryString,queryInput).then(({rows})=>{
  return rows[0]
})
}
exports.removeCommentByCommetnId=(comment_id)=>{
   const queryString =`DELETE FROM comments WHERE comment_id = $1;`
   return db.query(queryString,[comment_id])
}
exports.selectAllUsers=()=>{
  const queryString =`SELECT * FROM users;`
  return db.query(queryString).then(({rows})=>{
    return rows
  })
}
