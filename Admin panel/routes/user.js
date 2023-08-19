const express = require('express');
const body = require('body-parser');
const bodyParser = body.urlencoded({extended: false});
const router = express.Router();
const {getdata,getform, getpostdata, getregisterdata, getlogindata} = require('../controllers/user');
router.get('/admin/data', getdata);
router.get('/admin/form', getform);
router.post('/admin/save', bodyParser,getpostdata);
router.post('/admin/register', bodyParser,getregisterdata);
router.post('/logincheck', bodyParser,getlogindata);


module.exports = router;