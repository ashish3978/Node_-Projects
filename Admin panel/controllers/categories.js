const express = require('express');
const catmodel = require('../models/loginmodel');
const { model } = require('mongoose');

const app = express();
app.use(express.json());

const getcategorydata = async (req, res) => {
    const a = new catmodel({})
    const Getallcategories = await a.find({});
    console.log(Getallcategories)
    
      
    res.render('categories',{
        username: req.cookies.UserName,
        getallCate: getallCate
        });

}
 
// const catsave  = async (req,res)=>{
//     const id = 1;
//     const category = req.body.category;
//     const cname = await model.findOne({category:category})
//     if(cname){
//         res.send("category already exist");
//     }
// }
// const result = {
//     id : id,
//     category : category
// }

// const datasave = new catmodel(result)
// await datasave.save();
// const getallCate = await model.find();
// res.render('category',{username})

module.exports = getcategorydata;