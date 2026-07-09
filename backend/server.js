require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const app = express();

// Security Middlewares
app.use(helmet());

const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:5174',
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// Rate Limiting (Protección contra Spam/DDoS)
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // Limita a 100 peticiones por ventana por IP
  message: 'Demasiadas peticiones desde esta IP, por favor intenta más tarde.'
});
app.use('/api/', globalLimiter);

// Parse JSON payload con límite de 50mb
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Routes
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/config', require('./routes/config.routes'));
app.use('/api/projects', require('./routes/project.routes'));
app.use('/api/messages', require('./routes/message.routes'));

// Connect DB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/1892studio');
    console.log('MongoDB Connected...');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};
connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
