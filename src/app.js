const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const xss = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize');
const createAdminIfNeeded = require('./utils/createAdmin');

const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const adminRoutes = require('./routes/adminRoutes');
const { errorHandler } = require('./middlewares/errorHandler');

const app = express();

// Global middlewares
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(mongoSanitize());
app.use(xss());
app.use(morgan('dev'));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/admin', adminRoutes);

// Health check
app.get('/api/ping', (req, res) => res.json({ ok: true, time: new Date().toISOString() }));

// Create initial admin if env set
createAdminIfNeeded().catch(err => console.error('Admin creation error:', err));

app.use(errorHandler);

module.exports = app;
