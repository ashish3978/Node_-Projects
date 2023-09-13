const express = require('express')
const app = express()
const routes = require('./routes/user');
const cookie = require('cookie-parser')
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport')
const bodyParser = require('body-parser');
const passportinit = require('./controllers/passport');

app.use(cookie());
app.use(session({ secret: "secret-key",resave:true,saveUninitialized:true }));

passportinit(passport);

app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.urlencoded({ extended: false }));

app.use(session({
  secret: 'secret-key',
  resave: false,
  saveUninitialized: false,
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
app.get('/index', (req, res) => {
  res.render('login',{ message: 'b jjnvjknj x' })
})

app.get('/logout', (req, res) => {
  res.clearCookie('UserName')
  res.redirect('/')

})
app.get('/', (req, res) => {
  res.render('login');
})

app.get('/register', (req, res) => {
  res.render('register');
})

// const mongoose = require('mongoose');

//     const maindata = async ()=>{
//         const url = 'mongodb://127.0.0.1:27017/admin';
//         const connect = await mongoose.connect(url);

//         const empSchema = new mongoose.Schema({
//             id : Number,
//             name: String,
//             age : Number,
//             salary : Number,
//         })
//         const empmodel = new mongoose.model('employee', empSchema);

//         const data = new empmodel({
//             id : 1,
//             name : 'test',
//             age : '25',
//             salary : '30000',
//         })
//         let res = await data.save();
//         console.log("Successfully saved data")
//     }
//     maindata();


app.listen(9000, "127.0.0.1", () => {
    console.log("Server running on port 8000");
  });
  