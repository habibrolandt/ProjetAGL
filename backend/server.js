require('dotenv').config();
const express = require('express');
const session = require('express-session');
const cors = require('cors');
const connectDB = require('./config/database');
const sessionConfig = require('./utils/sessionConfig');
const errorHandler = require('./middleware/errorHandler');

const UtilisateursRoutes = require('./routes/UtilisateursRoutes');
const messageRoutes = require('./routes/MessageFooterRoutes');
const InspRoutes = require('./routes/respo_InspectionRoutes');
const ProdRoutes = require('./routes/respo_ProductionRoutes');
const AdminRoutes = require('./routes/AdministrateurRoutes');
const FilmRoutes = require('./routes/FilmRoutes'); // Nouvelle route pour les films

const app = express();

// Connexion à la base de données
connectDB();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());
app.use(session(sessionConfig));

// Routes
app.use('/api/users', UtilisateursRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/respos', InspRoutes);
app.use('/api/Prod', ProdRoutes);
app.use('/api/admin', AdminRoutes);
app.use('/api/films', FilmRoutes); // Nouvelle route pour les films

// Gestion des erreurs
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Serveur en cours d'exécution sur le port ${PORT}`));