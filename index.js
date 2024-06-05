const express = require('express');
const http = require('http');
const cors = require('cors');
const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 4100;
const jwt = require('jsonwebtoken')
const { authenticateDatabase } = require('./src/config/migration');
const morgan = require('morgan');
const bcrypt = require('bcrypt');
authenticateDatabase();

require('dotenv').config();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Expose-Headers", "X-FileName"); // Agrega esta línea
  next();
});

//crear evaluaciones
app.use('/api/users', require('./src/routes/users/userRoutes'))
app.use('/api/enterprises', require('./src/routes/enterprise/enterprisesRoutes'));
app.use('/api/auth', require('./src/routes/auth/auth-route'));

server.listen(PORT, () => {
  console.log(`Server is running 🚀`);
});
