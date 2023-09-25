const mongoose = require('mongoose');
const data = async()=>{
    
    const url = "mongodb://127.0.0.1:27017/registerdatabase";
    await mongoose.connect(url);
};

data();

const subcategory =  new mongoose.Schema({
    name: String,
    cat_id:{
        type:mongoose.Schema.Types.ObjectId, ref: 'categorydata'
    }
});

const submodel = new mongoose.model('subcategory', subcategory)

module.exports = submodel;