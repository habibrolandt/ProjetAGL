const express = require('express');
const router = express.Router();

// Ajoutez des routes ici si nécessaire
router.get('/', (req, res) => {
    res.send('Inspection route works!');
});

module.exports = router;