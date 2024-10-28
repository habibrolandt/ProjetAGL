const express = require('express');
const router = express.Router();

// Route de test
router.get('/', (req, res) => {
    res.json({ message: 'Inspection route works!' });
});

// Route pour récupérer la liste des inspections
router.get('/list', (req, res) => {
    // Logique pour récupérer la liste des inspections (exemple)
    res.json([{ id: 1, name: "Inspection 1" }, { id: 2, name: "Inspection 2" }]);
});

module.exports = router;
