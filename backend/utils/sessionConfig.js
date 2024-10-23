const session = require('express-session');
const MongoStore = require('connect-mongo');

const sessionConfig = {
  secret: process.env.SESSION_SECRET || 'defaultSecretKey',  // Utilise une clé par défaut si non définie
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({ 
    mongoUrl: process.env.MONGODB_URI || 'mongodb://localhost:27017/ProjetAGL',  // URL par défaut si non définie
  }),
  cookie: {
    maxAge: 1000 * 60 * 60 * 24, // 1 jour
    secure: process.env.NODE_ENV === 'production', // Seulement sécurisé en production
    httpOnly: true,
  }
};

module.exports = sessionConfig;
