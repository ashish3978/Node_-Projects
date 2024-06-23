// server.js
const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Image = require('./model');
const connectDB = require('./db');

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();
app.use('/upload', express.static(path.join(__dirname, 'upload')));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    }
  });

const upload = multer({ storage: storage });

app.use(express.json());

// Upload endpoint
app.post('/upload', upload.single('image'), async (req, res) => {
  try {
    const filePath = path.join('upload', req.file.filename);
    const newImage = new Image({
      name: req.file.originalname,
      contentType: req.file.mimetype,
      filePath: filePath
    });

    const hostname = req.protocol + '://' + req.get('host');
    const imageUrl = `${hostname}/${filePath}`;

    await newImage.save();
    res.status(201).send('Image uploaded successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

app.get('/getImage', async (req, res) => {
    try {
      const images = await Image.find();
      const hostname = req.protocol + '://' + req.get('host');
  
      const imagesWithUrls = images.map(image => {
        return {
          _id: image._id,
          name: image.name,
          contentType: image.contentType,
          filePath: image.filePath,
          imageUrl: `${hostname}/${image.filePath}`
        };
      });
  
      res.json(imagesWithUrls);
    } catch (error) {
      console.error(error);
      res.status(500).send('Server error');
    }
  });


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
