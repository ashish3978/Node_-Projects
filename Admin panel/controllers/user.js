const model = require('../models/model');

const getdata = (req,res)=>{
    res.render("index");
}

const getform = (req,res)=>{
    res.render('form')
}


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
    const Cuser = await loginmodel.findOne({ email: req.body.email});
    console.log("check user"+Cuser);
    if (Cuser) {
        return res.send("email already registered")
    }else{
        const r3= new loginmodel({
            id: 1,
            fullname: req.body.fullname,
            email: req.body.email,
            password: req.body.password
        })
        const r4 = await r3.save();
        console.log("data save successfully"+r4)
        // res.send("you are now registered")
        res.redirect("/")
    }
    }


    const getlogindata = async (req,res)=>{
     
         const data = await loginmodel.findOne({ email: req.body.email, password: req.body.password});
         
        console.log("check user "+data);
        if (data ) {
            res.redirect("/admin/data")
        }else{
            res.send("Email wrong")
        }
    }

module.exports = {
    getdata,
    getform,
    getpostdata,
    getregisterdata,
    getlogindata
};
