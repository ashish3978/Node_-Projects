const express = require('express')
const app = express()
const routes = require('./routes/user');
const cookie = require('cookie-parser')
const session = require('express-session');
const flash = require('connect-flash');
const bodyParser = require('body-parser');

app.use(cookie());
app.use(session({ secret: "secret-key",resave:true,saveUninitialized:true }));


app.use(bodyParser.urlencoded({ extended: false }));

app.use(session({
  secret: 'secret-key',
  saveUninitialized: false,
  resave: false,  
}));


app.set('view engine', 'ejs');
app.use(express.static(__dirname,));

app.use(session({
  secret:'flashblog',
  resave: true,
  saveUninitialized: true,
}));

app.use(flash());

app.use(routes);
// app.get('/index', (req, res) => {
//   res.render('login',{ message: '' })
// })

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
  