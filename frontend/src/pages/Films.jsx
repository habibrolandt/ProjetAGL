import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import Footer from '../components/Footer';
import techno from '../assets/Ressources/techno.jpg';
import technoVidéo from '../assets/Ressources/technoVidéo.mp4';
import joker from '../assets/Ressources/joker.jfif'
import calla from '../assets/Ressources/calla.jfif'
import Cargo from '../assets/Ressources/Cargo.jpeg'
import Fast from '../assets/Ressources/Fast.jpeg'
import glass from '../assets/Ressources/Glass.jpeg'
import sicario from '../assets/Ressources/Sicario.jpeg'
import hidden from '../assets/Ressources/Hidden Figures.jpeg'
import jumanji from '../assets/Ressources/Jumanji.jpeg'
import ghosted from '../assets/Ressources/ghosted.jpeg'
import red from '../assets/Ressources/RED.jpeg'
import sidemen from '../assets/Ressources/sidemen.jpeg'
import divergente from '../assets/Ressources/Divergente.jpeg'

const films = [
  { id: 1, titre: "Film Joker", image: joker, horaires: ["15:00", "17:00", "19:00", "21:00"] },
  { id: 2, titre: "Films", image: calla, horaires: ["15:00", "17:00", "19:00", "21:00"] },
  { id: 3, titre: "Films Cargo", image: Cargo , horaires: ["15:00", "17:00", "19:00", "21:00"] },
  { id: 4, titre: "Films Fast and Furious", image: Fast , horaires: ["15:00", "17:00", "19:00", "21:00"] },
  { id: 5, titre: "Films GLASS", image: glass , horaires: ["15:00", "17:00", "19:00", "21:00"] },
  { id: 6, titre: "Films SICARIO", image: sicario, horaires: ["15:00", "17:00", "19:00", "21:00"] },
  { id: 7, titre: "Films HIDDEN FIGURES", image: hidden, horaires: ["15:00", "17:00", "19:00", "21:00"] },
  { id: 8, titre: "Films Jumanji", image: jumanji, horaires: ["15:00", "17:00", "19:00", "21:00"] },
  { id: 9, titre: "Films Ghosted", image: ghosted, horaires: ["15:00", "17:00", "19:00", "21:00"] },
  { id: 10, titre: "Films RED NOTICE", image: red, horaires: ["15:00", "17:00", "19:00", "21:00"] },
  { id: 11, titre: "Films SIDEMEN BECOME FARMERS", image: sidemen, horaires: ["15:00", "17:00", "19:00", "21:00"] },
  { id: 12, titre: "Films Divergente", image: divergente, horaires: ["15:00", "17:00", "19:00", "21:00"] },
];

export default function Films() {
  const [dateSelectionnee, setDateSelectionnee] = useState('');
  const [heureSelectionnee, setHeureSelectionnee] = useState('');
  const [videoVisible, setVideoVisible] = useState(false);
  const [recherche, setRecherche] = useState('');

  useEffect(() => {
    const hash = window.location.hash;
    if (hash === '#aide') {
      const footer = document.getElementById('footer');
      if (footer) {
        footer.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, []);

  const filmsFiltrés = useCallback(() => {
    return films.filter(film => 
      film.titre.toLowerCase().includes(recherche.toLowerCase())
    );
  }, [recherche]);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <main className="container mx-auto px-4 py-8">
        <section className="mb-12">
          <div className="relative h-96 rounded-lg overflow-hidden">
            {videoVisible ? (
              <video
                src={technoVidéo}
                className="w-full h-full object-cover"
                controls
                autoPlay
              >
                Votre navigateur ne prend pas en charge la balise vidéo.
              </video>
            ) : (
              <img
                src={techno}
                alt="Réunion Interstellaire"
                className="w-full h-full object-cover"
              />
            )}
            <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center p-8">
              <h1 className="text-4xl font-bold mb-4">Réunion Interstellaire</h1>
              <p className="text-lg mb-6">
                Notre temps sur Terre touche à sa fin. Une équipe mystérieuse entreprend la mission la plus importante de l'histoire de l'humanité : voyager au-delà de notre galaxie pour voir si l'humanité a un avenir parmi les étoiles.
              </p>
              <button 
                className="w-64 bg-red-600 hover:bg-red-700 text-white py-3 px-6 rounded-full flex items-center justify-center transition duration-300 ease-in-out transform hover:scale-105 shadow-lg"
                onClick={() => setVideoVisible(!videoVisible)}
              >
                {videoVisible ? (
                  <>
                    <Play className="mr-2 h-5 w-5" /> Masquer la bande-annonce
                  </>
                ) : (
                  <>
                    <Play className="mr-2 h-5 w-5" /> Regarder la bande-annonce
                  </>
                )}
              </button>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <div className="flex flex-wrap gap-4 mb-8">
            <select
              className="bg-gray-800 text-white p-2 rounded"
              onChange={(e) => setDateSelectionnee(e.target.value)}
              value={dateSelectionnee}
            >
              <option value="">Choisir une date</option>
              <option value="lun">Lundi</option>
              <option value="mar">Mardi</option>
              <option value="mer">Mercredi</option>
            </select>
            <select
              className="bg-gray-800 text-white p-2 rounded"
              onChange={(e) => setHeureSelectionnee(e.target.value)}
              value={heureSelectionnee}
            >
              <option value="">Choisir une heure</option>
              <option value="15:00">15:00</option>
              <option value="17:00">17:00</option>
              <option value="19:00">19:00</option>
              <option value="21:00">21:00</option>
            </select>
          </div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Tous les films</h2>
            <div className="relative">
              <input
                type="text"
                placeholder="Rechercher des films..."
                className="bg-gray-800 text-white p-2 pr-10 rounded w-64"
                value={recherche}
                onChange={(e) => setRecherche(e.target.value)}
              />
              <svg
                className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </div>
          </div>
          {filmsFiltrés().length > 0 ? (
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {filmsFiltrés().map((film) => (
                <div key={film.id} className="bg-gray-800 rounded-lg overflow-hidden">
                  <div className="p-4">
                    <img src={film.image} alt={film.titre} className="w-full h-64 object-cover rounded-lg mb-4" />
                    <h3 className="text-lg font-semibold mb-2">{film.titre}</h3>
                    <div className="flex flex-wrap gap-2">
                      {film.horaires.map((heure, index) => (
                        <button key={index} className="bg-gray-700 hover:bg-gray-600 text-white py-1 px-2 rounded text-sm">
                          {heure}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              className="text-center py-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-xl text-gray-400">Aucun film ne correspond à votre recherche.</p>
            </motion.div>
          )}
        </section>
      </main>
      <Footer/>
    </div>
  );
}