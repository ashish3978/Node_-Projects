const express = require('express');
const path = require('path');
const multer = require('multer');

var app = express();
app.use(express.json());


var storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null,'upload/')
    },
    filename: function (req, file, cb){
        let ext = path.extname(file.originalname);
    
    } 
});
let upload = multer({
    storage: storage,
    fileFilter: function (req,file, callback){
        if(
            file.mimetype == "image/png" ||
            file.mimetype == "image/jpeg" ||
            file.mimetype == "image/jpg"
        ){
            callback(null,true)
        }else{
            console.log("only jpg ,png file is supported")
            callback(null,false)
        }
    }
})
module.exports = upload