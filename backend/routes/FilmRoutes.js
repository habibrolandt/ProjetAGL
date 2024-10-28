const express = require('express');
const router = express.Router();
const FilmController = require('../controllers/FilmController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

// Ajouter un film, accès restreint
router.post('/', authMiddleware, roleMiddleware(['respoInspection']), FilmController.ajouterFilm);

// Obtenir tous les films, accessible sans authentification
router.get('/', FilmController.obtenirTousLesFilms);

// Mettre à jour un film, accès restreint
router.put('/:id', authMiddleware, roleMiddleware(['respoInspection']), FilmController.mettreAJourFilm);

// Supprimer un film, accès restreint
router.delete('/:id', authMiddleware, roleMiddleware(['respoInspection']), FilmController.supprimerFilm);

// Rechercher des films, accessible sans authentification
router.get('/recherche', FilmController.rechercherFilms);

module.exports = router;
