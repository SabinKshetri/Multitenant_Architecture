const jwt=require('jsonwebtoken')
const generateToken=(user)=>{
return jwt.sign({id:user.id},"dontsharethissecretekey",{
        expiresIn:"2d"
    })
}
module.exports=generateToken