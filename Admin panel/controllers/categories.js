const express = require('express');
const model = require('../models/catModel');

const app = express();
app.use(express.json());

const getcategorydata = async (req,res)=>{
    const getallcat = await model.find();
    console.log(getallcat);
    
    res.render('categories',{
                    username:req.cookies.UserName,
                    getallcat: getallcat,
                    message2: '',
                    });
    }

    const savecat = async (req,res)=>{
    const id = 1;
    const getall = await model.find();
    console.log(getall)
    const len = getall.length+1;
    const catname = req.body.catname;
    const checkName = await model.findOne({catname:catname})
    if(checkName){
        res.send("Category Already Exists!");
    }
    const result = {
        id: len,
        catname: catname
    }
    const savedata = new model(result);
    await savedata.save();
    req.flash('success',   'Category Saved');
    res.render('categories',{
        username: req.cookies.UserName,
        // getallcat: getallcat,
        message2 : req.flash('success')
    });
}
 
module.exports = {getcategorydata, savecat};




