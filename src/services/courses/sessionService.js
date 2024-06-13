const Session = require('../../models/sessionModel');

exports.getAllSessions = async () => {
  try {
    return await Session.findAll();
  } catch (error) {
    console.error('Error fetching sessions:', error);
    throw new Error('Error fetching sessions');
  }
};

exports.getSessionById = async (sessionId) => {
  try {
    return await Session.findByPk(sessionId);
  } catch (error) {
    console.error('Error fetching session by ID:', error);
    throw new Error('Error fetching session by ID');
  }
};

exports.createSession = async (sessionData) => {
  try {
    return await Session.create(sessionData);
  } catch (error) {
    console.error('Error creating session:', error);
    throw new Error('Error creating session');
  }
};

exports.updateSession = async (sessionId, sessionData) => {
  try {
    const session = await Session.findByPk(sessionId);
    if (session) {
      await session.update(sessionData);
      return session;
    }
    return null;
  } catch (error) {
    console.error('Error updating session:', error);
    throw new Error('Error updating session');
  }
};

exports.deleteSession = async (sessionId) => {
  try {
    const session = await Session.findByPk(sessionId);
    if (session) {
      await session.destroy();
      return session;
    }
    return null;
  } catch (error) {
    console.error('Error deleting session:', error);
    throw new Error('Error deleting session');
  }
};
