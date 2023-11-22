const db = require("../db/connection")
const format = require("pg-format")
const fs = require("fs/promises")

exports.selectTopics =() =>{
    const queryString =`SELECT * FROM topics`
    return db.query(queryString).then(({ rows })=>{
     return rows
    })
}



