require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const routes = require('./src/routes');

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/hackaton';

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Server running' });
});

app.use('/api', routes);

mongoose.connect(MONGO_URI).then(() => {
  console.log('MongoDB connected');
  app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
}).catch((err) => {
  console.error('MongoDB connection error:', err.message);
  process.exit(1);
});
