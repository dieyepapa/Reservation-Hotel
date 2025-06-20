// backend/server.js
/*const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const hotelRoutes = require('./routes/hotels');

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json()); // pour lire le JSON
app.use('/api/hotels', hotelRoutes); // route API
app.use('/images', express.static('public/images')); // expose les images

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ Connecté à MongoDB");
    app.listen(5000, () => {
      console.log("🚀 Serveur backend lancé sur http://localhost:5000");
    });
  })
  .catch((err) => console.error("❌ Erreur MongoDB :", err));

  */

  const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// ➕ Permet de servir les images du dossier 'uploads'
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Importer les routes
const hotelRoutes = require('./routes/hotels');
app.use('/api/hotels', hotelRoutes);

// Connexion MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ Connecté à MongoDB');
    app.listen(5000, () => console.log('🚀 Serveur backend lancé sur http://localhost:5000'));
  })
  .catch(err => console.error('❌ Erreur MongoDB :', err));