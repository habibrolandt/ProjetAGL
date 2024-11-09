import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, UserPlus, Edit, Trash2, LogOut, BarChart2, Film, Users, Calendar } from 'lucide-react';
import axios from 'axios';
import admin from '../../src/assets/Ressources/admin.jpg';

export default function DashboardAdmin({ utilisateur, onDeconnexion }) {
  const navigate = useNavigate();
  const [utilisateurs, setUtilisateurs] = useState([]);
  const [afficherFormulaireAjoutUtilisateur, setAfficherFormulaireAjoutUtilisateur] = useState(false);
  const [nouvelUtilisateur, setNouvelUtilisateur] = useState({ nom: '', email: '', motDePasse: '' });
  const [utilisateurEnEdition, setUtilisateurEnEdition] = useState(null);
  const [menuActif, setMenuActif] = useState('statistiques');

  useEffect(() => {
    recupererUtilisateurs();
  }, []);

  const recupererUtilisateurs = async () => {
    try {
      const reponse = await axios.get('http://localhost:5000/api/utilisateurs');
      setUtilisateurs(reponse.data);
    } catch (erreur) {
      console.error('Erreur lors de la récupération des utilisateurs:', erreur);
    }
  };

  const gererAjoutUtilisateur = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/utilisateurs', nouvelUtilisateur);
      setNouvelUtilisateur({ nom: '', email: '', motDePasse: '' });
      setAfficherFormulaireAjoutUtilisateur(false);
      recupererUtilisateurs();
    } catch (erreur) {
      console.error('Erreur lors de l\'ajout de l\'utilisateur:', erreur);
    }
  };

  const gererEditionUtilisateur = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/utilisateurs/${utilisateurEnEdition._id}`, utilisateurEnEdition);
      setUtilisateurEnEdition(null);
      recupererUtilisateurs();
    } catch (erreur) {
      console.error('Erreur lors de la mise à jour de l\'utilisateur:', erreur);
    }
  };

  const gererSuppressionUtilisateur = async (utilisateurId) => {
    try {
      await axios.delete(`http://localhost:5000/api/utilisateurs/${utilisateurId}`);
      recupererUtilisateurs();
    } catch (erreur) {
      console.error('Erreur lors de la suppression de l\'utilisateur:', erreur);
    }
  };

  const gererChangementRole = async (utilisateurId, nouveauRole) => {
    try {
      await axios.put(`http://localhost:5000/api/utilisateurs/${utilisateurId}/role`, { role: nouveauRole });
      recupererUtilisateurs();
    } catch (erreur) {
      console.error('Erreur lors du changement de rôle:', erreur);
    }
  };

  const rendreContenu = () => {
    switch (menuActif) {
      case 'statistiques':
        return (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="card">
              <div className="card-header">
                <h2 className="text-sm font-medium">Utilisateurs totaux</h2>
                <Users className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="card-content">
                <div className="text-2xl font-bold">{utilisateurs.length}</div>
                <p className="text-xs text-muted-foreground">+20% par rapport au mois dernier</p>
              </div>
            </div>
            <div className="card">
              <div className="card-header">
                <h2 className="text-sm font-medium">Films ajoutés</h2>
                <Film className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="card-content">
                <div className="text-2xl font-bold">45</div>
                <p className="text-xs text-muted-foreground">+15% par rapport au mois dernier</p>
              </div>
            </div>
            <div className="card">
              <div className="card-header">
                <h2 className="text-sm font-medium">Consultation du Site</h2>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="card-content">
                <div className="text-2xl font-bold">320</div>
                <p className="text-xs text-muted-foreground">+35% par rapport au mois dernier</p>
              </div>
            </div>
            <div className="card">
              <div className="card-header">
                <h2 className="text-sm font-medium">Revenus</h2>
                <BarChart2 className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="card-content">
                <div className="text-2xl font-bold">9,850 €</div>
                <p className="text-xs text-muted-foreground">+25% par rapport au mois dernier</p>
              </div>
            </div>
          </div>
        );
      case 'ajouterUtilisateur':
        return (
          <form onSubmit={gererAjoutUtilisateur} className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Ajouter un nouvel utilisateur</h2>
            <input
              type="text"
              placeholder="Nom"
              value={nouvelUtilisateur.nom}
              onChange={(e) => setNouvelUtilisateur({ ...nouvelUtilisateur, nom: e.target.value })}
              className="w-full p-2 mb-4 border rounded"
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={nouvelUtilisateur.email}
              onChange={(e) => setNouvelUtilisateur({ ...nouvelUtilisateur, email: e.target.value })}
              className="w-full p-2 mb-4 border rounded"
              required
            />
            <input
              type="password"
              placeholder="Mot de passe"
              value={nouvelUtilisateur.motDePasse}
              onChange={(e) => setNouvelUtilisateur({ ...nouvelUtilisateur, motDePasse: e.target.value })}
              className="w-full p-2 mb-4 border rounded"
              required
            />
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Ajouter</button>
          </form>
        );
      case 'listeUtilisateurs':
        return (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Liste des utilisateurs</h2>
            <table className="w-full">
              <thead>
                <tr>
                  <th className="text-left">Nom</th>
                  <th className="text-left">Email</th>
                  <th className="text-left">Rôle</th>
                  <th className="text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {utilisateurs.map((utilisateur) => (
                  <tr key={utilisateur._id}>
                    <td>{utilisateur.nom}</td>
                    <td>{utilisateur.email}</td>
                    <td>{utilisateur.role}</td>
                    <td>
                      <button onClick={() => setUtilisateurEnEdition(utilisateur)} className="text-blue-500 mr-2">
                        <Edit size={18} />
                      </button>
                      <button onClick={() => gererSuppressionUtilisateur(utilisateur._id)} className="text-red-500 mr-2">
                        <Trash2 size={18} />
                      </button>
                      <select
                        value={utilisateur.role}
                        onChange={(e) => gererChangementRole(utilisateur._id, e.target.value)}
                        className="border rounded px-2 py-1"
                      >
                        <option value="utilisateur">Utilisateur</option>
                        <option value="respoInspection">Responsable Inspection</option>
                        <option value="respoProduction">Responsable Production</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Barre latérale */}
      <div className="w-64 bg-blue-600 text-white">
        <div className="p-6">
          <h2 className="text-2xl font-semibold mb-6 text-center">ESPACE ADMIN</h2>
          <div className="mb-6">
            <img 
              src={utilisateur?.photo || admin} 
              alt={utilisateur?.nom || 'Admin'} 
              className="w-32 h-32 rounded-full mx-auto mb-4" 
            />
            <h3 className="text-xl font-medium text-center">{utilisateur?.nom || 'Admin'}</h3>
          </div>
          <nav>
            <button 
              onClick={() => setMenuActif('statistiques')} 
              className={`w-full text-left py-2 px-4 rounded transition-colors duration-200 flex items-center ${menuActif === 'statistiques' ? 'bg-blue-700' : 'hover:bg-blue-700'}`}
            >
              <BarChart2 className="mr-2" size={18} />
              Statistiques
            </button>
            <button 
              onClick={() => setMenuActif('ajouterUtilisateur')} 
              className={`w-full text-left py-2 px-4 rounded transition-colors duration-200 flex items-center ${menuActif === 'ajouterUtilisateur' ? 'bg-blue-700' : 'hover:bg-blue-700'}`}
            >
              <UserPlus className="mr-2" size={18} />
              Ajouter un utilisateur
            </button>
            <button 
              onClick={() => setMenuActif('listeUtilisateurs')} 
              className={`w-full text-left py-2 px-4 rounded transition-colors duration-200 flex items-center ${menuActif === 'listeUtilisateurs' ? 'bg-blue-700' : 'hover:bg-blue-700'}`}
            >
              <Users className="mr-2" size={18} />
              Liste des utilisateurs
            </button>
            <button 
              onClick={() => navigate('/')} 
              className="w-full text-left py-2 px-4 rounded hover:bg-blue-700 transition-colors duration-200 flex items-center"
            >
              <Home className="mr-2" size={18} />
              Retour au menu Accueil
            </button>
            <button 
              onClick={onDeconnexion} 
              className="w-full text-left py-2 px-4 rounded hover:bg-blue-700 transition-colors duration-200 flex items-center"
            >
              <LogOut className="mr-2" size={18} />
              Déconnexion
            </button>
          </nav>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="flex-1 p-10 bg-blue-50 overflow-auto">
        <div className="bg-blue-600 text-white p-6 rounded-lg shadow-md mb-6">
          <h1 className="text-2xl font-bold text-center">
            BIENVENUE {utilisateur?.nom?.toUpperCase() || 'ADMIN'} SUR VOTRE TABLEAU DE BORD !
          </h1>
        </div>

        {rendreContenu()}

        {utilisateurEnEdition && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
            <form onSubmit={gererEditionUtilisateur} className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">Modifier l'utilisateur</h2>
              <input
                type="text"
                placeholder="Nom"
                value={utilisateurEnEdition.nom}
                onChange={(e) => setUtilisateurEnEdition({ ...utilisateurEnEdition, nom: e.target.value })}
                className="w-full p-2 mb-4 border rounded"
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={utilisateurEnEdition.email}
                onChange={(e) => setUtilisateurEnEdition({ ...utilisateurEnEdition, email: e.target.value })}
                className="w-full p-2 mb-4 border rounded"
                required
              />
              <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Mettre à jour</button>
              <button type="button" onClick={() => setUtilisateurEnEdition(null)} className="ml-2 bg-gray-300 px-4 py-2 rounded hover:bg-gray-400">Annuler</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
} 