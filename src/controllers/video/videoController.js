// src/controllers/video/videoController.js
const videoService = require('../../services/videos/videoService');
const fs = require('fs');

exports.uploadVideo = async (req, res) => {
    try {
        const videoPath = req.file.path;
        const videoUrl = await videoService.uploadVideo(videoPath);

        // Elimina el archivo local después de subirlo a Cloudinary
        fs.unlinkSync(videoPath);

        res.json({ url: videoUrl });
    } catch (error) {
        console.error('Error uploading video:', error);
        res.status(400).json({ error: 'Error uploading video' });
    }
};
