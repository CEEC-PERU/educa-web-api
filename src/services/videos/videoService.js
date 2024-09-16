const fs = require('fs');
const { PutObjectCommand } = require('@aws-sdk/client-s3');
const s3 = require('../../config/aws');
const path = require('path');


exports.uploadVideo = async (filePath, folder) => {
 
  try {

    const fileStream = fs.createReadStream(filePath);
    const fileName = path.basename(filePath);
  
    const uploadParams = {
      Bucket: process.env.AWS_BUCKET_NAME, // Nombre del bucket
      Key: `${folder}/${fileName}`, // Nombre del archivo en el bucket
      Body: fileStream,
      ContentType: 'video/mp4'
    };
  
    const data = await s3.send(new PutObjectCommand(uploadParams));
    console.log(`Archivo subido con éxito a S3: ${data}`);
    fs.unlinkSync(filePath); // Elimina el archivo local después de la subida
    const fileUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${folder}/${fileName}`;

    console.log(`Subida a S3 completa. Archivo subido a: ${fileUrl}`);
    
    return fileUrl;  // Devuelve la URL pública del archivo
  } catch (err) {
    console.error('Error subiendo archivo a S3:', err);
    throw new Error('Error subiendo archivo');
  }
};