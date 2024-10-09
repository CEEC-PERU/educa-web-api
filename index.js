const express = require('express');
const http = require('http');
const cors = require('cors');
const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 4100;
const jwt = require('jsonwebtoken');
const { authenticateDatabase } = require('./src/config/migration');
const morgan = require('morgan');
const bcrypt = require('bcrypt');
authenticateDatabase();
const SocketService = require('./src/services/socketService');
require('./src/models/relations');
require('dotenv').config();
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Expose-Headers", "X-FileName");
  next();
});

const cron = require('node-cron');
const { actualizarProgresoTodos } = require('./src/controllers/student/studentController');

// Configurar cron jobs para actualizar el progreso a las 10:20 AM y a la medianoche en Perú (zona horaria America/Lima)

// Cron job para 10:20 AM
cron.schedule('33 12 * * *', () => {
    actualizarProgresoTodos().then(() => {
        console.log('Actualización de progreso completada a las 10:24 AM (Perú).');
    }).catch((error) => {
        console.error('Error al actualizar el progreso de los usuarios:', error);
    });
}, {
    timezone: "America/Lima"
});

// Cron job para la medianoche
cron.schedule('0 0 * * *', () => {
    actualizarProgresoTodos().then(() => {
        console.log('Actualización de progreso completada a medianoche (Perú).');
    }).catch((error) => {
        console.error('Error al actualizar el progreso de los usuarios:', error);
    });
}, {
    timezone: "America/Lima"
});


// Crear evaluaciones
app.use('/api/auth', require('./src/routes/auth/auth-route'));
app.use('/api/courses', require('./src/routes/courses/courseRoutes'));
app.use('/api/appsession', require('./src/routes/users/appSessionRoutes'));
app.use('/api/users', require('./src/routes/users/userRoutes'));
app.use('/api/enterprises', require('./src/routes/enterprise/enterprisesRoutes'));
app.use('/api/auth', require('./src/routes/auth/auth-route'));
app.use('/api/profiles', require('./src/routes/users/profileRoutes'));
app.use('/api/categories', require('./src/routes/courses/categoryRoutes'));
app.use('/api/professors', require('./src/routes/courses/professorRoutes'));
app.use('/api/modules', require('./src/routes/courses/moduleRoutes'));
app.use('/api/sessions', require('./src/routes/courses/sessionRoutes'));
app.use('/api/evaluations', require('./src/routes/courses/evaluationRoutes'));
app.use('/api/videos', require('./src/routes/videos/videoRoutes'));
app.use('/api/questions', require('./src/routes/courses/questionRoutes'));
app.use('/api/options', require('./src/routes/courses/optionRoutes'));
app.use('/api/images', require('./src/routes/images/imageRoutes'));
app.use('/api/courseresults', require('./src/routes/courses/courseResultRoutes'));
app.use('/api/moduleresults', require('./src/routes/courses/moduleResultRoutes'));
app.use('/api/userModuleProgress', require('./src/routes/users/UserModuleProgress'));
app.use('/api/userSessionProgress', require('./src/routes/users/UserSessionProgress'));
app.use('/api/superadmin', require('./src/routes/superadmin/userRoutes'));
app.use('/api/requirements', require('./src/routes/superadmin/requirementRoutes'));
app.use('/api/metricascorporate', require('./src/routes/courses/metricasRoutes'));
app.use('/api/notas', require('./src/routes/courses/NotasRoutes'));
app.use('/api/classrooms', require('./src/routes/enterprise/classroomRoute'));
app.use('/api/shifts', require('./src/routes/enterprise/shiftRoute'));
app.use('/api/userinfo', require('./src/routes/users/UserInfoRoutes'));
app.use('/api/cuestionarioresults', require('./src/routes/courses/resultCuestionario'));
SocketService(server);

app.use('/api/coursestudents', require('./src/routes/courses/courseStudentRoutes'));

server.listen(PORT, () => {
  console.log(`Server is running 🚀`);
});

console.log('EMAIL_USER:', process.env.EMAIL_USER);
console.log('EMAIL_PASSWORD:', process.env.EMAIL_PASSWORD);
