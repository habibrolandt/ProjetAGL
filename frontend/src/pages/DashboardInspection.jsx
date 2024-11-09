import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, Edit, LogOut, BarChart2, Clipboard, CheckSquare, Calendar, Film, Plus, Search, Trash2 } from 'lucide-react';
import { useFilms } from '../contexts/FilmContext';
import Inspec from '../assets/Ressources/Inspec.jpg';

export default function DashboardInspection({ user, onLogout }) {
  const navigate = useNavigate();
  const { films, ajouterFilm, supprimerFilm, mettreAJourFilm } = useFilms();
  const [inspections, setInspections] = useState([]);
  const [activeMenu, setActiveMenu] = useState('statistiques');
  const [newFilm, setNewFilm] = useState({ title: '', description: '', director: '', producer: '', image: null });
  const [searchTerm, setSearchTerm] = useState('');
  const [editingFilm, setEditingFilm] = useState(null);

  useEffect(() => {
    fetchInspections();
  }, []);

  const fetchInspections = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/respos');
      const data = await response.json();
      setInspections(data);
    } catch (error) {
      console.error('Erreur lors de la récupération des inspections:', error);
    }
  };

  const handleAddFilm = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      for (const [key, value] of Object.entries(newFilm)) {
        if (value !== null) {
          formData.append(key, value);
        }
      }
      await ajouterFilm(formData);
      setNewFilm({ title: '', description: '', director: '', producer: '', image: null });
    } catch (error) {
      console.error('Erreur lors de l\'ajout du film:', error);
    }
  };

  const handleEditFilm = async (e) => {
    e.preventDefault();
    if (!editingFilm) return;
    try {
      const formData = new FormData();
      for (const [key, value] of Object.entries(editingFilm)) {
        if (value !== null) {
          formData.append(key, value);
        }
      }
      await mettreAJourFilm(editingFilm._id, formData);
      setEditingFilm(null);
    } catch (error) {
      console.error('Erreur lors de la mise à jour du film:', error);
    }
  };

  const handleDeleteFilm = async (filmId) => {
    try {
      await supprimerFilm(filmId);
    } catch (error) {
      console.error('Erreur lors de la suppression du film:', error);
    }
  };

  const filteredFilms = films.filter(film =>
    film.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderContent = () => {
    switch (activeMenu) {
      case 'statistiques':
        return (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-2">Inspections totales</h3>
              <div className="text-2xl font-bold">{inspections.length}</div>
              <p className="text-sm text-gray-600">+15% par rapport au mois dernier</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-2">Films ajoutés</h3>
              <div className="text-2xl font-bold">{films.length}</div>
              <p className="text-sm text-gray-600">+10% par rapport au mois dernier</p>
            </div>
          </div>
        );
      case 'ajouterFilm':
        return (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Ajouter un nouveau film</h2>
            <form onSubmit={handleAddFilm} className="space-y-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">Titre</label>
                <input
                  type="text"
                  id="title"
                  value={newFilm.title}
                  onChange={(e) => setNewFilm({ ...newFilm, title: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  required
                />
              </div>
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  id="description"
                  value={newFilm.description}
                  onChange={(e) => setNewFilm({ ...newFilm, description: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  required
                />
              </div>
              <div>
                <label htmlFor="director" className="block text-sm font-medium text-gray-700">Réalisateur</label>
                <input
                  type="text"
                  id="director"
                  value={newFilm.director}
                  onChange={(e) => setNewFilm({ ...newFilm, director: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  required
                />
              </div>
              <div>
                <label htmlFor="producer" className="block text-sm font-medium text-gray-700">Producteur</label>
                <input
                  type="text"
                  id="producer"
                  value={newFilm.producer}
                  onChange={(e) => setNewFilm({ ...newFilm, producer: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  required
                />
              </div>
              <div>
                <label htmlFor="image" className="block text-sm font-medium text-gray-700">Image</label>
                <input
                  type="file"
                  id="image"
                  onChange={(e) => setNewFilm({ ...newFilm, image: e.target.files[0] })}
                  className="mt-1 block w-full"
                  required
                />
              </div>
              <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700">Ajouter le film</button>
            </form>
          </div>
        );
      case 'afficherCatalogues':
        return (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Catalogue des films</h2>
              <div className="relative">
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Rechercher des films..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8 pr-2 py-2 border rounded-md"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredFilms.map((film) => (
                <div key={film._id} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <img src={film.image} alt={film.title} className="w-full h-48 object-cover" />
                  <div className="p-4">
                    <h3 className="text-xl font-semibold mb-2">{film.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">{film.description}</p>
                    <p className="text-sm"><strong>Réalisateur:</strong> {film.director}</p>
                    <p className="text-sm"><strong>Producteur:</strong> {film.producer}</p>
                    <div className="mt-4 flex justify-between">
                      <button
                        onClick={() => setEditingFilm(film)}
                        className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
                      >
                        <Edit className="h-4 w-4 inline-block mr-1" />
                        Modifier
                      </button>
                      <button
                        onClick={() => handleDeleteFilm(film._id)}
                        className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                      >
                        <Trash2 className="h-4 w-4 inline-block mr-1" />
                        Supprimer
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-green-600 text-white">
        <div className="p-6">
          <h2 className="text-2xl font-semibold mb-6 text-center">ESPACE INSPECTION</h2>
          <div className="mb-6">
            <img src={user.photo || Inspec}   alt={user.name} className="w-32 h-32 rounded-full mx-auto mb-4" />
            <h3 className="text-xl font-medium text-center">{user.name}</h3>
          </div>
          <nav className="space-y-2">
            <button
              className={`w-full text-left py-2 px-4 rounded transition-colors duration-200 flex items-center ${activeMenu === 'statistiques' ? 'bg-green-700' : 'hover:bg-green-700'}`}
              onClick={() => setActiveMenu('statistiques')}
            >
              <BarChart2 className="mr-2" size={18} />
              Statistiques
            </button>
            <button
              className={`w-full text-left py-2 px-4 rounded transition-colors duration-200 flex items-center ${activeMenu === 'ajouterFilm' ? 'bg-green-700' : 'hover:bg-green-700'}`}
              onClick={() => setActiveMenu('ajouterFilm')}
            >
              <Plus className="mr-2" size={18} />
              Ajouter un film
            </button>
            <button
              className={`w-full text-left py-2 px-4 rounded transition-colors duration-200 flex items-center ${activeMenu === 'afficherCatalogues' ? 'bg-green-700' : 'hover:bg-green-700'}`}
              onClick={() => setActiveMenu('afficherCatalogues')}
            >
              <Film className="mr-2" size={18} />
              Afficher Catalogues
            </button>
            <button
              className="w-full text-left py-2 px-4 rounded hover:bg-green-700 transition-colors duration-200 flex items-center"
              onClick={() => navigate('/')}
            >
              <Home className="mr-2" size={18} />
              Retour au menu Accueil
            </button>
            <button
              className="w-full text-left py-2 px-4 rounded hover:bg-green-700 transition-colors duration-200 flex items-center"
              onClick={onLogout}
            >
              <LogOut className="mr-2" size={18} />
              Déconnexion
            </button>
          </nav>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 p-10 bg-green-50 overflow-auto">
        <div className="bg-green-600 text-white p-6 rounded-lg shadow-md mb-6">
          <h1 className="text-2xl font-bold text-center">
            BIENVENUE {user.name.toUpperCase()} SUR VOTRE TABLEAU DE BORD D'INSPECTION !
          </h1>
        </div>

        {renderContent()}

        {editingFilm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg w-96">
              <h2 className="text-xl font-bold mb-4">Modifier le film</h2>
              <form onSubmit={handleEditFilm} className="space-y-4">
                <div>
                  <label htmlFor="edit-title" className="block text-sm font-medium text-gray-700">Titre</label>
                  <input
                    type="text"
                    id="edit-title"
                    value={editingFilm.title}
                    onChange={(e) => setEditingFilm({ ...editingFilm, title: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="edit-description" className="block text-sm font-medium text-gray-700">Description</label>
                  <textarea
                    id="edit-description"
                    value={editingFilm.description}
                    onChange={(e) => setEditingFilm({ ...editingFilm, description: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="edit-director" className="block text-sm font-medium text-gray-700">Réalisateur</label>
                  <input
                    type="text"
                    id="edit-director"
                    value={editingFilm.director}
                    onChange={(e) => setEditingFilm({ ...editingFilm, director: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="edit-producer" className="block text-sm font-medium text-gray-700">Producteur</label>
                  <input
                    type="text"
                    id="edit-producer"
                    value={editingFilm.producer}
                    onChange={(e) => setEditingFilm({ ...editingFilm, producer: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="edit-image" className="block text-sm font-medium text-gray-700">Image</label>
                  <input
                    type="file"
                    id="edit-image"
                    onChange={(e) => setEditingFilm({ ...editingFilm, image: e.target.files[0] })}
                    className="mt-1 block w-full"
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Mettre à jour</button>
                  <button type="button" onClick={() => setEditingFilm(null)} className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400">Annuler</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}