// models/Image.js
const mongoose = require('mongoose');
const { fileURLToPath } = require('url');

const ImageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  contentType: {
    type: String,
    required: true
  },
  filePath: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Image', ImageSchema);
