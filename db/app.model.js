const db = require("../db/connection")
const format = require("pg-format")
const fs = require("fs/promises")

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
  if(rows.length === 0){
    return Promise.reject({ status: 404, msg: "comment not found" })
  }
  return rows
 })
}