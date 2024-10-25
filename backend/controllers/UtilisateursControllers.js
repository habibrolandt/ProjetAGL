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

    const hashedPassword = await bcrypt.hash(password, 10);
    const utilisateur = new Utilisateur({ name, email, password: hashedPassword });
    await utilisateur.save();

    res.status(201).json({ message: 'Inscription réussie' });
  } catch (error) {
    console.error('Erreur lors de l\'inscription:', error);
    res.status(500).json({ message: 'Erreur lors de l\'inscription' });
  }
};

exports.connexion = async (req, res) => {
  try {
    const { email, password } = req.body;

    let user = await Utilisateur.findOne({ email });
    let isAdmin = false;

    if (!user) {
      user = await Administrateur.findOne({ email });
      isAdmin = true;
    }

    if (!user) {
      return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
    }

    req.session.userId = user._id;
    req.session.userRole = isAdmin ? 'admin' : user.role;

    res.json({
      message: 'Connexion réussie',
      user: {
        id: user._id,
        name: user.name || 'Admin',
        email: user.email,
        role: isAdmin ? 'admin' : user.role
      }
    });
  } catch (error) {
    console.error('Erreur lors de la connexion:', error);
    res.status(500).json({ message: 'Erreur lors de la connexion' });
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

exports.getAllUsers = async (req, res) => {
  try {
    const utilisateurs = await Utilisateur.find().select('-password');
    res.json(utilisateurs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new Utilisateur({ name, email, password: hashedPassword });
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