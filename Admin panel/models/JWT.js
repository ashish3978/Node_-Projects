const jwt = require('jsonwebtoken');
const localStorage = require('localStorage');

const secretKey = 'Hello';
const verifyToken = (req,res,next)=>{
    let token = JSON.parse(localStorage.getItem('uToken'));
    jwt.verify(token, secretKey, function(err, decoded) {
        if(err){
            res.redirect('/')
        } else {
            next();
        }   
      });
}

module.exports = verifyToken;