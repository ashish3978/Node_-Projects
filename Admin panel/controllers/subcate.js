const express =require('express');
const model = require('../models/catModel')
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
        editsubcat: ''
        });
}

const SaveSubCat = async(req,res)=>{
    let getAllCat = await submodel.find();
    const name = req.body.name;
    const id = req.body.cat_id;
    const cName = await submodel.findOne({name:name});
    // if(cName){
    //     getAllCat =  await submodel.find();
    //     res.json(getAllCat)
    // }else{
        const result = {
            cat_id: id,
            name: name
        }
        console.log('id is '+id)
        console.log('name is '+name)
        const savedata =  new submodel(result);
        await savedata.save();
    
        getAllCat =  await submodel.find();
        res.redirect('/admin/subcategory')
    }

    const allcatdata = async(req,res) => {
        let cat_id = req.query.selectedValue;
        let subData;
        if(cat_id != '') {
            subdata =  await submodel.find({cat_id:cat_id}).populate("cat_id");
        }
        else {
            subdata =  await submodel.find().populate("cat_id");
        }
    
            res.json(subdata);
    }
const Allsubcat = async(req,res)=>{
    let catdata = await model.find();
    let subdata = await submodel.find().populate("cat_id");
    console.log(subdata);
    res.render('subcategory',{
        username: req.cookies.UserName,
        Allsubcat: subdata,
        message2:'',
        editsubcat:'',
        catdata: catdata
    })
}

const delsubcat =  async(req,res)=>{
    const id = req.params.id;
    console.log(req.params.id);
    const result = await submodel.findByIdAndRemove({_id:id})
    res.redirect('/admin/subcategory')
}
const editsubcat = async(req,res)=>{
    const id = req.params.id;
    console.log(id)
    let catdata = await model.find();
    let subdata =  await submodel.find().populate("cat_id");
    result = await submodel.findOne({_id:id})
    res.render('subcategory',{
        username: req.cookies.UserName,
        Allsubcat: subdata,
        message2:'',
        editsubcat:result,
        catdata: catdata
});
}

const updatesubcat = async(req,res)=>{
    let getAllCat = await submodel.find();
    const name = req.body.name;
    const id = req.body.cat_id;
    const sub_cat_id = req.params.id;
    const result = await submodel.findByIdAndUpdate({_id:sub_cat_id},{
        $set:{
            name:name,
            cat_id:id,
        }
    })
    console.log("updated");
    res.redirect('/admin/subcategory');
}
module.exports = {SaveSubCat, Allsubcat, delsubcat ,editsubcat, updatesubcat, allcatdata}