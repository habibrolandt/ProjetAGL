const mongoose = require('mongoose');

const filmSchema = new mongoose.Schema({
  titre: { type: String, required: true },
  description: { type: String, required: true },
  realisateur: { type: String, required: true },
  producteur: { type: String, required: true },
  image: { type: String, required: true },
  creePar: { type: mongoose.Schema.Types.ObjectId, ref: 'Utilisateur', required: true },
  dateCreation: { type: Date, default: Date.now }
});

const Film = mongoose.model('Film', filmSchema);
module.exports = Film;