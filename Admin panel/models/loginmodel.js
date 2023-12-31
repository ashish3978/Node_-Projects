const mongoose = require('mongoose');
const findOrCreate = require('mongoose-findorcreate');
const data = async ()=>{
    const url = "mongodb://127.0.0.1:27017/registerdatabase"
    await mongoose.connect(url);
    console.log("Connected to " + url);
}

data();
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
    token :  String,
    role_id:{
        type: mongoose.Schema.Types.ObjectId, ref: 'Role'
    },
    google_id: String,
    googleId: String,
    Image: String,
})
userSchema.plugin(findOrCreate)
const loginmodel = mongoose.model('admin', userSchema)


module.exports = loginmodel;