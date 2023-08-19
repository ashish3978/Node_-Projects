const express = require('express')
const app = express()
const routes = require('./routes/user');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(routes);

app.set('view engine', 'ejs');
app.use(express.static(__dirname,));

app.get('/', (req, res) => {
  res.render('login');
})

app.get('/register', (req, res) => {
  res.render('register');
})

const mongoose = require('mongoose');

    const maindata = async ()=>{
        const url = 'mongodb://127.0.0.1:27017/admin';
        const connect = await mongoose.connect(url);

        const empSchema = new mongoose.Schema({
            id : Number,
            name: String,
            age : Number,
            salary : Number,
        })
        const empmodel = new mongoose.model('employee', empSchema);

        const data = new empmodel({
            id : 1,
            name : 'test',
            age : '25',
            salary : '30000',
        })
        let res = await data.save();
        console.log("Successfully saved data")
    }
    maindata();


app.listen(8000, "127.0.0.1", () => {
    console.log("Server running on port 8000");
  });
  