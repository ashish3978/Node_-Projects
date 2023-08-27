const { request } = require('express');
const model = require('../models/model');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const saltRounds = 10;
let plainpassword = '';
const userdata = async(req,res) => {
    if(req.cookies && req.cookies.UserName != "admin"){
        return res.redirect('/')
    }
}

const getdata = async (req,res)=>{
    // await userdata(req,res)
    res.render("index",{fullname:req.cookies.UserName});
}

const getform = async (req,res)=>{
    // await userdata(req,res)
    res.render('form',{username:req.cookies.UserName})
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

const loginmodel = require('../models/loginmodel');



const getregisterdata = async (req,res)=>{
    const {fullname,password,email } = req.body
    const userdata = await loginmodel.findOne({ email});
    console.log("check user"+userdata);
    if (userdata) {
        return res.send("email already registered")
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
            html : '<p>Please Stop Your Illegal Works</p>'
        }
        await transporter.sendMail(mailInfo)
        const r4 = await r3.save();
        console.log("data save successfully"+r4)
        // res.send("you are now registered");
        res.redirect("/")
    }
    }


    const getlogindata = async (req,res)=>{
        const userdata = await loginmodel.findOne({email: req.body.email,password:req.body.password});
        console.log("check user "+userdata);
        if (userdata){
            res.cookie("UserName",userdata.fullname)
            res.redirect('/admin/data')
        }else{
            // req.end("user already registered");
            req.flash('danger', 'Email or password wrong!');
            res.render('login', { message: req.flash('danger') });
        }
    }

    const clogindata = async (req,res)=>{
        const rdata = await loginmodel.findOne({email: req.body.email});
        console.log("check user "+rdata);
        if (!rdata){
            res.send("User not found")
        }else{
            const isPasswordValid = await bcrypt.compare(req.body.password, rdata.password);

            if(!isPasswordValid){
                req.flash('danger', 'Email or password wrong!');
            res.render('login', { message: req.flash('danger') });
            }
        }
        res.redirect('/admin/data')
    }



    module.exports = {
        getdata,
        getform,
        getpostdata,
        getregisterdata,
        getlogindata,
        clogindata
    };
