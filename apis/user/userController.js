const usermodel = require('./userModel')
const bcrypt = require('bcrypt')
const saltRoutes = 10

module.exports = {login,register}

async function login(req,res){
    let validations = []

    if(!req.body.email){
        validations.push('email')
    }
    if(!req.body.password){
        validations.push('password')
    }
    if(validations.length>0){
        res.send({
            success:false,
            status:400,
            message:validations.join(',')+' is/are required'
        })
    }
    else{
        let existingUser = await usermodel.findOne({email:req.body.email})
        if(!existingUser){
            res.send({
                success:false,
                status:400,
                message:"user doesn't exist with this email"
            })
        }
        else{
            let hasmatched = bcrypt.compareSync(req.body.password,existingUser.password)
            if(!hasmatched){
                req.send({
                    success:false,
                    status:403,
                    message:"invaild password"
                })
            }
            else{
                res.send({
                    success:true,
                    status:200,
                    message:"login successfully"
                })
            }
        }
    }
}

function register(req,res){
    let validations = []
    
    if(!req.body.name){
        validations.push('name')
    }
    if(!req.body.email){
        validations.push('email')
    }
    if(!req.body.password){
        validations.push('password')
    }
    if(validations.length>0){
        res.send({
            success:false,
            status:400,
            message:validations.join(',')+' is/are required'
        })
    }
    else{
        usermodel.findOne({email:req.body.email}).then(obj=>{
            if(!!obj){
                res.send({
                    success:false,
                    status:409,
                    message:"user already exist with this email"
                })
            }
            else{
                usermodel.countDocuments().then(doc=>{
                    let obj = new usermodel()
                    obj.name = req.body.name
                    obj.email = req.body.email

                    let hash = bcrypt.hashSync(req.body.password,saltRoutes)
                    obj.password = hash

                    obj.save().then(doc=>{
                        res.send({
                            success:true,
                            status:200,
                            message:"register successfully",
                            data:doc
                        })
                    }).catch(err=>{
                        res.send({
                            success:false,
                            status:400,
                            message:"ERROR =>"+err,
                            data:obj
                        })
                    })
                }).catch(err=>{
                    res.send({
                        success:false,
                        status:400,
                        message:"ERROR =>"+err,
                        data:obj
                    })
                })
            }
        }).catch(err=>{
            res.send({
                success:false,
                status:500,
                message:"ERROR =>"+err
            })
        })
    }
}