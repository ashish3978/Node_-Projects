const express = require('express');
const body = require('body-parser');
const bodyParser = body.urlencoded({extended: false});
const passport = require('passport');
const router = express.Router();
const model = require('../models/model')
const {getdata,getform, getpostdata, getregisterdata, getlogindata,clogindata} = require('../controllers/user');
router.get('/admin/data', getdata);
router.get('/admin/form', getform);
// router.post('/admin/save', bodyParser,getpostdata);
router.post('/register', bodyParser,getregisterdata);
// router.post('/logincheck', bodyParser,getlogindata);
router.post('/', bodyParser,clogindata);


router.get('/sidebar/:userId', async (req, res) => {
    try {
      const userId = req.params.userId;
      const user = await model.findById(userId);
  
      res.render('profile', { user });
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
  });

module.exports = router;