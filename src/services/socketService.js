const { Server } = require('socket.io');
const jwt = require('jsonwebtoken');
const AppSession = require('../models/appSessionModel');
const { createAppSessionService } = require('./users/appSessionService');
const { updateUserSessionProgressByUserAndSession , getUserSessionProgressByUserAndSession , createUserSessionProgress} = require('./users/UserSessionProgress');
require('dotenv').config();

const activeUsers = new Map();

let start_time = ""
const SocketService = (server) => {
    const io = new Server(server, {
        cors: {
            origin: "http://localhost:3000",
            methods: ["GET", "POST" , "PUT"]
        }
    });
    io.on('connection', (socket) => {
        let user_id = 0
        socket.on('login', async (data) => {
            try {
                start_time = new Date().toISOString();
                console.log("start time socket", start_time)
                const decoded = jwt.decode(data.userToken, process.env.JWT_SECRET)
                user_id = decoded.id;
                console.log('1 user connected at ', start_time);
                if (user_id && !Array.from(activeUsers.values()).includes(user_id)) {
                    activeUsers.set(socket.id, user_id);
                    io.emit('active-users', Array.from(activeUsers.values()));
                    console.log(`${user_id} se autenticó`);
                }
            } catch (error) {
                console.error('Error en la autenticación', error);
                socket.disconnect(true)
            }
        });

       

        socket.on('session-progress', async (data) => {
            if (user_id !== 0) {
                const { session_id, progress , user_id , is_completed } = data;
                try {
                    const existingProgress = await getUserSessionProgressByUserAndSession(user_id, session_id);
                    console.log("session-progress antesdelif" ,{ session_id, progress, user_id , is_completed })
                    if (existingProgress) {
                        await updateUserSessionProgressByUserAndSession(user_id, session_id, { progress , is_completed });
                        console.log("session-progress" ,{ session_id, progress, user_id , is_completed })
                    } else {
                        await createUserSessionProgress({ user_id, session_id, progress , is_completed });
                    }
                } catch (error) {
                    console.error('Error managing session progress:', error);
                }
            }
        });

        socket.on('logout', async () => {
            if (user_id != 0) {
                const end_time = new Date().toISOString();
                console.log("end time" ,{ user_id, start_time, end_time })
                await createAppSessionService({ user_id, start_time, end_time })
            }
            activeUsers.delete(socket.id);
            io.emit('active-users', Array.from(activeUsers.values()));
        });
        socket.on('disconnect', async () => {
            if (user_id != 0) {
                const end_time = new Date().toISOString();
                await createAppSessionService({ user_id, start_time, end_time })
            }
            activeUsers.delete(socket.id);
            io.emit('active-users', Array.from(activeUsers.values()));
        });
    });
    return io;
}

module.exports = SocketService;
