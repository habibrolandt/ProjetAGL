import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, UserPlus, Edit, Trash2, LogOut, BarChart2, Film, Users, Calendar } from 'lucide-react';
import axios from 'axios';
import admin from '../../src/assets/Ressources/admin.jpg';

export default function DashboardAdmin({ user, onLogout }) {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [showAddUserForm, setShowAddUserForm] = useState(false);
  const [newUser, setNewUser] = useState({ name: '', email: '', password: '' });
  const [editingUser, setEditingUser] = useState(null);
  const [activeMenu, setActiveMenu] = useState('statistiques');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://192.168.84.154:5000/api/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des utilisateurs:', error);
    }
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://192.168.84.154:5000/api/users', newUser);
      setNewUser({ name: '', email: '', password: '' });
      setShowAddUserForm(false);
      fetchUsers();
    } catch (error) {
      console.error('Erreur lors de l\'ajout de l\'utilisateur:', error);
    }
  };

  const handleEditUser = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://192.168.84.154:5000/api/users/${editingUser._id}`, editingUser);
      setEditingUser(null);
      fetchUsers();
    } catch (error) {
      console.error('Erreur lors de la mise à jour de l\'utilisateur:', error);
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`http://192.168.84.154:5000/api/users/${userId}`);
      fetchUsers();
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'utilisateur:', error);
    }
  };

  const handleChangeRole = async (userId, newRole) => {
    try {
      await axios.put(`http://192.168.84.154:5000/api/users/${userId}/role`, { role: newRole });
      fetchUsers();
    } catch (error) {
      console.error('Erreur lors du changement de rôle:', error);
    }
  };

  const renderContent = () => {
    switch (activeMenu) {
      case 'statistiques':
        // ... (garder le code existant pour les statistiques)
        return (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="card">
              <div className="card-header">
                <h2 className="text-sm font-medium">Utilisateurs totaux</h2>
                <Users className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="card-content">
                <div className="text-2xl font-bold">{users.length}</div>
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
      case 'ajouterUser':
        return (
          <form onSubmit={handleAddUser} className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Ajouter un nouvel utilisateur</h2>
            <input
              type="text"
              placeholder="Nom"
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
              className="w-full p-2 mb-4 border rounded"
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={newUser.email}
              onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
              className="w-full p-2 mb-4 border rounded"
              required
            />
            <input
              type="password"
              placeholder="Mot de passe"
              value={newUser.password}
              onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
              className="w-full p-2 mb-4 border rounded"
              required
            />
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Ajouter</button>
          </form>
        );
      case 'listeUsers':
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
                {users.map((user) => (
                  <tr key={user._id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                    <td>
                      <button onClick={() => setEditingUser(user)} className="text-blue-500 mr-2">
                        <Edit size={18} />
                      </button>
                      <button onClick={() => handleDeleteUser(user._id)} className="text-red-500 mr-2">
                        <Trash2 size={18} />
                      </button>
                      <select
                        value={user.role}
                        onChange={(e) => handleChangeRole(user._id, e.target.value)}
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
      {/* Sidebar */}
      <div className="w-64 bg-blue-600 text-white">
        <div className="p-6">
          <h2 className="text-2xl font-semibold mb-6 text-center">ESPACE ADMIN</h2>
          <div className="mb-6">
            <img src={user.photo || admin} alt={user.name} className="w-32 h-32 rounded-full mx-auto mb-4" />
            <h3 className="text-xl font-medium text-center">{user.name}</h3>
          </div>
          <nav>
            <button 
              onClick={() => setActiveMenu('statistiques')} 
              className={`w-full text-left py-2 px-4 rounded transition-colors duration-200 flex items-center ${activeMenu === 'statistiques' ? 'bg-blue-700' : 'hover:bg-blue-700'}`}
            >
              <BarChart2 className="mr-2" size={18} />
              Statistiques
            </button>
            <button 
              onClick={() => setActiveMenu('ajouterUser')} 
              className={`w-full text-left py-2 px-4 rounded transition-colors duration-200 flex items-center ${activeMenu === 'ajouterUser' ? 'bg-blue-700' : 'hover:bg-blue-700'}`}
            >
              <UserPlus className="mr-2" size={18} />
              Ajouter un User
            </button>
            <button 
              onClick={() => setActiveMenu('listeUsers')} 
              className={`w-full text-left py-2 px-4 rounded transition-colors duration-200 flex items-center ${activeMenu === 'listeUsers' ? 'bg-blue-700' : 'hover:bg-blue-700'}`}
            >
              <Users className="mr-2" size={18} />
              Liste des Users
            </button>
            <button 
              onClick={() => navigate('/')} 
              className="w-full text-left py-2 px-4 rounded hover:bg-blue-700 transition-colors duration-200 flex items-center"
            >
              <Home className="mr-2" size={18} />
              Retour au menu Accueil
            </button>
            <button 
              onClick={onLogout} 
              className="w-full text-left py-2 px-4 rounded hover:bg-blue-700 transition-colors duration-200 flex items-center"
            >
              <LogOut className="mr-2" size={18} />
              Déconnexion
            </button>
          </nav>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 p-10 bg-blue-50 overflow-auto">
        <div className="bg-blue-600 text-white p-6 rounded-lg shadow-md mb-6">
          <h1 className="text-2xl font-bold text-center">
            BIENVENUE {user.name.toUpperCase()} SUR VOTRE TABLEAU DE BORD !
          </h1>
        </div>

        {renderContent()}

        {editingUser && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
            <form onSubmit={handleEditUser} className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">Modifier l'utilisateur</h2>
              <input
                type="text"
                placeholder="Nom"
                value={editingUser.name}
                onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
                className="w-full p-2 mb-4 border rounded"
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={editingUser.email}
                onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                className="w-full p-2 mb-4 border rounded"
                required
              />
              <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Mettre à jour</button>
              <button type="button" onClick={() => setEditingUser(null)} className="ml-2 bg-gray-300 px-4 py-2 rounded hover:bg-gray-400">Annuler</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}