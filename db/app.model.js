const db = require("../db/connection")
const format = require("pg-format")

exports.selectTopics =() =>{
    let queryString =`SELECT * FROM topics`
    return db.query(queryString).then(({ rows })=>{
     return rows
    })
}