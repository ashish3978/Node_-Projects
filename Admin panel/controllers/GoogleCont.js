const model = require("../models/loginmodel");
const RoleModel = require("../models/RoleModel");

const express = require('express');
const nodemailer = require('nodemailer')
const mongoose = require('mongoose')


const SaveGoogleData = async (req,res)=>{
    const {fullname,password,email, role_id, googleId} = req.body
    console.log(req.body)
    const checkRole = await model.findOne({role_id}).populate('role_id');
    const roledata = await RoleModel.find(); 
    
        if(fullname && email && password){    
            if(checkRole){
                if(checkRole.role_id.Rolename == "Admin"){
                    req.flash('danger', 'Admin is already registered');
                    res.render('register', {
                        message_2: req.flash('danger'),
                        roledata: roledata, 
                    }); 
                }else if(checkRole.role_id.Rolename == "Manager"){
                    let checkManager = await loginmodel.find({role_id});
                        if(checkManager.length == 3){
                            req.flash('danger', 'Three Managers already registered');
                            res.render('register', {
                                message_2: req.flash('danger'),
                                roledata: roledata,
                            });   
                        }else{
                            let data = await model.findOneAndUpdate({ googleId }, {
                                $set: {
                                    fullname: fullname,
                                    email: email,
                                    role_id: role_id
                                }
                            });
                                const mailInfo ={
                                    from : "infinityspam3@gmail.com",
                                    to : email,
                                    subject : 'Admin Panel',
                                    text : 'register',
                                    html : '<p>You are successfully registered</p>'
                                }

                                res.redirect("/")
                            }
                }else if(userdata){
                    req.flash('danger', 'email already registered');
                    res.render('register', {
                        message_2: req.flash('danger'),
                        roledata: roledata,
                    }); 
                }
            }else{
                let data = await model.findOneAndUpdate({ googleId }, {
                    $set: {
                        fullname: fullname,
                        email: email,
                        role_id: role_id
                    }
                });
                    const mailInfo ={
                        from : "infinityspam3@gmail.com",
                        to : email,
                        subject : 'Admin Panel',
                        text : 'register',
                        html : '<p>You are successfully registered</p>'
                    }
                res.redirect("/");
                }
                }else{
                    req.flash('danger', 'Please Fill All Fields');
                        res.render('register', {
                            message_2: req.flash('danger'),
                            roledata: roledata,
                        }); 
        }
}
const loginData = (req, res) => {
    res.render('loginDetails', {

    });
}
module.exports = {SaveGoogleData,loginData}