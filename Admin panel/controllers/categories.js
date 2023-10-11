const express = require('express');
const model = require('../models/catModel');
const submodel = require('../models/SubCatModel');

const app = express();
app.use(express.json());
 
const getcategorydata = async (req,res)=>{
    const getAllCat = await model.find();
    console.log(getAllCat);
    
    res.render('categories',{
                    username:req.cookies.UserName,
                    getAllCat: getAllCat,
                    message: '',
                    editcate: ''
                    });
    }

const savecat = async (req,res)=>{
    const getAllCat = await model.find();
    console.log(getAllCat)  
    const len = getAllCat.length+1;
    const catname = req.body.catname;
    const cName = await model.findOne({catname:catname})
    
    if(cName){
        try {
            const categoryCount = await getAllCat.countDocuments();
            console.log(categoryCount)
            res.locals.categoryCount = categoryCount; // Make it accessible in templates
            // const employeeCount = await Employee.countDocuments();
            res.render('categories', { categoryCount });
          } catch (error) {
            res.locals.categoryCount = 0; // Handle the error or set a default value
            res.status(500).json({ error: 'Internal server error' });
          }
        req.flash('success', 'Category already exists');
        res.render('categories',{
            username: req.cookies.UserName,
            getAllCat: getAllCat,
            message : req.flash('success'),
            editcate: ''                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         
        });
    }else{
        const result = {
            id: len,
            catname: catname
        }
        const savedata = new model(result);
        await savedata.save();
        req.flash('success',   'Category Saved');
        res.render('categories',{
            username: req.cookies.UserName,
            getAllCat: getAllCat,
            message : req.flash('success'),
            editcate: ''
        });  
    }
}


const editCategory = async (req,res)=>{
    const id = req.params.id;
    getAllCat = await model.find();
    editcate = await model.findOne({_id: id});
    if(editcate){
        res.render('categories',{
            username: req.cookies.UserName,
            editcate:editcate,
            getAllCat: getAllCat,
            message: '',
        }); 
    }else{
        res.status(404).send("Category not found");
    }

}
const updateCate = async (req,res)=>{
    const id = req.params.id
    const catname = req.body.catname;
    const result = await model.findByIdAndUpdate(
            {_id:id},
            {$set:{catname:catname}
        }
    )
    getAllCat = await model.find();
    req.flash('success', 'Category updated successfully');
    if(result){
        res.render('categories',{
            username: req.cookies.UserName,
            getAllCat: getAllCat,
            message2: req.flash('success'),
            editcate:''
        }); 
    }

}

const deleteCategory = async (req,res)=>{
    const id = req.params.id;
    console.log("ID to delete:", id);
    const sub_cat = await submodel.find({cat_id: id});
    console.log("Deleted category:", sub_cat);
    if(sub_cat.length > 0){
        res.send("Category has subcategory so first delete it");
    } else {
        const data = await models.findByIdAndRemove({_id: id});
        if(data){
            res.redirect('/admin/category')
        }
        }
}



module.exports = {  
                    getcategorydata, 
                    savecat, 
                    editCategory, 
                    deleteCategory,
                    updateCate
                };




