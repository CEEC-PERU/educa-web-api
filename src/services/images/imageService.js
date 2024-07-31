const cloudinary = require('../../config/cloudinary');

exports.uploadImage = async (filePath, folder) => {
  try {
    console.log(`Verificando existencia del archivo antes de la subida: ${filePath}`);
    
    const result = await cloudinary.uploader.upload(filePath, {
      resource_type: 'image',
      folder: folder,
    });

    console.log(`Subida a Cloudinary completa. Archivo subido a: ${result.secure_url}`);
    
    return result.secure_url;
  } catch (error) {
    console.error('Error uploading image to Cloudinary:', error);
    throw new Error('Error uploading image');
  }
};
