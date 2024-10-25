const express = require('express');
const router = express.Router();
const UtilisateursController = require('../controllers/UtilisateursControllers');

router.post('/inscription', UtilisateursController.inscription);
router.post('/connexion', UtilisateursController.connexion);
router.post('/deconnexion', UtilisateursController.deconnexion);

router.get('/', UtilisateursController.getAllUsers);
router.post('/', UtilisateursController.createUser);
router.put('/:id', UtilisateursController.updateUser);
router.delete('/:id', UtilisateursController.deleteUser);
router.put('/:id/role', UtilisateursController.changeRole);

module.exports = router;