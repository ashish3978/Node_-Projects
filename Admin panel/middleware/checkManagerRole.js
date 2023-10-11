const express = require('express');

var app = express();
app.use(express.json());


const checkManagerRole = (req, res, next) => {
    const userRole = req.cookies.UserRole; // Assuming the role is stored in a cookie
  
    if (userRole && userRole === 'Manager') {
      req.flash('danger', 'Managers are not allowed to access this functionality.');
      return res.render('/admin/data', { message: req.flash('danger') });
    }
    next();
  };

  module.exports = checkManagerRole