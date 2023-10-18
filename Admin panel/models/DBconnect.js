const mongoose = require('mongoose');

const DataConnect = async () => {

    const url = 'mongodb://127.0.0.1:27017/registerdatabase';
    await mongoose.connect(url);

};

module.exports = DataConnect