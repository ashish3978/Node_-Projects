const express =require('express');
const model = require('../models/catModel')
const submodel = require('../models/SubCatModel');
const Product_model = require('../models/ProductModel');

const fs = require('fs');
const multer = require("multer");
const GridFsStorage = require("multer-gridfs-storage");
const Grid = require('gridfs-stream');
const path = require('path');
const crypto = require('crypto');
const methodOverride = require('method-override');

const app = express();
app.use(express.json());


const AllPro = async(req,res)=>{
    const catdata = await model.find();
    const subdata = await submodel.find();
    let proddata = await Product_model.find().populate("cat_id").populate("SubCat_id");
    res.render('products',{
        username: req.cookies.UserName,
        catdata: catdata, 
        message2:'',
        AllPro: proddata, 
        subdata: subdata,
        editProduct: '',  
    })
} 

const AllSubData = async(req,res)=>{
    let cat_id = req.query.selectedValue;
    let data = await submodel.find({cat_id: cat_id})
    if(data){
        res.json(data);
    }
}

const SaveProducts = async(req,res)=>{
    // const path = '././images/'+Date.now()+'.png'

    //     console.log(req.body)

    //     const imgdata = req.body.images;
    //     if (!imgdata) {
    //         throw new Error('Invalid image data');
    //     }
    //     const base64Data = imgdata.replace(/^data:([A-Za-z-+/]+);base64,/, '');        
    //     fs.writeFileSync(path, base64Data,  {encoding: 'base64'});
    //     const base64ImageData = 'data:image/png;base64,iVBORw0KG...'; // Replace with your actual base64 image data
    //     res.render('products', { item1: { Images: base64ImageData } });
        console.log(req.file.filename);
    const result = { 
        cat_id:req.body.cat_id,
        SubCat_id:req.body.sub_cat_id,
        Product_name:req.body.Product_name,
        Product_price:req.body.Product_price,
        Images: req.file.filename
    }

    const savedata = new Product_model(result);
    await savedata.save();
    res.redirect('/admin/products')
    
}



const deleteProduct = async(req,res)=>{
    const id = req.params.id;
    console.log(req.params.id);
    const result = await Product_model.findByIdAndRemove({_id:id})
    res.redirect('/admin/products');
}


const editProduct = async(req,res)=>{
    try {
        const id = req.params.id;
        console.log(id);

        const catdata = await model.find();
        const subdata = await submodel.find();
        const proddata = await Product_model.find().populate("cat_id").populate("SubCat_id");
        const result = await Product_model.findOne({ _id: id });

        res.render('products', {
            username: req.cookies.UserName,
            AllPro: proddata,
            message2: '',
            editProduct: result, 
            catdata: catdata,
            subdata: subdata,

        });
    } catch (error) {
        // Handle the error, e.g., log it or send an error response
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
};
const updateProduct = async(req,res)=>{
    let getAllCat = await Product_model.find();
    const Product_name = req.body.Product_name;
    const Product_price = req.body.Product_price;
    const id = req.body.cat_id;
    const Prod_id = req.params.id;
    const result = await Product_model.findByIdAndUpdate({_id:Prod_id},{
        $set:{
            Product_name:Product_name,
            Product_price: Product_price,
            cat_id:id,
            // sub_cat_id:sub_id
        }
        
    })
    console.log(result)
    console.log("Product details updated");
    res.redirect('/admin/products');
}

module.exports = {AllPro, SaveProducts, AllSubData, deleteProduct, editProduct, updateProduct};