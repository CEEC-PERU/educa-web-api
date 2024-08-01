const cloudinary = require('../../config/cloudinary');
const fs = require('fs');

exports.uploadVideo = async (filePath, folder) => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      resource_type: 'video',
      folder: folder,
    });
    fs.unlinkSync(filePath); // Elimina el archivo local después de subirlo a Cloudinary
    return result.secure_url;
  } catch (error) {
    console.error('Error uploading video to Cloudinary:', error);
    throw new Error('Error uploading video');
  }
};