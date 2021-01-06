const User = require('../model/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

exports.createUser= (req,res,next)=>{
    const name = req.body.name
    const phoneNo = req.body.phoneNo
    const password = req.body.password
    User.findOne({phoneNo:phoneNo})
            .then(user=>{
                if(user){
                    const err = new Error('already exsists')
                    err.statusCode= 500
                    throw err
                }
                else{   
                    return bcrypt.hash(password,12)

                }
            })
            .then(hashedPass=>{
                const newUser = new User({
                    name: name,
                    phoneNo: phoneNo,
                    password:hashedPass
                })
                return newUser.save()
            })
            .then(result=>{
                res.status(200).json({
                    message:'user created',
                    user:{
                        name:result.name,
                        phoneNo: result.phoneNo,
                        userId:result._id
                    }
                })
            })
            .catch(err=>{
                if(!err.statusCode){
                    err.statusCode(500)
                }
                next(err)
            })

}

exports.login = (req,res,next)=>{
    let loadeduser
    const password = req.body.password
    const phoneNo = +req.body.phoneNo
    
    User.findOne({phoneNo:phoneNo})
       .then(user=>{
        if(!user){
            const err = new Error('user not found')
            err.statusCode = 404
            throw err
        }
         loadeduser = user
        return bcrypt.compare(password,user.password)
    })
    .then(isMatch=>{
        if(!isMatch){
            const err = new Error('user not exsist')
            err.statusCode = 404
            throw err
        }
        const token = jwt.sign({
            name:loadeduser.name,
            phoneNo:loadeduser.phoneNo
        },'some secrete string',
        {
            expiresIn : '2h'
        })
        res.status(200).json({
            token:token,
            name : loadeduser.name,
            userId:loadeduser._id
        })
    })
    .catch(err=>{
        if(!err.statusCode)
        {
            err.statusCode = 500
        }
        next(err)
    })
}

exports.fetchUserDetails = (req,res,next)=>{
    const userId  = req.params.userId
    User.findOne({_id:userId})
      .populate('posts.post')
      .populate('ads.ad')

    .then(user=>{
        if(!user){
            const err = new Error('user not found')
            err.statusCode = 404
            throw err
        }
        res.status(200).json({
            user:user
        })
    })
    .catch(err=>{
        if(!err.statusCode)
        {
            err.statusCode = 500
        }
        next(err)
    })
}