// src/services/videos/videoService.js
const cloudinary = require('../../config/cloudinary');

exports.uploadVideo = async (filePath) => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      resource_type: 'video',
      folder: 'videos', // Puedes organizar tus videos en carpetas
    });
    return result.url;
  } catch (error) {
    console.error('Error uploading video to Cloudinary:', error);
    throw new Error('Error uploading video');
  }
};
