const Utilisateur = require('../models/Utilisateurs');
const Administrateur = require('../models/Administrateurs');

exports.connexion = async (req, res) => {
  try {
    const { email, password } = req.body;

    let user = await Utilisateur.findOne({ email });
    let isAdmin = false;

    if (!user) {
      user = await Administrateur.findOne({ email });
      isAdmin = true;
    }

    if (!user || (isAdmin ? user.password !== password : !(await user.comparePassword(password)))) {
      return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
    }

    req.session.userId = user._id;
    req.session.userRole = isAdmin ? 'admin' : user.role;

    res.json({
      message: 'Connexion réussie',
      user: {
        id: user._id,
        name: user.name || 'Admin', // Ajoutez un nom par défaut pour l'admin si nécessaire
        email: user.email,
        role: isAdmin ? 'admin' : user.role
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};