const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const employeeSchema = new mongoose.Schema({

    firstname : {
        type : String,
        required : true
    },
    lastname : {
        type : String,
        required : true
    },
    age : {
        type : Number,
        required : true,
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    gender : {
        type : String,
        required : true
    },
    password : {
        type: String,
        required : true
    },
    confirmPassword : {
        type: String,
        required : true
    },
    tokens :[{
        token :{
            type:String,
            required:true
        }
    }]
})

employeeSchema.methods.generateAuthToken = async function(){
    try{
        const user = this
        const token = jwt.sign({ _id : user._id.toString()},process.env.SECRET_KEY);
        user.tokens = user.tokens.concat({token})
        await user.save()
        return token
    }catch(e){
        console.log("errror is" + e)
    }
}
employeeSchema.pre('save', async function (next) {
    const user = this

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
        user.confirmPassword = await bcrypt.hash(user.confirmPassword, 8)
    }

    next()
})

const Register = new mongoose.model("Register", employeeSchema);
module.exports = Register;

