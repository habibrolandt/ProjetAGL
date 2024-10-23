const Film = require('../models/Film');

exports.ajouterFilm = async (req, res) => {
  try {
    const { titre, description, realisateur, producteur, image } = req.body;
    const nouveauFilm = new Film({
      titre,
      description,
      realisateur,
      producteur,
      image,
      creePar: req.session.userId
    });
    await nouveauFilm.save();
    res.status(201).json({ message: 'Film ajouté avec succès', film: nouveauFilm });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.obtenirTousLesFilms = async (req, res) => {
  try {
    const films = await Film.find().sort({ dateCreation: -1 });
    res.json(films);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.mettreAJourFilm = async (req, res) => {
  try {
    const { id } = req.params;
    const { titre, description, realisateur, producteur, image } = req.body;
    const filmMisAJour = await Film.findByIdAndUpdate(id, 
      { titre, description, realisateur, producteur, image },
      { new: true, runValidators: true }
    );
    if (!filmMisAJour) {
      return res.status(404).json({ message: 'Film non trouvé' });
    }
    res.json({ message: 'Film mis à jour avec succès', film: filmMisAJour });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.supprimerFilm = async (req, res) => {
  try {
    const { id } = req.params;
    const filmSupprime = await Film.findByIdAndDelete(id);
    if (!filmSupprime) {
      return res.status(404).json({ message: 'Film non trouvé' });
    }
    res.json({ message: 'Film supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.rechercherFilms = async (req, res) => {
  try {
    const { query } = req.query;
    const films = await Film.find({
      $or: [
        { titre: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } },
        { realisateur: { $regex: query, $options: 'i' } },
        { producteur: { $regex: query, $options: 'i' } }
      ]
    });
    res.json(films);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};