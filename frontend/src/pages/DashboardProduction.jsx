import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, LogOut, BarChart2, Calendar, ArrowLeft, Users, Film, Clock, Edit, Trash2 } from 'lucide-react';
import axios from 'axios';
import  biagne from '../../src/assets/Ressources/Prod.jpg';

const allFilms = [
  { id: 1, titre: "Film Joker" },
  { id: 2, titre: "Films" },
  { id: 3, titre: "Films Cargo" },
  { id: 4, titre: "Films Fast and Furious" },
  { id: 5, titre: "Films GLASS" },
  { id: 6, titre: "Films SICARIO" },
  { id: 7, titre: "Films HIDDEN FIGURES" },
  { id: 8, titre: "Films Jumanji" },
  { id: 9, titre: "Films Ghosted" },
  { id: 10, titre: "Films RED NOTICE" },
  { id: 11, titre: "Films SIDEMEN BECOME FARMERS" },
  { id: 12, titre: "Films Divergente" },
];

const salles = ["Salle 1", "Salle 2", "Salle 3", "Salle 4", "Salle 5"];

export default function DashboardProduction({ user, onLogout }) {
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState('statistiques');
  const [planningForm, setPlanningForm] = useState({
    id: null,
    film: '',
    salle: '',
    date: '',
    heure: '',
  });
  const [plannings, setPlannings] = useState([]);
  const [stats, setStats] = useState({
    totalPlannings: 0,
    planningsAujourdhui: 0,
    spectateursAujourdhui: 0,
    filmLePlusPopulaire: '',
  });
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    fetchPlannings();
    fetchStats();
    const interval = setInterval(fetchStats, 60000); // Mise à jour toutes les minutes
    return () => clearInterval(interval);
  }, []);

  const fetchPlannings = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/plannings');
      setPlannings(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des plannings:', error);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/stats');
      setStats(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des statistiques:', error);
    }
  };

  const handlePlanningChange = (e) => {
    setPlanningForm({ ...planningForm, [e.target.name]: e.target.value });
  };

  const handlePlanningSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = {
        ...planningForm,
        date: new Date(planningForm.date).toISOString(),
      };
      if (editMode) {
        await axios.put(`http://localhost:5000/api/plannings/${planningForm.id}`, formData);
        alert('Planning modifié avec succès!');
      } else {
        await axios.post('http://localhost:5000/api/plannings', formData);
        alert('Planning enregistré avec succès!');
      }
      setPlanningForm({ id: null, film: '', salle: '', date: '', heure: '' });
      setEditMode(false);
      fetchPlannings();
      fetchStats();
    } catch (error) {
      console.error('Erreur lors de l\'enregistrement/modification du planning:', error);
      alert('Erreur lors de l\'enregistrement/modification du planning');
    }
  };

  const handleEdit = (planning) => {
    setPlanningForm({
      ...planning,
      date: new Date(planning.date).toISOString().split('T')[0],
    });
    setEditMode(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce planning ?')) {
      try {
        await axios.delete(`http://localhost:5000/api/plannings/${id}`);
        alert('Planning supprimé avec succès!');
        fetchPlannings();
        fetchStats();
      } catch (error) {
        console.error('Erreur lors de la suppression du planning:', error);
        alert('Erreur lors de la suppression du planning');
      }
    }
  };

  const handleCancelEdit = () => {
    setPlanningForm({ id: null, film: '', salle: '', date: '', heure: '' });
    setEditMode(false);
  };

  const getAvailableFilms = () => {
    const plannedFilms = plannings.map(p => p.film);
    return allFilms.filter(film => !plannedFilms.includes(film.titre));
  };

  const renderContent = () => {
    switch (activeMenu) {
      case 'statistiques':
        return (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-2 flex items-center">
                <Calendar className="mr-2" size={24} />
                Plannings totaux
              </h2>
              <p className="text-3xl font-bold">{stats.totalPlannings}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-2 flex items-center">
                <Clock className="mr-2" size={24} />
                Plannings aujourd'hui
              </h2>
              <p className="text-3xl font-bold">{stats.planningsAujourdhui}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-2 flex items-center">
                <Users className="mr-2" size={24} />
                Spectateurs aujourd'hui
              </h2>
              <p className="text-3xl font-bold">{stats.spectateursAujourdhui}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-2 flex items-center">
                <Film className="mr-2" size={24} />
                Film le plus populaire
              </h2>
              <p className="text-xl font-bold">{stats.filmLePlusPopulaire}</p>
            </div>
          </div>
        );
      case 'etablirPlanning':
        return (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-6">
              {editMode ? 'Modifier un planning' : 'Établir un planning'}
            </h2>
            <form onSubmit={handlePlanningSubmit} className="space-y-4">
              <div>
                <label htmlFor="film" className="block text-sm font-medium text-gray-700">Film</label>
                <select
                  id="film"
                  name="film"
                  value={planningForm.film}
                  onChange={handlePlanningChange}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm rounded-md"
                  required
                >
                  <option value="">Sélectionnez un film</option>
                  {(editMode ? allFilms : getAvailableFilms()).map((film) => (
                    <option key={film.id} value={film.titre}>{film.titre}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="salle" className="block text-sm font-medium text-gray-700">Salle</label>
                <select
                  id="salle"
                  name="salle"
                  value={planningForm.salle}
                  onChange={handlePlanningChange}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm rounded-md"
                  required
                >
                  <option value="">Sélectionnez une salle</option>
                  {salles.map((salle) => (
                    <option key={salle} value={salle}>{salle}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={planningForm.date}
                  onChange={handlePlanningChange}
                  min={new Date().toISOString().split('T')[0]}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm rounded-md"
                  required
                />
              </div>
              <div>
                <label htmlFor="heure" className="block text-sm font-medium text-gray-700">Heure</label>
                <input
                  type="time"
                  id="heure"
                  name="heure"
                  value={planningForm.heure}
                  onChange={handlePlanningChange}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm rounded-md"
                  required
                />
              </div>
              <div className="flex justify-between">
                <button
                  type="submit"
                  className="flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                >
                  {editMode ? 'Modifier le planning' : 'Enregistrer le planning'}
                </button>
                {editMode && (
                  <button
                    type="button"
                    onClick={handleCancelEdit}
                    className="flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                  >
                    Annuler la modification
                  </button>
                )}
              </div>
            </form>
            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-4">Plannings enregistrés</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Film</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Salle</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Heure</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {plannings.map((planning) => (
                      <tr key={planning._id}>
                        <td className="px-6 py-4 whitespace-nowrap">{planning.film}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{planning.salle}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{new Date(planning.date).toLocaleDateString()}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{planning.heure}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button
                            onClick={() => handleEdit(planning)}
                            className="text-orange-600 hover:text-orange-900 mr-2"
                          >
                            <Edit size={18} />
                          </button>
                          <button
                            onClick={() => handleDelete(planning._id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <Trash2 size={18} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
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
      <div className="w-64 bg-orange-600 text-white">
        <div className="p-6">
          <h2 className="text-2xl font-semibold mb-6 text-center">ESPACE PRODUCTION</h2>
          <div className="mb-6">
            <img src={user.photo || biagne} alt={user.name} className="w-32 h-32 rounded-full mx-auto mb-4" />
            <h3 className="text-xl font-medium text-center">{user.name}</h3>
          </div>
          <nav className="space-y-2">
            <button 
              onClick={() => setActiveMenu('statistiques')} 
              className={`w-full text-left py-2 px-4 rounded transition-colors duration-200 flex items-center ${activeMenu === 'statistiques' ? 'bg-orange-700' : 'hover:bg-orange-700'}`}
            >
              
              <BarChart2 className="mr-2" size={18} />
              Statistiques
            </button>
            <button 
              onClick={() => setActiveMenu('etablirPlanning')} 
              className={`w-full text-left py-2 px-4 rounded transition-colors duration-200 flex items-center ${activeMenu === 'etablirPlanning' ? 'bg-orange-700' : 'hover:bg-orange-700'}`}
            >
              <Calendar className="mr-2" size={18} />
              Etablir Planning
            </button>
            <button 
              onClick={() => navigate('/')} 
              className="w-full text-left py-2 px-4 rounded hover:bg-orange-700 transition-colors duration-200 flex items-center"
            >
              <ArrowLeft className="mr-2" size={18} />
              Retour au menu Accueil
            </button>
            <button 
              onClick={onLogout} 
              className="w-full text-left py-2 px-4 rounded hover:bg-orange-700 transition-colors duration-200 flex items-center"
            >
              <LogOut className="mr-2" size={18} />
              Déconnexion
            </button>
          </nav>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 p-10 bg-orange-50 overflow-auto">
        <div className="bg-orange-600 text-white p-6 rounded-lg shadow-md mb-6">
          <h1 className="text-2xl font-bold text-center">
            BIENVENUE {user.name.toUpperCase()} SUR VOTRE TABLEAU DE BORD DE PRODUCTION !
          </h1>
        </div>

        {renderContent()}
      </div>
    </div>
  );
}