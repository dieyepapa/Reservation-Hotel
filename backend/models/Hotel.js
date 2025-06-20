const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema({
  nom: String,
  description: String,
  prix: Number,
  image: String,
  disponibilite: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model('Hotel', hotelSchema);