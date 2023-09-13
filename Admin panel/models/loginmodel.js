const mongoose = require('mongoose');
const data = async ()=>{
    const url = "mongodb://127.0.0.1:27017/registerdatabase"
    await mongoose.connect(url);
    console.log("Connected to " + url);
}
data()
const userSchema = new mongoose.Schema({
    id : Number,
    fullname : {
        type : String,
        required : true,
        unique : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : String,
})

                                                    
const models = mongoose.model('admin', userSchema)


module.exports = {models, userSchema};