require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const sequelize = require('./config/sequelize');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Routes

app.use('/api/auth', require('./routes/auth'));
app.use('/api/vessels', require('./routes/vessels'));
app.use('/api/pfz', require('./routes/pfz'));
app.use('/api/alerts', require('./routes/alerts'));
app.use('/api/species', require('./routes/species'));
app.use('/api/upload', require('./routes/upload'));
app.use('/api/reports', require('./routes/reports'));
app.use('/api/ml', require('./routes/mlRoutes'));

// Error handler
app.use(require('./middleware/errorHandler'));

// Start with PostgreSQL
async function start() {
  try {
    await sequelize.authenticate();
    console.log('PostgreSQL connection established.');
    // NOTE: Do not use force:true here to avoid dropping data; migrations would be better.
    await sequelize.sync();
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (err) {
    console.error('Unable to connect to PostgreSQL:', err.message);
    process.exit(1);
  }
}

start();
