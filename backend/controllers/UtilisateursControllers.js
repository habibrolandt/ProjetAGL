const Utilisateur = require('../models/Utilisateurs');
const Administrateur = require('../models/Administrateurs');
const RespoInspection = require('../models/respo_Inspection');
const RespoProduction = require('../models/respo_Production');
const bcrypt = require('bcryptjs');

exports.inscription = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Tous les champs sont requis' });
    }

    const utilisateurExiste = await Utilisateur.findOne({ email });
    if (utilisateurExiste) {
      return res.status(400).json({ message: 'Cet email est déjà utilisé' });
    }

    const utilisateur = new Utilisateur({ name, email, password, role: 'utilisateur' });
    await utilisateur.save();

    res.status(201).json({ message: 'Inscription réussie' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.connexion = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Tous les champs sont requis' });
    }

    // Vérifier d'abord si c'est un administrateur
    const admin = await Administrateur.findOne({ email });
    console.log('Admin trouvé:', admin);

    if (admin) {
      console.log('Comparaison des mots de passe admin:', password, admin.password);
      if (admin.password === password) {
        console.log('Connexion admin réussie');
        req.session.userId = admin._id;
        req.session.userRole = 'admin';
        return res.json({
          message: 'Connexion réussie',
          user: {
            id: admin._id,
            email: admin.email,
            role: 'admin',
            name: 'Administrateur'
          }
        });
      } else {
        console.log('Mot de passe admin incorrect');
        return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
      }
    }

    // Vérification de l'utilisateur normal
    const utilisateur = await Utilisateur.findOne({ email });
    console.log('Utilisateur trouvé:', utilisateur);

    if (!utilisateur) {
      console.log('Aucun utilisateur trouvé avec cet email');
      return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
    }

    if (utilisateur.password !== password) {
      console.log('Mot de passe utilisateur incorrect');
      return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
    }

    console.log('Connexion utilisateur réussie');
    req.session.userId = utilisateur._id;
    req.session.userRole = utilisateur.role;

    res.json({
      message: 'Connexion réussie',
      user: {
        id: utilisateur._id,
        name: utilisateur.name,
        email: utilisateur.email,
        role: utilisateur.role
      }
    });
  } catch (error) {
    console.error('Erreur de connexion:', error);
    res.status(500).json({ message: 'Erreur interne du serveur' });
  }
};

exports.deconnexion = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: 'Erreur lors de la déconnexion' });
    }
    res.json({ message: 'Déconnexion réussie' });
  });
};

exports.creerAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Tous les champs sont requis' });
    }

    const adminExiste = await Administrateur.findOne({ email });
    if (adminExiste) {
      return res.status(400).json({ message: 'Cet email est déjà utilisé' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = new Administrateur({ email, password: hashedPassword });
    await admin.save();

    res.status(201).json({ message: 'Administrateur créé avec succès' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getUtilisateur = async (req, res) => {
  try {
    const utilisateur = await Utilisateur.findById(req.session.userId).select('-password');
    if (!utilisateur) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }
    res.json(utilisateur);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateUtilisateur = async (req, res) => {
  try {
    const { name, email } = req.body;
    const utilisateur = await Utilisateur.findByIdAndUpdate(
      req.session.userId,
      { name, email },
      { new: true, runValidators: true }
    ).select('-password');

    if (!utilisateur) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    res.json(utilisateur);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteUtilisateur = async (req, res) => {
  try {
    const utilisateur = await Utilisateur.findByIdAndDelete(req.session.userId);
    if (!utilisateur) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }
    req.session.destroy();
    res.json({ message: 'Utilisateur supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await Utilisateur.find().select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const newUser = new Utilisateur({ name, email, password });
    await newUser.save();
    res.status(201).json({ message: 'Utilisateur créé avec succès' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { name, email } = req.body;
    const user = await Utilisateur.findByIdAndUpdate(
      req.params.id,
      { name, email },
      { new: true, runValidators: true }
    ).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await Utilisateur.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }
    res.json({ message: 'Utilisateur supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.changeRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    const user = await Utilisateur.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    user.role = role;
    await user.save();

    // Déplacer l'utilisateur vers la collection appropriée en fonction du nouveau rôle
    if (role === 'respoInspection') {
      await RespoInspection.create({ ...user.toObject(), _id: user._id });
      await Utilisateur.findByIdAndDelete(id);
    } else if (role === 'respoProduction') {
      await RespoProduction.create({ ...user.toObject(), _id: user._id });
      await Utilisateur.findByIdAndDelete(id);
    }

    res.json({ message: 'Rôle mis à jour avec succès' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Autres méthodes du contrôleur...