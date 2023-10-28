const express = require('express');
const body = require('body-parser');
const router = express.Router();
const multer = require('multer');
const models = require('../models/model');
const fs = require('fs');
const bodyParser = body.urlencoded({extended: false});



let imagefile = '';
const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    return callback(null, './uploads/')
  },
  filename: function (req, file, callback) {
    imagefile = Date.now() + file.originalname
    return callback(null, imagefile);
  }
});
const upload = multer({ storage: storage });
const {moviedata, DeleteData, EditData} = require('../controllers/controller');

router.get('/movies', moviedata);
router.get('/del/:id', DeleteData);
router.get('/edit/:id', EditData);
router.post('/savedata',upload.single('image'), async (req, res) => {

let id = req.body.hid;
let name = req.body.name;


if (id != "") {
            
        pdata = await models.find();
        oldImageName = (pdata.image!='')?pdata.image:'';
        
            if(req.file && imagefile != ''){
                let imgname = "uploads/"+pdata.image
                fs.unlink(imgname,()=>{
                    console.log("Image deleted...")
                })
            }


    let info = await models.findOneAndUpdate({
                id: id },
                { 
                    $set:{
                        Moviename: req.body.name,
                        RealeseDate: req.body.realesedate,
                        NoOfCharacters: req.body.numchar,
                        image: (req.file && imagefile != '')?imagefile:oldImageName 
                    } 
                });
                console.log(info)   
            } else {
            if (name != ''){
                data = new models({
                    id: (result.length + 1).toString(),
                    Moviename: req.body.name,
                    RealeseDate: req.body.realesedate,
                    NoOfCharacters: req.body.numchar,
                    image: imagefile
                  });

                await moviedata.save();
            }
        }

        pdata = '';
        res.redirect('/')
});
module.exports = router;