const express = require('express');
const model = require('../models/catModel');

const app = express();
app.use(express.json());

const getcategorydata = async (req, res) => {
    const a= new model({
        id: 1,
        category: req.body.category,
    })
    const a2 = await a.save();
    console.log("data save successfully"+a2)
    res.send("data saved successfully") 
}

module.exports = getcategorydata;