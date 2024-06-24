// src/controllers/sessionController.js
const sessionService = require('../../services/courses/sessionService');
const videoService = require('../../services/videos/videoService');
const fs = require('fs');


exports.uploadSessionVideo = async (req, res) => {
  try {
    const videoPath = req.file.path;
    const videoUrl = await videoService.uploadVideo(videoPath, 'Sesiones'); // Especificar carpeta 'Sesiones'
    
    // Elimina el archivo local después de subirlo a Cloudinary
    fs.unlinkSync(videoPath);
    
    res.json({ url: videoUrl });
  } catch (error) {
    console.error('Error uploading video:', error);
    res.status(400).json({ error: 'Error uploading video' });
  }
};

exports.createSession = async (req, res) => {
  try {
    let videoUrl = '';
    if (req.file) {
      videoUrl = await videoService.uploadVideo(req.file.path, 'Sesiones'); // Especificar carpeta 'Sesiones'
      fs.unlinkSync(req.file.path); // Elimina el archivo local después de subirlo
    }
    const newSession = await sessionService.createSession({ ...req.body, video_enlace: videoUrl });
    res.status(201).json(newSession);
  } catch (error) {
    console.error('Error creating session:', error);
    res.status(500).json({ error: 'Error creating session' });
  }
};

exports.getAllSessions = async (req, res) => {
  try {
    const sessions = await sessionService.getAllSessions();
    res.json(sessions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getSessionById = async (req, res) => {
  const id = req.params.id;
  try {
    const session = await sessionService.getSessionById(id);
    if (session) {
      res.json(session);
    } else {
      res.status(404).json({ error: 'Session not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createSession = async (req, res) => {
  try {
    const newSession = await sessionService.createSession(req.body);
    res.status(201).json(newSession);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateSession = async (req, res) => {
  const id = req.params.id;
  try {
    const updatedSession = await sessionService.updateSession(id, req.body);
    if (updatedSession) {
      res.json(updatedSession);
    } else {
      res.status(404).json({ error: 'Session not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteSession = async (req, res) => {
  const id = req.params.id;
  try {
    const deletedSession = await sessionService.deleteSession(id);
    if (deletedSession) {
      res.json({ message: 'Session deleted' });
    } else {
      res.status(404).json({ error: 'Session not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
