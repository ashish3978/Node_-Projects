const mongoose = require('mongoose');
const tdata = async ()=>{
    const url = "mongodb://127.0.0.1:27017/moviedatabase"
    await mongoose.connect(url);
    console.log("Connected to " + url);
}
tdata()

const movieSchema = new mongoose.Schema({
    id : Number,
    Moviename : String,
    RealeseDate : Number,
    NoOfCharacters : Number,
    image : String,
})

const models = mongoose.model('moviesdata', movieSchema)
module.exports = models;