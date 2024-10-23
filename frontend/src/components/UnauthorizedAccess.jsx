import React from 'react';
import { Link } from 'react-router-dom';

export default function UnauthorizedAccess() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Accès non autorisé</h2>
        <p className="text-gray-600 mb-6">Vous devez avoir un compte pour accéder à cette page.</p>
        <div className="space-x-4">
          <Link
            to="/connexion"
            className="inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-200"
          >
            Se connecter
          </Link>
          <Link
            to="/inscription"
            className="inline-block bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors duration-200"
          >
            S'inscrire
          </Link>
        </div>
      </div>
    </div>
  );
}