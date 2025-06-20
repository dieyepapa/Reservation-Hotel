const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();
const Hotel = require('../models/Hotel');

// Configuration multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

// Upload image
router.post('/upload', upload.single('image'), (req, res) => {
  if (!req.file) return res.status(400).json({ message: 'Fichier manquant' });
  const imageUrl = `http://localhost:5000/uploads/${req.file.filename}`;
  res.json({ imageUrl });
});

// Créer un hôtel
router.post('/', async (req, res) => {
  try {
    const hotel = new Hotel(req.body);
    await hotel.save();
    res.status(201).json({ message: 'Hôtel enregistré avec succès !' });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: 'Erreur enregistrement hôtel' });
  }
});

// Récupérer tous les hôtels
router.get('/', async (req, res) => {
  try {
    const hotels = await Hotel.find();
    res.json(hotels);
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la récupération' });
  }
});

module.exports = router;