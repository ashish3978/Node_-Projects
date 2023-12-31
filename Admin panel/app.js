const express = require('express')
const app = express()
const routes = require('./routes/user');
const cookie = require('cookie-parser')
const session = require('express-session');
const flash = require('connect-flash');
const bodyParser = require('body-parser');
const DataConnect = require('./models/DBconnect')

const passport = require('passport');
DataConnect();
app.use(cookie());
app.use(session({
  secret:'flashblog',
  resave: true,
  saveUninitialized: true,
}));

app.use(passport.initialize()); 
app.use(passport.session()); 
app.use(flash());

app.set('view engine', 'ejs');
app.use(express.static(__dirname,));  

// app.use(bodyParser.urlencoded({ extended: false }));

app.use(routes);
app.get('/index', (req, res) => {
  res.render('index',{ 
    username: req.cookies.UserName,
    message: '' ,
    categoryCount: res.locals.categoryCount,
  })
})

app.get('/logout', (req, res) => {
  res.clearCookie('UserName')
  res.redirect('/')

})
app.get('/', (req, res) => {
  res.render('login',{message:''});
}) 

app.get('/register', (req, res) => {
  res.render('register',{message_2:''});
})



app.listen(9000, "127.0.0.1", () => {
    console.log("Server running on port 9000");
  });
  