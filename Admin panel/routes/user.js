const express = require('express');
const body = require('body-parser');
const bodyParser = body.urlencoded({extended: false});
const router = express.Router();
const {getdata, getform, getpostdata, getregisterdata, clogindata ,OTP} = require('../controllers/user');
const {getcategorydata, savecat, editCategory, deleteCategory, updateCate} = require('../controllers/categories')
const {SaveSubCat, Allsubcat,delsubcat, editsubcat, updatesubcat, allcatdata} = require('../controllers/subcate')
router.get('/admin/data', getdata);
router.get('/admin/form', getform);
router.get('/admin/category', getcategorydata);
router.post('/admin/updatecategory/:id',bodyParser,updateCate);
router.get('/admin/deletecate/:id',deleteCategory);
router.get('/admin/editcate/:id',editCategory);
router.get('/admin/subcategory', Allsubcat);
router.get('/admin/delsubcategory/:id', delsubcat);
router.get('/admin/editsubcategory/:id', editsubcat);
router.get('/allcatdata',allcatdata);
router.post('/admin/updatesubcat/:id',bodyParser, updatesubcat);


router.post('/OTP',bodyParser,OTP);
router.post('/admin/save', bodyParser,getpostdata);
router.post('/register', bodyParser,getregisterdata);
router.post('/categories',bodyParser, savecat);
router.post('/savesubcat',bodyParser,SaveSubCat)

router.post('/', bodyParser,clogindata);
router.get('/passforgot', (req, res) => {
res.render('forgotpassform')
})

module.exports = router;