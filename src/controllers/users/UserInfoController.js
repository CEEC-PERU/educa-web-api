const UserInfo = require('../../models/UserInfo');
const awsService = require('../../services/archivos/archivoService');
const awsServiceI = require('../../services/images/imageService');
const path = require('path');

const createUserInfo = async (req, res) => {
  try {
    console.log('Request Body:', req.body); 
    const { user_id } = req.body;
    const { foto_image, firma_image, documento_pdf } = req.files; // Archivos subidos usando multer

    // Verificar que los archivos existan
    if (!foto_image || !firma_image || !documento_pdf) {
      return res.status(400).json({ error: 'Todos los archivos son requeridos' });
    }

    // Acceder a los archivos subidos
    const fotoPath = foto_image[0].path;
    const firmaPath = firma_image[0].path;
    const documentoPath = documento_pdf[0].path;

    // Subir los archivos a S3 y obtener las URLs
    const fotoUrl = await awsServiceI.uploadImage(fotoPath, 'foto_user');
    const firmaUrl = await awsServiceI.uploadImage(firmaPath, 'firmas');
    const documentoUrl = await awsService.uploadPdf(documentoPath, 'documents_user');

    // Crear un nuevo registro de UserInfo en la base de datos
    const newUserInfo = await UserInfo.create({
      user_id,
      foto_image: fotoUrl,
      firma_image: firmaUrl,
      documento_pdf: documentoUrl,
    });

    res.status(201).json(newUserInfo);
  } catch (error) {
    console.error(`Error creando UserInfo: ${error}`);
    res.status(500).json({ error: 'Error creando UserInfo' });
  }
};

const shouldShowModal = async (req, res) => {
  try {
      const userId = req.user.id; // Asumiendo que obtienes el user_id del token o sesión
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Establece la hora a medianoche para comparar solo la fecha

      // Busca si el usuario ya tiene un registro con la fecha de hoy
      const userInfo = await UserInfo.findOne({
          where: {
              user_id: userId,
              created_at: {
                  [Op.gte]: today // Verifica si created_at es igual o mayor a la medianoche de hoy
              }
          }
      });
      if (userInfo) {
          // Si ya hay un registro de hoy, no mostrar modal
          return res.status(200).json({ showModal: false });
      } else {
          // Si no hay registro de hoy, mostrar modal
          return res.status(200).json({ showModal: true });
      }
  } catch (error) {
      console.error("Error checking modal status:", error);
      return res.status(500).json({ error: 'Error en el servidor' });
  }
};

module.exports = {
  createUserInfo,
  shouldShowModal,
};