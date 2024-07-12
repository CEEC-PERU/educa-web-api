const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // Limita el tamaño del archivo a 10 MB
});

module.exports = upload.array('materials', 10); // Cambiado de fields a array
