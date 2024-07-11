const { Server } = require('socket.io');
const jwt = require('jsonwebtoken');
const AppSession = require('../models/appSessionModel');
const { createAppSessionService } = require('./users/appSessionService');
const { updateUserSessionProgressByUserAndSession , getUserSessionProgressByUserAndSession , createUserSessionProgress} = require('./users/UserSessionProgress');
const { createUserModuleProgress , getUserModuleProgressByModuleAndUser , updateUserModuleProgressByModuleAndUser} = require('./users/UserModuleProgress');
require('dotenv').config();

const activeUsers = new Map();

let start_time = ""
const SocketService = (server) => {
    const io = new Server(server, {
      cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST", "PUT"]
      }
    });
  
    io.on('connection', (socket) => {
      let user_id = 0;
      socket.on('login', async (data) => {
        try {
          start_time = new Date().toISOString();
          console.log("start time socket", start_time);
          const decoded = jwt.decode(data.userToken, process.env.JWT_SECRET);
          user_id = decoded.id;
          console.log('1 user connected at ', start_time);
          if (user_id && !Array.from(activeUsers.values()).includes(user_id)) {
            activeUsers.set(socket.id, user_id);
            io.emit('active-users', Array.from(activeUsers.values()));
            console.log(`${user_id} se autenticó`);
          }
        } catch (error) {
          console.error('Error en la autenticación', error);
          socket.disconnect(true);
        }
      });
  
      socket.on('session', async (data) => {
        const { session_id, progress, is_completed, user_id } = data;
        console.log("session-progress recibido en el servidor:", { session_id, progress, user_id, is_completed });
        try {
          // Verificar si ya existe un progreso de sesión para el usuario y la sesión específica
          const existingProgress = await getUserSessionProgressByUserAndSession(user_id, session_id);
      
          if (existingProgress) {
            // Si existe, actualizar el progreso de sesión existente
            await updateUserSessionProgressByUserAndSession(user_id, session_id, { progress, is_completed });
            console.log("Progreso de sesión actualizado:", { session_id, progress, user_id, is_completed });
          } else {
            // Si no existe, crear un nuevo registro de progreso de sesión
            await createUserSessionProgress({ user_id, session_id, progress, is_completed });
            console.log("Nuevo progreso de sesión creado:", { session_id, progress, user_id, is_completed });
          }
        } catch (error) {
          console.error('Error al manejar el progreso de la sesión:', error);
        }
      });
      
       
      socket.on('module', async (data) => {
        const { module_id, progress, is_completed, user_id } = data;
        console.log("module-progress recibido en el servidor:", { module_id, progress, user_id, is_completed });
        try {
          // Verificar si ya existe un progreso de sesión para el usuario y la sesión específica
          const existingProgress = await getUserModuleProgressByModuleAndUser( module_id ,user_id);
      
          if (existingProgress) {
            // Si existe, actualizar el progreso de sesión existente
            await updateUserModuleProgressByModuleAndUser( module_id, user_id , { progress, is_completed });
            console.log("Progreso de modulo actualizado:", { module_id, progress, user_id, is_completed });
          } else {
            // Si no existe, crear un nuevo registro de progreso de sesión
            await createUserModuleProgress({ user_id, module_id, progress, is_completed });
            console.log("Nuevo progreso de modulo creado:", { module_id, progress, user_id, is_completed });
          }
        } catch (error) {
          console.error('Error al manejar el progreso de la sesión:', error);
        }
      });

  
      socket.on('logout', async () => {
        if (user_id != 0) {
          const end_time = new Date().toISOString();
          console.log("end time", { user_id, start_time, end_time });
          await createAppSessionService({ user_id, start_time, end_time });
        }
        activeUsers.delete(socket.id);
        io.emit('active-users', Array.from(activeUsers.values()));
      });
  
      socket.on('disconnect', async () => {
        if (user_id != 0) {
          const end_time = new Date().toISOString();
          await createAppSessionService({ user_id, start_time, end_time });
        }
        activeUsers.delete(socket.id);
        io.emit('active-users', Array.from(activeUsers.values()));
      });
    });
  
    return io;
  }
  

module.exports = SocketService;
