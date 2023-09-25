    const express = require('express');
    const loginmodel = require('../models/loginmodel');
    const bcrypt = require('bcrypt');
    const nodemailer = require('nodemailer');
    const saltRounds = 10;
    const app = express();
    app.use(express.json());


    const userdata = async(req,res) => {
        if(req.cookies && req.cookies.UserName != ""){
            return res.redirect('/')
        }
    }

    const getdata = async (req,res)=>{ 
    res.render("index", { fullname: req.cookies.UserName });
    };

    const getform = async (req,res)=>{
        await userdata(req,res)
        res.render('form',{username:req.cookies.UserName})
    }

    const getcategorydata = (req, res) => {
        res.render('categories', {message: ''});
    }
    
    const login = (req, res) => {
        res.render('/', { message1: '' });
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

    // const loginmodel = require('../models/loginmodel');

    const getregisterdata = async (req,res)=>{
        const {fullname,password,email} = req.body
        const userdata = await loginmodel.findOne({email});
        console.log("check user"+userdata);
        if (userdata) {
            // return res.send("email already registered")
            req.flash('danger', 'email already registered');
            res.render('register', { message: req.flash('danger') });
        }else{
            const crypted = await bcrypt.hash(password, saltRounds)
            const r3= new loginmodel({
                id: 1,
                fullname: fullname,
                email: email,
                password: crypted
            })
            const mailInfo ={
                from : "infinityspam3@gmail.com",
                to : email,
                subject : 'Admin Panel',
                text : 'register',
                html : '<p>You are successfully registered</p>'
            }
            await transporter.sendMail(mailInfo)
            const r4 = await r3.save();
            console.log("data save successfully"+r4)
            // res.send("you are now registered");
            res.redirect("/")
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
            const rdata = await loginmodel.findOne({email: req.body.email});
            console.log("check user "+rdata);
            if (!rdata){
                return res.send("User not found");
            }else{
                const isPasswordValid = await bcrypt.compare(req.body.password, rdata.password);
                if(!isPasswordValid){
                    req.flash('danger', 'Email or password wrong!');
                    return res.render('login', { message1: req.flash('danger') });
                }else{
                    console.log('fednjn')
                    return res.redirect('/admin/data') ;
                }
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
