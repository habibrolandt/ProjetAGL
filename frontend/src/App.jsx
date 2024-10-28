import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { FilmProvider } from '../src/contexts/FilmContext';
import BarreNavigation from './components/BarreNavigation';
import Accueil from './pages/Accueil';
import Films from './pages/Films';
import Aide from './pages/Aide';
import Planning from './pages/Planning';
import Modal from './components/Modal';
import Connexion from './components/Connexion';
import Inscription from './components/Inscription';
import DashboardAdmin from './pages/DashboardAdmin';
import DashboardInspection from './pages/DashboardInspection';
import DashboardProduction from './pages/DashboardProduction';
import UnauthorizedAccess from './components/UnauthorizedAccess';

function App() {
  const [modalContent, setModalContent] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const openModal = (content) => {
    setModalContent(content);
  };

  const closeModal = () => {
    setModalContent(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <FilmProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <BarreNavigation 
            openModal={openModal} 
            user={user} 
            onLogout={handleLogout}
          />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Accueil />} />
              <Route path="/films" element={<Films />} />
              <Route path="/aide" element={<Aide />} />
              <Route 
                path="/planning" 
                element={user ? <Planning /> : <UnauthorizedAccess openModal={openModal} />} 
              />
              <Route 
                path="/dashboard" 
                element={
                  user ? (
                    user.role === 'admin' ? (
                      <Navigate to="/admin-dashboard" />
                    ) : user.role === 'respoInspection' ? (
                      <Navigate to="/inspection-dashboard" />
                    ) : user.role === 'respoProduction' ? (
                      <Navigate to="/production-dashboard" />
                    ) : (
                      <Accueil user={user} />
                    )
                  ) : (
                    <Navigate to="/" />
                  )
                } 
              />
              <Route
                path="/admin-dashboard"
                element={
                  user && user.role === 'admin' ? (
                    <DashboardAdmin user={user} onLogout={handleLogout} />
                  ) : (
                    <Navigate to="/" />
                  )
                }
              />
              <Route
                path="/inspection-dashboard"
                element={
                  user && user.role === 'respoInspection' ? (
                    <DashboardInspection user={user} onLogout={handleLogout} />
                  ) : (
                    <Navigate to="/" />
                  )
                }
              />
              <Route
                path="/production-dashboard"
                element={
                  user && user.role === 'respoProduction' ? (
                    <DashboardProduction user={user} onLogout={handleLogout} />
                  ) : (
                    <Navigate to="/" />
                  )
                }
              />
            </Routes>
          </main>
          {modalContent && (
            <Modal closeModal={closeModal}>
              {modalContent === 'connexion' ? (
                <Connexion closeModal={closeModal} openModal={openModal} setUser={setUser} />
              ) : (
                <Inscription closeModal={closeModal} openModal={openModal} />
              )}
            </Modal>
          )}
        </div>
      </Router>
    </FilmProvider>
  );
}

export default App;