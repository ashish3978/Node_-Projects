    const express = require('express');
    const loginmodel = require('../models/loginmodel');
    const RoleModel = require('../models/RoleModel'); 
    const bcrypt = require('bcrypt');
    const nodemailer = require('nodemailer');
    const saltRounds = 10;
    const app = express();
    app.use(express.json());

    const jwt = require('jsonwebtoken');
    const localStorage = require('localStorage');
    const secretKey = 'Hello'; 

    const userdata = async(req,res) => {
        if(req.cookies && req.cookies.UserName != ""){
            return res.redirect('/')
        } 
    } 

    const getdata = async (req,res)=>{ 
        const roledata = await RoleModel.find();
        console.log(roledata)
            res.render("register", { 
                fullname: req.cookies.UserName,
                roledata: roledata,
                message_2: ''
            });
    }; 

    const getform = async (req,res)=>{
        await userdata(req,res)
        res.render('form',{username:req.cookies.UserName})
    }

    const getcategorydata = (req, res) => {
        res.render('categories', {message: ''});
    }
    
    const login = (req, res) => {
        res.render('/', { message: '' });
    }

    const transporter = nodemailer.createTransport({
        port : 465,
        host : "smtp.gmail.com",
        auth : {
            user : "infinityspam3@gmail.com",
            pass: 'rbqkvbpzgwhatzzu',
        },
        secure  : true,
    })

    const getpostdata = async (req,res)=>{
        const r= new model({
            id: 1,
            email: req.body.email,
            password: req.body.password
        })
        const r2 = await r.save();
        console.log("data save successfully"+r2)
        res.send("data saved successfully")
    }

    const getregisterdata = async (req,res)=>{
        const {fullname,password,email, role_id} = req.body
        const roledata = await RoleModel.find(); 
        const userdata = await loginmodel.findOne({email});
        const checkRole = await loginmodel.findOne({role_id}).populate('role_id');
        console.log("check user"+userdata); 
        
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
                                    const crypted = await bcrypt.hash(password, saltRounds)
                                    const r3= new loginmodel({
                                        id: 1,
                                        fullname: fullname,
                                        email: email,
                                        password: crypted,
                                        token: '',
                                        role_id: role_id
                                    })
                                    const mailInfo ={
                                        from : "infinityspam3@gmail.com",
                                        to : email,
                                        subject : 'Admin Panel',
                                        text : 'register',
                                        html : '<p>You are successfully registered</p>'
                                    }
                                    await transporter.sendMail(mailInfo)
                                    await r3.save();

                                    let token = jwt.sign({r3:r3}, secretKey)
                                    let _id = r3._id;
                                    const result = await loginmodel.findByIdAndUpdate({_id},{$set: {token:token}})
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
                const crypted = await bcrypt.hash(password, saltRounds)
                const r3= new loginmodel({
                    id: 1,
                    fullname: fullname,
                    email: email,
                    password: crypted,
                    token: '',
                    role_id: role_id
                })
                const mailInfo ={
                    from : "infinityspam3@gmail.com",
                    to : email,
                    subject : 'Admin Panel',
                    text : 'register',
                    html : '<p>You are successfully registered</p>'
                }
                await transporter.sendMail(mailInfo)
                await r3.save();

                let token = jwt.sign({r3:r3}, secretKey)
                let _id = r3._id;
                const result = await loginmodel.findByIdAndUpdate({_id},{$set: {token:token}})
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
        

        // const getlogindata = async (req,res)=>{
        //     const userdata = await loginmodel.findOne({email: req.body.email,password:req.body.password});
        //     console.log("check user "+userdata);
        //     if (userdata){
        //         res.cookie("UserName",userdata.fullname);
        //         console.log("Redirecting to /admin/data");
        //         return res.redirect('/admin/data')
        //     }else{
        //         // req.end("user already registered");
        //         req.flash('danger', 'Email or password wrong!');
        //         console.log("Rendering login page with error message");
        //         return res.render('login', { message1: req.flash('danger') });
        //     }
        // }
  
        const clogindata = async (req,res)=>{
            const rdata = await loginmodel.findOne({email: req.body.email}).populate('role_id');
            console.log("check user "+rdata);
            if (req.body.email != '' && req.body.password != '') {
                if (rdata){
                    const isPasswordValid = await bcrypt.compare(req.body.password, rdata.password);
                    if(!isPasswordValid){
                        req.flash('danger', 'Email or password wrong!');
                        return res.render('login', { message: req.flash('danger') });
                    }
                    else{
                        res.cookie("fullname", rdata.fullname);
                        localStorage.setItem('uToken', JSON.stringify(rdata.token));
                        res.cookie("UserRole", rdata.role_id.Rolename);
                        res.render('index', { message: '', username: rdata.name });
                    }
                }
            } else {
                req.flash('danger', 'Please Enter All the Fields!');
                res.render('login', { message: req.flash('danger') });
            }
        }


        function OTPgen(){
            let min = 100000;
            let max = 999999;
            otp = Math.floor(Math.random()*(max - min + 1)) + min;
            return otp;
        }


        const OTP = async (req, res)=>{
            email = req.body.email
            let rdata = await loginmodel.findOne({email : req.body.email});
            if (!rdata){
                res.send("User not found")
            }else{
                otp = OTPgen();
                console.log(otp)        
                const transporter = nodemailer.createTransport({
                    port : 465,
                    host : "smtp.gmail.com",
                    auth : {
                        user : "infinityspam3@gmail.com",
                        pass: 'rbqkvbpzgwhatzzu',
                    },
                    secure  : true,
                });
                const mailInfo ={
                    from : "infinityspam3@gmail.com",
                    to : email,
                    subject : 'Admin Panel',
                    text : 'Forgot Password',
                    html : `<p>Your OTP is ${otp} </p>`
                }
                await transporter.sendMail(mailInfo)
            }
            res.redirect('/admin/data')
        }

        module.exports = {
            getdata,
            getform,
            getpostdata,
            getregisterdata,
            clogindata,
            OTP,
            getcategorydata,
            login
        };
