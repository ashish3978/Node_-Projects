const mongoose = require('mongoose');
const data = async ()=>{
    const url = "mongodb://127.0.0.1:27017/registerdatabase"
    const connect = await mongoose.connect(url)
    console.log("Connected to " + url);

};
data();
const categorySchema = new mongoose.Schema({
    id : Number, 
    catname : {
        type: String,
        required: true,
        unique: true
    },
})


const model = new mongoose.model('categorydata', categorySchema)


module.exports = model;