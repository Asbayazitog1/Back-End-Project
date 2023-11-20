const { selectTopics } = require("./app.model")

exports.getAllTopics = (req,res,next) =>{
    selectTopics().then(data =>{
       
    res.status(200).send(data)
       
    }).catch(err => {
       next(err)
    })
}