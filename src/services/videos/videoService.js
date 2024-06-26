const cloudinary = require('../../config/cloudinary');

exports.uploadVideo = async (filePath, folder) => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      resource_type: 'video',
      folder: folder,
    });
    return result.url;
  } catch (error) {
    console.error('Error uploading video to Cloudinary:', error);
    throw new Error('Error uploading video');
  }
};
