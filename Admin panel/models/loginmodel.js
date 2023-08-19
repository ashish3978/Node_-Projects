const mongoose = require('mongoose');
const data = async ()=>{
    const url = "mongodb://127.0.0.1:27017/ashish"
    await mongoose.connect(url);
    console.log("Connect");
}
data()
const userSchema = new mongoose.Schema({
    id : Number,
    fullname : {
        type : String,
        required : true,
        unique : true
    },
    email : String,
    password : String,
})

                                                    
const loginmodel = mongoose.model('admin', userSchema)


module.exports = loginmodel;