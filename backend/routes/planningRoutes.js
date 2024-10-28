const express = require('express');
const router = express.Router();
const Planning = require('../models/planning');

// GET /api/plannings
router.get('/', async (req, res) => {
  try {
    const plannings = await Planning.find();
    res.json(plannings);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération des plannings" });
  }
});

// POST /api/plannings
router.post('/', async (req, res) => {
  try {
    const newPlanning = new Planning(req.body);
    const savedPlanning = await newPlanning.save();
    res.status(201).json(savedPlanning);
  } catch (error) {
    console.error('Erreur lors de la création du planning:', error); // Log de l'erreur
    res.status(400).json({ message: "Erreur lors de la création du planning", error: error.message });
  }
});

// PUT /api/plannings/:id
router.put('/:id', async (req, res) => {
  // Validation des données reçues
  const { film, salle, date, heure } = req.body;
  if (!film || !salle || !date || !heure) {
    return res.status(400).json({ message: "Tous les champs (film, salle, date, heure) sont requis" });
  }

  try {
    const updatedPlanning = await Planning.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedPlanning) {
      return res.status(404).json({ message: "Planning non trouvé" });
    }
    res.json(updatedPlanning);
  } catch (error) {
    console.error('Erreur lors de la mise à jour du planning:', error); // Log de l'erreur
    res.status(400).json({ message: "Erreur lors de la mise à jour du planning", error: error.message });
  }
});

// DELETE /api/plannings/:id
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const planning = await Planning.findByIdAndDelete(id);

    if (!planning) {
      return res.status(404).json({ message: "Planning non trouvé" });
    }

    res.status(200).json({ message: "Planning supprimé avec succès" });
  } catch (error) {
    console.error('Erreur lors de la suppression du planning:', error);
    res.status(500).json({ message: "Erreur lors de la suppression du planning" });
  }
});

module.exports = router;
