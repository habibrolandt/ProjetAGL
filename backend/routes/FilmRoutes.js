const express = require('express');
const router = express.Router();
const FilmController = require('../controllers/FilmController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

router.post('/', authMiddleware, roleMiddleware(['respoInspection']), FilmController.ajouterFilm);
router.get('/', FilmController.obtenirTousLesFilms);
router.put('/:id', authMiddleware, roleMiddleware(['respoInspection']), FilmController.mettreAJourFilm);
router.delete('/:id', authMiddleware, roleMiddleware(['respoInspection']), FilmController.supprimerFilm);
router.get('/recherche', FilmController.rechercherFilms);

module.exports = router;