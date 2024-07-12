const cloudinary = require('../../config/cloudinary');

exports.uploadBuffer = async (buffer, folder, originalname) => {
  try {
    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          resource_type: 'raw',
          folder: folder,
          public_id: originalname
        },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        }
      );
      stream.end(buffer);
    });
    return result;
  } catch (error) {
    console.error('Error uploading file to Cloudinary:', error);
    throw new Error('Error uploading file');
  }
};
