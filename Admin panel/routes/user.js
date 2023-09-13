const express = require('express');
const body = require('body-parser');
const bodyParser = body.urlencoded({extended: false});
const passport = require('passport');
const router = express.Router();
const model = require('../models/catModel')
const {getdata,getform, getCat,  getregisterdata, getlogindata,clogindata, OTP} = require('../controllers/user');
const getcategorydata = require('../controllers/categories')
router.get('/admin/data', getdata);
router.get('/admin/form', getform);
router.get('/admin/category', getCat);

router.post('/OTP',bodyParser,OTP);

// router.post('/admin/save', bodyParser,getpostdata);
router.post('/register', bodyParser,getregisterdata);
router.post('/categories', bodyParser,getcategorydata)
// router.post('/logincheck', bodyParser,getlogindata);
router.post('/', bodyParser,clogindata);

router.get('/passforgot', (req, res) => {
  res.render('forgotpassform')
})

module.exports = router;