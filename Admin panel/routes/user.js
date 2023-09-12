const express = require('express');
const body = require('body-parser');
const bodyParser = body.urlencoded({extended: false});
const passport = require('passport');
const router = express.Router();
const model = require('../models/model')
const {getdata,getform, getCat, getpostdata, getregisterdata, getlogindata,clogindata, OTP} = require('../controllers/user');
router.get('/admin/data', getdata);
router.get('/admin/form', getform);
router.get('/admin/category', getCat);

router.post('/OTP',bodyParser,OTP)

router.post('/admin/save', bodyParser,getpostdata);
router.post('/register', bodyParser,getregisterdata);
// router.post('/logincheck', bodyParser,getlogindata);
router.post('/', bodyParser,clogindata);

router.get('/passforgot', (req, res) => {
  res.render('forgotpassform')
})

module.exports = router;