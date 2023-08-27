const model = require('../models/loginmodel');
const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;
const passportinit = async (passport) => {
    passport.use(new LocalStrategy(async (fullname, password, done) => {
        let dataa = await model.findOne({fullname : fullname});
        try{
            if(!dataa) return await done(null, false);
            const isPasswordValid = await bcrypt.compare(password, dataa.password);

            if(!isPasswordValid){
                return done(null, false, {message: 'Passwords do not match'});
            }
            return await done(null, dataa);
        }catch (error){
            return await done(error, false);
        }
    }));
    passport.serializeUser(async (model, done) => {
        done(null, model);
    });

    passport.deserializeUser(async (id, done) => {
        let adata = await model.findById(id);
        done(null, adata);
    });
}

module.exports = passportinit;