require("dotenv").config();
const mongoose = require("mongoose");

mongoose.connect(process.env.DATABASE,{
    useCreateIndex:true,
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useFindAndModify: false
}).then(() =>{
    console.log("connection successful");
}).catch((e) =>{
    console.log("No connection");
})