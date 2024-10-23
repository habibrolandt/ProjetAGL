import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-[#3A4D39] text-white py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-1/4 mb-8 md:mb-0">
            <h3 className="text-2xl font-bold mb-4">Doc-Tunis</h3>
            <p className="mb-4">Votre portail vers les meilleurs documentaires sur la Tunisie.</p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-gray-300">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="text-white hover:text-gray-300">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-white hover:text-gray-300">
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>
          <div className="w-full md:w-1/4 mb-8 md:mb-0">
            <h4 className="text-xl font-semibold mb-4">Liens rapides</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="hover:text-gray-300">Accueil</Link></li>
              <li><Link to="/films" className="hover:text-gray-300">Films</Link></li>
              <li><Link to="/aide" className="hover:text-gray-300">Aide</Link></li>
              <li><Link to="/conditions" className="hover:text-gray-300">Conditions d'utilisation</Link></li>
              <li><Link to="/confidentialite" className="hover:text-gray-300">Politique de confidentialité</Link></li>
            </ul>
          </div>
          <div className="w-full md:w-1/4 mb-8 md:mb-0">
            <h4 className="text-xl font-semibold mb-4">Catégories populaires</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-gray-300">Histoire</a></li>
              <li><a href="#" className="hover:text-gray-300">Culture</a></li>
              <li><a href="#" className="hover:text-gray-300">Nature</a></li>
              <li><a href="#" className="hover:text-gray-300">Société</a></li>
              <li><a href="#" className="hover:text-gray-300">Art et Artisanat</a></li>
            </ul>
          </div>
          <div className="w-full md:w-1/4">
            <h4 className="text-xl font-semibold mb-4">Nous contacter</h4>
            <form>
              <input
                type="email"
                placeholder="Votre email"
                className="w-full p-2 mb-4 bg-gray-700 text-white rounded"
              />
              <textarea
                placeholder="Votre message"
                className="w-full p-2 mb-4 bg-gray-700 text-white rounded"
                rows="4"
              ></textarea>
              <button
                type="submit"
                className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition duration-300"
              >
                Envoyer
              </button>
            </form>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p>&copy; 2024 Doc-Tunis. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  )
}