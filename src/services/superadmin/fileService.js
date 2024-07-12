const cloudinary = require('../../config/cloudinary');

exports.uploadBuffer = (buffer, folder, filename) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream({
      resource_type: 'raw',
      folder: folder,
      public_id: filename, // Esto incluye el nombre del archivo con la extensión
    }, (error, result) => {
      if (error) {
        reject(new Error('Error uploading file'));
      } else {
        resolve(result);
      }
    });

    uploadStream.end(buffer);
  });
};
