const express =require('express');
const model = require('../models/catModel')
const submodel = require('../models/SubCatModel');
const RoleModel= require('../models/RoleModel');        

const app = express();
app.use(express.json());

const SaveRole = async(req,res)=>{
    let roledata = await RoleModel.find();
    console.log(roledata)
    const Rolename = req.body.Rolename;
    const id = req.body.role_id;
    const cName = await RoleModel.findOne({Rolename:Rolename});
    
        const result = {
            Rolename: Rolename
        }
        console.log('id is '+id)
        console.log('name is '+Rolename)
        const savedata =  new RoleModel(result);
        await savedata.save();
    
        getAllRole =  await RoleModel.find();
        res.redirect('/Role')
    }

    const AllRoleData = async(req,res) => {
        let cat_id = req.query.selectedValue;
        let roledata;
        if(cat_id != '') {
            roledata =  await RoleModel.find({cat_id:cat_id}).populate("cat_id");
        }
        else {
            roledata =  await RoleModel.find().populate("cat_id");
        }
    
            res.json(roledata);
    }



const AllRole = async(req,res)=>{
    let catdata = await model.find();
    let roledata = await RoleModel.find();
    console.log(roledata);

    res.render('Role',{
        username: req.cookies.UserName,
        AllRole: roledata,
        message2:'',
        EditRole:'',
        catdata: catdata
    })
}
 const Getsearchdata = async(req, res)=>{
    try{
    let search = req.query.selectedValue;
    console.log(search);

    const categories = await model.find({
        Rolename :{ $regex: new RegExp(search, 'i')}
    });
    let id = categories.map(category=>category._id)
    let roledata = await RoleModel.find({
        cat_id : {$in: id}
    }).populate("cat_id");
    console.log(roledata);

    if(roledata.length  === 0){
        roledata = await RoleModel.find({Rolename: {$regex: new RegExp(search, 'i')}}).populate("cat_id");
    }
    res.json(roledata);
}catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
};



const DeleteRole =  async(req,res)=>{
    const id = req.params.id;
    console.log(req.params.id);
    const result = await RoleModel.findByIdAndRemove({_id:id})
    res.redirect('/Role');
}
const EditRole = async (req, res) => {
    try {
        const id = req.params.id;
        console.log(id);

        let catdata = await model.find();
        let roledata = await RoleModel.find()
        let result = await RoleModel.findOne({ _id: id });

        res.render('Role', {
            username: req.cookies.UserName,
            AllRole: roledata,
            message2: '',
            EditRole: result,
            catdata: catdata
        });
    } catch (error) {
        // Handle the error, e.g., log it or send an error response
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
};

const UpdateRole = async(req,res)=>{
    // let getAllCat = await RoleModel.find();  
    const Rolename = req.body.Rolename;
    const id = req.params.id;
    const sub_cat_id = req.params.id;
    const result = await RoleModel.findByIdAndUpdate({_id:id},{
        $set:{
            Rolename:Rolename,
        }
    })
    console.log(result)
    console.log("updated");
    res.redirect('/Role');
}
module.exports = {
                SaveRole, 
                AllRole, 
                DeleteRole,
                EditRole, 
                UpdateRole, 
                AllRoleData,
                Getsearchdata}