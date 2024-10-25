const mongoose = require('mongoose');

const administrateurSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'admin' }
});

const Administrateur = mongoose.model('Administrateur', administrateurSchema);
module.exports = Administrateur;
