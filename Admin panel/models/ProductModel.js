const mongoose = require('mongoose');
const data = async()=>{
    
    const url = "mongodb://127.0.0.1:27017/registerdatabase";
    await mongoose.connect(url);
};

data();  

const Products =  new mongoose.Schema({
    Product_name: String,
    Product_price: {
        type: Number,
    }, 
    cat_id:{
        type:mongoose.Schema.Types.ObjectId, 
        ref: 'categorydata'
    },
    SubCat_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'subcategory'
    },
    Images: Array 
 });

const Product_model = new mongoose.model('PruductData', Products)

module.exports = Product_model;