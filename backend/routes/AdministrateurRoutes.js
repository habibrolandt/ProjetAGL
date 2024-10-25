const express = require('express');
const router = express.Router();

// Ajoutez des routes ici si nécessaire, par exemple :
router.get('/', (req, res) => {
    res.send('Administrateur route works!');
});

module.exports = router;