const mongoose = require('mongoose');
const data = async ()=>{
    const url = "mongodb://127.0.0.1:27017/registerdatabase"
    await mongoose.connect(url);
    console.log("Connected to " + url);
}
data();
const RoleSchema = new mongoose.Schema({
    Rolename : String,
    isActive:{
        type : Boolean,
    } 
});

const RoleModel = mongoose.model('Role', RoleSchema)


module.exports = RoleModel;