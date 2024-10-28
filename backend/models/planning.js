const mongoose = require('mongoose');

const planningSchema = new mongoose.Schema({
  film: {
    type: String,
    required: true
  },
  salle: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  heure: {
    type: String,
    required: true
  }
});

// Vérifiez si le modèle existe déjà pour éviter de le redéfinir
const Planning = mongoose.models.Planning || mongoose.model('Planning', planningSchema);

module.exports = Planning;
