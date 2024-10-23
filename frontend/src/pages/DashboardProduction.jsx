import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, Edit, LogOut, BarChart2, Package, TrendingUp, Calendar } from 'lucide-react';
import axios from 'axios';
import Prod from '../../src/assets/Ressources/Prod.jpg';

export default function DashboardProduction({ user, onLogout }) {
  const navigate = useNavigate();
  const [productions, setProductions] = useState([]);
  const [activeMenu, setActiveMenu] = useState('statistiques');

  useEffect(() => {
    fetchProductions();
  }, []);

  const fetchProductions = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/productions');
      setProductions(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des productions:', error);
    }
  };

  const renderContent = () => {
    switch (activeMenu) {
      case 'statistiques':
        return (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="card">
              <div className="card-header">
                <h2 className="text-sm font-medium">Productions totales</h2>
                <Package className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="card-content">
                <div className="text-2xl font-bold">{productions.length}</div>
                <p className="text-xs text-muted-foreground">+10% par rapport au mois dernier</p>
              </div>
            </div>
            <div className="card">
              <div className="card-header">
                <h2 className="text-sm font-medium">Productions en cours</h2>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="card-content">
                <div className="text-2xl font-bold">7</div>
                <p className="text-xs text-muted-foreground">+15% par rapport au mois dernier</p>
              </div>
            </div>
            <div className="card">
              <div className="card-header">
                <h2 className="text-sm font-medium">Productions planifiées</h2>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="card-content">
                <div className="text-2xl font-bold">5</div>
                <p className="text-xs text-muted-foreground">+25% par rapport au mois dernier</p>
              </div>
            </div>
            <div className="card">
              <div className="card-header">
                <h2 className="text-sm font-medium">Efficacité de production</h2>
                <BarChart2 className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="card-content">
                <div className="text-2xl font-bold">88%</div>
                <p className="text-xs text-muted-foreground">+3% par rapport au mois dernier</p>
              </div>
            </div>
          </div>
        );
      case 'listeProductions':
        return (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Liste des films a plannifier</h2>
            <table className="w-full">
              
              <tbody>
                {productions.map((production) => (
                  <tr key={production._id}>
                    <td>{production._id}</td>
                    <td>{production.product}</td>
                    <td>{production.quantity}</td>
                    <td>{production.status}</td>
                    <td>
                      <button onClick={() => {/* Logique pour éditer la production */}} className="text-blue-500 mr-2">
                        <Edit size={18} />
                      </button>
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
      <div className="w-64 bg-orange-600 text-white">
        <div className="p-6">
          <h2 className="text-2xl font-semibold mb-6 text-center">ESPACE PRODUCTION</h2>
          <div className="mb-6">
            <img src={user.photo || Prod} alt={user.name} className="w-32 h-32 rounded-full mx-auto mb-4" />
            <h3 className="text-xl font-medium text-center">{user.name}</h3>
          </div>
          <nav>
            <button 
              onClick={() => setActiveMenu('statistiques')} 
              className={`w-full text-left py-2 px-4 rounded transition-colors duration-200 flex items-center ${activeMenu === 'statistiques' ? 'bg-orange-700' : 'hover:bg-orange-700'}`}
            >
              <BarChart2 className="mr-2" size={18} />
              Statistiques
            </button>
            <button 
              onClick={() => setActiveMenu('listeProductions')} 
              className={`w-full text-left py-2 px-4 rounded transition-colors duration-200 flex items-center ${activeMenu === 'listeProductions' ? 'bg-orange-700' : 'hover:bg-orange-700'}`}
            >
              <Package className="mr-2" size={18} />
              Etablir Planning
            </button>
            <button 
              onClick={() => navigate('/')} 
              className="w-full text-left py-2 px-4 rounded hover:bg-orange-700 transition-colors duration-200 flex items-center"
            >
              <Home className="mr-2" size={18} />
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
        <div className="bg-orange-600 text-white p-6 rounded-lg shadow-md  mb-6">
          <h1 className="text-2xl font-bold text-center">
            BIENVENUE {user.name.toUpperCase()} SUR VOTRE TABLEAU DE BORD DE PRODUCTION !
          </h1>
        </div>

        {renderContent()}
      </div>
    </div>
  );
}