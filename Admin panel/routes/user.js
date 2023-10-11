const express = require('express');
const body = require('body-parser');
const bodyParser = body.urlencoded({extended: false});
const router = express.Router();



const {getdata, getform, getpostdata, getregisterdata, clogindata ,OTP} = require('../controllers/user');
const {getcategorydata, savecat, editCategory, deleteCategory, updateCate} = require('../controllers/categories');
const {SaveSubCat, Allsubcat,delsubcat, editsubcat, updatesubcat, allcatdata, Getsearchdata} = require('../controllers/subcate');
const {AllPro, AllSubData, SaveProducts, deleteProduct, editProduct, updateProduct} = require('../controllers/Products');
const {SaveRole, AllRole, AllRoleData, EditRole, UpdateRole, DeleteRole} = require('../controllers/RoleController');
const verifytoken = require('../models/JWT');
const upload = require('../middleware/upload');

// router.get('/admin/form', getform);
router.get('/admin/data', getdata); 
router.get('/admin/category', getcategorydata);
router.get('/admin/subcategory', Allsubcat);
router.get('/admin/products',AllPro);
router.get('/Role',AllRole);

router.get('/AllRoleData',AllRoleData);
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
router.post('/SaveRole',bodyParser, SaveRole);

router.post('/savesubcat',bodyParser,SaveSubCat);
router.post('/ProductSave',upload.single('Images'),bodyParser,SaveProducts);
 

module.exports = router; 