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
        return Promise.reject({ status: 404, msg: "not found" })
    }
    return result.rows[0]
  })
}