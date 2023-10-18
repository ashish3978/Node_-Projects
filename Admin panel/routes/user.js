const express = require('express');
const body = require('body-parser');
const bodyParser = body.urlencoded({extended: false});
const router = express.Router();
const multer = require('multer');
const passport = require('passport');

let Storage = multer.diskStorage({
    destination: 'images/',
    filename: (req, file, cb)=>{
        cb(null, file.originalname)
    }
});
require('../models/googleAuthentication')
let upload = multer({
    Storage: Storage
})
const {getdata, getform, getpostdata, getregisterdata, clogindata ,OTP} = require('../controllers/user');
const {getcategorydata, savecat, editCategory, deleteCategory, updateCate} = require('../controllers/categories');
const {SaveSubCat, Allsubcat,delsubcat, editsubcat, updatesubcat, allcatdata, Getsearchdata} = require('../controllers/subcate');
const {AllPro, AllSubData, SaveProducts, deleteProduct, editProduct, updateProduct} = require('../controllers/Products');
const {SaveRole, AllRole, AllRoleData ,EditRole, UpdateRole, DeleteRole} = require('../controllers/RoleController');
const verifytoken = require('../models/JWT');
// const upload = require('../middleware/upload');
const {SaveGoogleData, loginData} = require("../controllers/GoogleCont")
const checkManagerRole = require('../middleware/checkManagerRole');
const RoleModel = require('../models/RoleModel');


// router.get('/admin/form', getform);
router.get('/admin/data', getdata); 
router.get('/admin/category',verifytoken, getcategorydata);
router.get('/admin/subcategory',verifytoken, Allsubcat);
router.get('/admin/products',verifytoken,AllPro);
router.get('/Role',AllRole);

 
router.get('/AllRoleData', checkManagerRole,AllRoleData);
router.get('/allcatdata',allcatdata);
router.get('/allsubdata', AllSubData);
router.get('/GetSearchData',Getsearchdata);

// Edit, Update, Delete section
router.get('/admin/editcate/:id',editCategory);
router.get('/admin/deletecate/:id',deleteCategory);
router.post('/admin/updatecategory/:id',bodyParser,updateCate);
router.get('/admin/editsubcategory/:id', editsubcat);
router.get('/admin/delsubcategory/:id', delsubcat);
router.post('/admin/updatesubcat/:id',bodyParser, updatesubcat);
router.get('/admin/deleteProduct/:id', deleteProduct);
router.get('/admin/editProduct/:id', editProduct);
router.post('/admin/updateProduct/:id',bodyParser, updateProduct);
router.get('/DeleteRole/:id', DeleteRole); 
router.get('/EditRole/:id', EditRole);
router.post('/UpdateRole/:id',bodyParser, UpdateRole);


router.post('/register', bodyParser,getregisterdata);
router.post('/admin/save', bodyParser,getpostdata);
router.post('/', bodyParser,clogindata);
router.post('/OTP',bodyParser,OTP);
router.post('/categories',bodyParser, savecat);
router.post('/SaveRole',checkManagerRole ,bodyParser, SaveRole);

router.post('/savesubcat',bodyParser,SaveSubCat);
router.post('/ProductSave',upload.array('image'),bodyParser,SaveProducts);

router.get('/loginData', loginData)
router.post('/admin/Alldetails',bodyParser,SaveGoogleData);
router.get('/auth/google',passport.authenticate('google', { scope: ['profile','email'] }));
 
router.get('/auth/google/callback', 
  passport.authenticate('google', { 
        // successRedirect:'/admin/home',
        failureRedirect: '/'
   }),async (req,res)=>{
    let Roledata = await RoleModel.find({isActive:1})
      console.log(req.user.profile)
      if(req.user.created){
          res.render('LoginData',{
            user:req.user.profile,
            Roledata:Roledata,
            message2:"You have been registered successfully."
          });
      } else {
          res.redirect('/admin/home');
      }
   });


module.exports = router; 