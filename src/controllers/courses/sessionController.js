// src/controllers/sessionController.js
const sessionService = require('../../services/courses/sessionService');

exports.createSession = async (req, res) => {
  try {
    const newSession = await sessionService.createSession(req.body);
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
    console.error('Error deleting session:', error);
    res.status(500).json({ error: 'Error deleting session' });
  }
};
