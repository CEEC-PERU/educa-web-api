// controllers/userInfoController.js
const UserInfo = require('../../models/UserInfo');
const awsService = require('../../services/archivos/archivoService');
const awsServiceI = require('../../services/images/imageService');
const path = require('path');

exports.createUserInfo = async (req, res) => {
  try {
    const { user_id } = req.body;
    const { foto_image, firma_image, documento_pdf } = req.files; // Assuming files are sent using 'multipart/form-data'

    // Upload each file to AWS S3 and get URLs
    const fotoUrl = await awsServiceI.uploadImage(foto_image.path, 'foto_user');
    const firmaUrl = await awsServiceI.uploadImage(firma_image.path, 'firmas');
    const documentoUrl = await awsService.uploadPdf(documento_pdf.path, 'documents_user');

    // Create a new UserInfo record
    const newUserInfo = await UserInfo.create({
      user_id,
      foto_image: fotoUrl,
      firma_image: firmaUrl,
      documento_pdf: documentoUrl,
    });

    res.status(201).json(newUserInfo);
  } catch (error) {
    console.error(`Error creating UserInfo: ${error}`);
    res.status(500).json({ error: 'Error creating UserInfo' });
  }
};

// Other CRUD operations (e.g., update, delete, etc.) can be added similarly
