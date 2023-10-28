let userModel = require("../models/model");
const fs = require('fs');
const pdata= '';

const express = require("express");
const multer = require("multer");
const app = express();
app.set('view engine', 'ejs')

// let imagefile = '';
// const storage = multer.diskStorage({
//   destination: function (req, file, callback) {
//     return callback(null, './uploads/')
//   },
//   filename: function (req, file, callback) {
//     imagefile = Date.now() + file.originalname
//     return callback(null, imagefile);
//   }
// });
// const upload = multer({ storage: storage });

// const getform = (req, res) => {
//   res.render("movie", {
//     data: [{}],
//   })
// };

const moviedata = async (req, res) => {
    const result = await userModel.find({});
    console.log(result);
    res.render("movie", {
      data: result,
      pdata: pdata,
    });
  }
      //  let imgname = "uploads/" + pdata.image
   


    const DeleteData = async (req, res) => {
    
      result = await userModel.findOne({id: req.params.id});
      let img = "uploads/" + user.pimage;


      fs.unlink(img, () => {
        console.log("delete");
    });

    await model.findByIdAndDelete({id: req.params.id});
    res.redirect('/');
    }
    

const EditData = async (req, res) => {

    let id = req.params.id;
    console.log(id);
    result = await userModel.find();
    pdata = await userModel.find({id: req.params.id})
    res.render("movie", {
      data: result,
        pdata: pdata,
    });
  }

module.exports = {
  moviedata,
  DeleteData,
  EditData,
};

