var User = require("../models/User")

function Auth (req,res,next){
    var authtoken = req.header("Authorization");
    if(authtoken){
        User.findOne({token:authtoken}).then(responce=>{
            req.user = responce
            next()
        }).catch(err=>{
            log(err)
            res.status(402).send("invalid Credentials")
        })
    }
    else{
        res.status(402).send("invalid credentials")
    }
}

module.exports = Auth