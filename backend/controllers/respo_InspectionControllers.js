const Inspection = require('../models/respo_Inspection');

exports.getAllInspections = async (req, res) => {
  try {
    const inspections = await Inspection.find({ createdBy: req.session.userId });
    res.json(inspections);
  } catch (error) {
    console.error('Erreur lors de la récupération des inspections:', error);
    res.status(500).json({ message: 'Erreur lors de la récupération des inspections' });
  }
};

exports.createInspection = async (req, res) => {
  try {
    const { titre, description } = req.body;
    const newInspection = new Inspection({
      titre,
      description,
      createdBy: req.session.userId
    });
    await newInspection.save();
    res.status(201).json(newInspection);
  } catch (error) {
    console.error('Erreur lors de la création de l\'inspection:', error);
    res.status(500).json({ message: 'Erreur lors de la création de l\'inspection' });
  }
};

// Ajoutez d'autres méthodes selon vos besoins