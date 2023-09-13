const mongoose = require('mongoose');
const data = async ()=>{
    const url = "mongodb://127.0.0.1/categories"
    await mongoose.connect(url)
}
data();
const categorySchema = new mongoose.Schema({
    id : Number,
    category : String,
})


const adminmodel = new mongoose.model('categorydata', categorySchema)


module.exports = {adminmodel,categorySchema};