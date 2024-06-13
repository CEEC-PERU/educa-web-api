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
app.use('/api/evaluations', require('./src/routes/courses/evaluationRoutes'));
app.use('/api/questions', require('./src/routes/courses/questionRoutes'));
app.use('/api/options', require('./src/routes/courses/optionRoutes'));

server.listen(PORT, () => {
  console.log(`Server is running 🚀`);
});
