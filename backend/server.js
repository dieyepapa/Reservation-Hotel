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

/*const express = require('express');
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

  */

  const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// ✅ Connexion à MongoDB sans SRV
mongoose.connect(
  "mongodb://admin:admin123456@ac-qxardou-shard-00-00.pv5vc2v.mongodb.net:27017,ac-qxardou-shard-00-01.pv5vc2v.mongodb.net:27017,ac-qxardou-shard-00-02.pv5vc2v.mongodb.net:27017/hotel-reservation?ssl=true&replicaSet=atlas-natmq4-shard-0&authSource=admin&retryWrites=true&w=majority"
).then(() => {
  console.log("✅ Connexion MongoDB réussie !");
}).catch(err => {
  console.error("❌ Erreur MongoDB :", err);
});

// Routes
const hotelRoutes = require('./routes/hotels');
app.use('/api/hotels', hotelRoutes);

// Dossier pour les fichiers uploadés
app.use('/uploads', express.static('uploads'));

// Démarrage du serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Serveur lancé sur http://localhost:${PORT}`);
});