const express = require('express');
const router = express.Router();
const Planning = require('../models/planning');

// GET /api/stats
router.get('/', async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const totalPlannings = await Planning.countDocuments();
    const planningsAujourdhui = await Planning.countDocuments({
      date: { $gte: today, $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000) }
    });

    // Cette partie est hypothétique et devrait être adaptée à votre modèle de données réel
    const spectateursAujourdhui = 100; // Remplacez par une vraie requête si vous avez ces données

    const filmLePlusPopulaire = await Planning.aggregate([
      { $group: { _id: "$film", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 1 }
    ]);

    res.json({
      totalPlannings,
      planningsAujourdhui,
      spectateursAujourdhui,
      filmLePlusPopulaire: filmLePlusPopulaire[0] ? filmLePlusPopulaire[0]._id : 'Aucun'
    });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération des statistiques" });
  }
});

module.exports = router;