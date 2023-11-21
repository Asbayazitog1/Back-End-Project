const { selectTopics, readEndpoints } = require("./app.model")

exports.getAllTopics = (req,res,next) =>{
    selectTopics().then(data =>{
       
    res.status(200).send({topics:data})
       
    }).catch(err => {
       next(err)
    })
}
exports.getAllEndpoints=(req,res, next)=>{
readEndpoints().then((result)=>{
    console.log(result)
    const enpoints ={...result}

})
}
