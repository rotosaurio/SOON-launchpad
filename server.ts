const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const presaleRoutes = require('./server/routes/presales');
const cors = require('cors');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

// Conectar a MongoDB
mongoose.connect(process.env.MONGODB_URI as string, {
  dbName: 'soonlaunchpad'
})
.then(() => console.log('\x1b[32m%s\x1b[0m', 'Conectado a MongoDB (soonlaunchpad)'))
.catch((err: Error) => console.error('\x1b[31m%s\x1b[0m', 'Error conectando a MongoDB:', err));

// Rutas
app.use('/api/presales', presaleRoutes);

app.listen(PORT, () => {
  console.log('\x1b[36m%s\x1b[0m', `Servidor backend corriendo en el puerto ${PORT}`);
  console.log('\x1b[32m%s\x1b[0m', '¡Backend iniciado correctamente!');
  console.log('\x1b[33m%s\x1b[0m', `API disponible en http://localhost:${PORT}/api/presales`);
});
