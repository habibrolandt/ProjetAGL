import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogOut, Camera, LayoutDashboard } from 'lucide-react';

export default function BarreNavigation({ openModal, user, onLogout, onUpdatePhoto }) {
  const [menuOuvert, setMenuOuvert] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const liens = [
    { nom: 'Accueil', href: '/' },
    { nom: 'Films', href: '/films' },
    { nom: 'Aide', href: '/aide' }
  ];

  // Ajouter le lien "Consulter planning" seulement si l'utilisateur est connecté
  if (user) {
    liens.push({ nom: 'Consulter planning', href: '/planning' });
  }

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const getInitials = (name) => {
    const names = name.split(' ');
    return names.map(n => n[0]).join('').toUpperCase();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onUpdatePhoto(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDashboardClick = () => {
    switch (user.role) {
      case 'admin':
        navigate('/admin-dashboard');
        break;
      case 'respoInspection':
        navigate('/inspection-dashboard');
        break;
      case 'respoProduction':
        navigate('/production-dashboard');
        break;
      default:
        navigate('/dashboard');
    }
    setDropdownOpen(false);
  };

  return (
    <nav className="bg-[#3A4D39] p-4 shadow-md">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <span className="text-white text-xl font-bold">Doc-Tunis</span>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            {liens.map((lien) => (
              <Link 
                key={lien.nom}
                to={lien.href} 
                className="text-white hover:text-gray-300 transition-colors duration-200 relative group pb-1"
              >
                {lien.nom}
                <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-red-600 group-hover:w-1/2 group-hover:left-1/4 transition-all duration-200"></span>
              </Link>
            ))}
            {user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center text-white hover:text-gray-300 transition-colors duration-200"
                >
                  {user.photo ? (
                    <img src={user.photo} alt={user.name} className="w-8 h-8 rounded-full mr-2" />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center mr-2">
                      <span className="text-white text-sm font-bold">{getInitials(user.name)}</span>
                    </div>
                  )}
                  <span>{user.name}</span>
                </button>
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md overflow-hidden shadow-xl z-10 animate-fadeIn">
                    {user && (
                      <button
                        onClick={handleDashboardClick}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                      >
                        <LayoutDashboard className="w-4 h-4 inline mr-2" />
                        Tableau de bord
                      </button>
                    )}
                    <button
                      onClick={onLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                    >
                      <LogOut className="w-4 h-4 inline mr-2" />
                      Déconnexion
                    </button>
                    <label className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200 cursor-pointer">
                      <Camera className="w-4 h-4 inline mr-2" />
                      Ajouter une photo
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleFileChange}
                      />
                    </label>
                  </div>
                )}
              </div>
            ) : (
              <>
                <button
                  onClick={() => openModal('inscription')}
                  className="bg-red-600 text-white hover:bg-red-700 px-4 py-2 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                >
                  Inscription
                </button>
                <button
                  onClick={() => openModal('connexion')}
                  className="bg-red-600 text-white hover:bg-red-700 px-4 py-2 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                >
                  Connexion
                </button>
              </>
            )}
          </div>
          <button 
            className="md:hidden text-white focus:outline-none"
            onClick={() => setMenuOuvert(!menuOuvert)}
            aria-label="Ouvrir le menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
        <div 
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            menuOuvert ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="pt-4 space-y-2">
            {liens.map((lien) => (
              <Link 
                key={lien.nom}
                to={lien.href} 
                className="block text-white hover:text-gray-300 py-2 relative group"
              >
                {lien.nom}
                <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-red-600 group-hover:w-1/2 group-hover:left-1/4 transition-all duration-200"></span>
              </Link>
            ))}
            {user ? (
              <>
                <div className="flex items-center text-white py-2">
                  {user.photo ? (
                    <img src={user.photo} alt={user.name} className="w-8 h-8 rounded-full mr-2" />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center mr-2">
                      <span className="text-white text-sm font-bold">{getInitials(user.name)}</span>
                    </div>
                  )}
                  <span>{user.name}</span>
                </div>
                {user && (
                  <button
                    onClick={handleDashboardClick}
                    className="block w-full text-left text-white hover:text-gray-300 py-2"
                  >
                    <LayoutDashboard className="w-5 h-5 inline mr-2" />
                    Tableau de bord
                  </button>
                )}
                <button
                  onClick={onLogout}
                  className="block w-full text-left text-white hover:text-gray-300 py-2"
                >
                  <LogOut className="w-5 h-5 inline mr-2" />
                  Déconnexion
                </button>
                <label className="block w-full text-left text-white hover:text-gray-300 py-2 cursor-pointer">
                  <Camera className="w-5 h-5 inline mr-2" />
                  Ajouter une photo
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </label>
              </>
            ) : (
              <>
                <button
                  onClick={() => openModal('inscription')}
                  className="block w-full bg-red-600 text-white hover:bg-red-700 px-4 py-2 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                >
                  Inscription
                </button>
                <button
                  onClick={() => openModal('connexion')}
                  className="block w-full bg-red-600 text-white hover:bg-red-700 px-4 py-2 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                >
                  Connexion
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}