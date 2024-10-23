const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const forumRoutes = require('./server/routes/forums');
const cors = require('cors');
const path = require('path');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  dbName: 'soonlaunchpad'
})
.then(() => console.log('\x1b[32m%s\x1b[0m', 'Connected to MongoDB (soonlaunchpad)'))
.catch((err: Error) => console.error('\x1b[31m%s\x1b[0m', 'Error connecting to MongoDB:', err));

// Routes
app.use('/api/forums', forumRoutes);





app.listen(PORT, () => {
  console.log('\x1b[36m%s\x1b[0m', `Servidor backend corriendo en el puerto ${PORT}`);
  console.log('\x1b[32m%s\x1b[0m', '¡Backend iniciado correctamente!');
  console.log('\x1b[33m%s\x1b[0m', `API disponible en http://localhost:${PORT}/api/forums`);
});
