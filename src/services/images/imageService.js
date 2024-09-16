const s3 = require('../../config/aws');
const {  PutObjectCommand } = require('@aws-sdk/client-s3');
const fs = require('fs');
const path = require('path');



exports.uploadImage = async (filePath, folder) => {
  try {
    console.log(`Verificando existencia del archivo antes de la subida: ${filePath}`);

    const fileStream = fs.createReadStream(filePath);  // Lee el archivo
    const fileName = path.basename(filePath);  // Extrae el nombre del archivo

    // Configura los parámetros para la subida a S3
    const uploadParams = {
      Bucket: process.env.AWS_BUCKET_NAME,  // Nombre del bucket S3
      Key: `${folder}/${fileName}`,  // Ruta y nombre del archivo en el bucket
      Body: fileStream,  // El archivo a subir
      ContentType: 'image/jpeg',  // Ajusta el tipo de contenido según el archivo (puede ser 'image/png' o 'image/jpeg', etc.)
    };

    // Ejecuta la subida
    const result = await s3.send(new PutObjectCommand(uploadParams));

    // Genera la URL pública del archivo en S3
    const fileUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${folder}/${fileName}`;

    console.log(`Subida a S3 completa. Archivo subido a: ${fileUrl}`);

    return fileUrl;  // Devuelve la URL pública del archivo
  } catch (error) {
    console.error('Error uploading image to S3:', error);
    throw new Error('Error uploading image');
  }
};

