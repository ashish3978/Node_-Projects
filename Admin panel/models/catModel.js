const mongoose = require('mongoose');
const data = async ()=>{
    const url = "mongodb://127.0.0.1:27017/registerdatabase"
    await mongoose.connect(url)
};
data();
const categorySchema = new mongoose.Schema({
    id : Number,
    categoryname : String,
})


const catmodel = new mongoose.model('categorydata', categorySchema)


module.exports = catmodel;