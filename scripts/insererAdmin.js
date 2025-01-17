const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../backend/.env') });
const mongoose = require('mongoose');

// Définition du schéma Administrateur directement dans ce fichier
const administrateurSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'admin' }
});

const Administrateur = mongoose.model('Administrateur', administrateurSchema);

console.log('URI MongoDB:', process.env.MONGODB_URI);

async function connectToDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
      serverSelectionTimeoutMS: 60000,
      socketTimeoutMS: 60000,
    });
    console.log('Connecté à MongoDB');
    return true;
  } catch (error) {
    console.error('Erreur de connexion à MongoDB:', error);
    return false;
  }
}

async function insererAdmin() {
  try {
    console.log('Tentative d\'insertion de l\'administrateur...');
    const admin = new Administrateur({
      email: 'tchor1@gmail.com',
      password: '1234',
      role: 'admin'
    });

    await admin.save();
    console.log('Administrateur inséré avec succès');
  } catch (error) {
    console.error('Erreur lors de l\'insertion de l\'administrateur:', error);
  }
}

async function main() {
  const isConnected = await connectToDatabase();
  if (isConnected) {
    await insererAdmin();
  }
  await mongoose.disconnect();
  console.log('Déconnecté de MongoDB');
}

main().catch(console.error);