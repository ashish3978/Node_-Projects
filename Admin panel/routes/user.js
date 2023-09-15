const express = require('express');
const body = require('body-parser');
const bodyParser = body.urlencoded({extended: false});
const router = express.Router();
const {getdata, getform, getCat, getpostdata, getregisterdata, getlogindata,clogindata, OTP} = require('../controllers/user');
const {getcategorydata, savecat} = require('../controllers/categories')
router.get('/admin/data', getdata);
router.get('/admin/form', getform);
router.get('/admin/category', getCat);
router.get('/getcategorydata', bodyParser,getcategorydata)

router.post('/OTP',bodyParser,OTP);

router.post('/admin/save', bodyParser,getpostdata);
router.post('/register', bodyParser,getregisterdata);
router.post('/categories',bodyParser, savecat);
// router.post('/logincheck', bodyParser,getlogindata);
router.post('/', bodyParser,clogindata);

router.get('/passforgot', (req, res) => {
  res.render('forgotpassform')
})

module.exports = router;