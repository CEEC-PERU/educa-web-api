const imageService = require('../../services/images/imageService');
const fs = require('fs');

exports.uploadImage = async (req, res) => {
  try {
    const imagePath = req.file.path;
    const imageUrl = await imageService.uploadImage(imagePath);
    fs.unlinkSync(imagePath);
    res.status(201).json({ url: imageUrl });
  } catch (error) {
    console.error('Error uploading image:', error);
    res.status(500).json({ error: 'Error uploading image' });
  }
};
