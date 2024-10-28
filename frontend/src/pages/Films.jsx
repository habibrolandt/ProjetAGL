import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import Footer from '../components/Footer';
import axios from 'axios';
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
  { id: 1, titre: "Film Joker", image: joker },
  { id: 2, titre: "Films", image: calla },
  { id: 3, titre: "Films Cargo", image: Cargo },
  { id: 4, titre: "Films Fast and Furious", image: Fast },
  { id: 5, titre: "Films GLASS", image: glass },
  { id: 6, titre: "Films SICARIO", image: sicario },
  { id: 7, titre: "Films HIDDEN FIGURES", image: hidden },
  { id: 8, titre: "Films Jumanji", image: jumanji },
  { id: 9, titre: "Films Ghosted", image: ghosted },
  { id: 10, titre: "Films RED NOTICE", image: red },
  { id: 11, titre: "Films SIDEMEN BECOME FARMERS", image: sidemen },
  { id: 12, titre: "Films Divergente", image: divergente },
];

const salles = ["Salle 1", "Salle 2", "Salle 3", "Salle 4", "Salle 5"];
const jours = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];

export default function Films() {
  const [jourSelectionne, setJourSelectionne] = useState('');
  const [heureSelectionnee, setHeureSelectionnee] = useState('');
  const [salleSelectionnee, setSalleSelectionnee] = useState('');
  const [videoVisible, setVideoVisible] = useState(false);
  const [recherche, setRecherche] = useState('');
  const [plannings, setPlannings] = useState([]);

  useEffect(() => {
    const hash = window.location.hash;
    if (hash === '#aide') {
      const footer = document.getElementById('footer');
      if (footer) {
        footer.scrollIntoView({ behavior: 'smooth' });
      }
    }
    fetchPlannings();
  }, []);

  const fetchPlannings = async () => {
    try {
      const response = await axios.get('http://192.168.84.154:5000/api/plannings');
      setPlannings(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des plannings:', error);
    }
  };

  const filmsFiltrés = useCallback(() => {
    return films.filter(film => {
      const planningsFilm = plannings.filter(p => p.film === film.titre);
      
      const matchRecherche = film.titre.toLowerCase().includes(recherche.toLowerCase());
      const matchJour = !jourSelectionne || planningsFilm.some(p => new Date(p.date).getDay() === jours.indexOf(jourSelectionne));
      const matchHeure = !heureSelectionnee || planningsFilm.some(p => p.heure === heureSelectionnee);
      const matchSalle = !salleSelectionnee || planningsFilm.some(p => p.salle === salleSelectionnee);

      return matchRecherche && matchJour && matchHeure && matchSalle;
    });
  }, [recherche, jourSelectionne, heureSelectionnee, salleSelectionnee, plannings]);

  const getPlanning = (filmId) => {
    return plannings.filter(planning => {
      const filmTitre = films.find(f => f.id === filmId)?.titre;
      const matchJour = !jourSelectionne || new Date(planning.date).getDay() === jours.indexOf(jourSelectionne);
      const matchHeure = !heureSelectionnee || planning.heure === heureSelectionnee;
      const matchSalle = !salleSelectionnee || planning.salle === salleSelectionnee;
      return planning.film === filmTitre && matchJour && matchHeure && matchSalle;
    });
  };

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
              onChange={(e) => setJourSelectionne(e.target.value)}
              value={jourSelectionne}
            >
              <option value="">Choisir un jour</option>
              {jours.map((jour) => (
                <option key={jour} value={jour}>{jour}</option>
              ))}
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
            <select
              className="bg-gray-800 text-white p-2 rounded"
              onChange={(e) => setSalleSelectionnee(e.target.value)}
              value={salleSelectionnee}
            >
              <option value="">Choisir une salle</option>
              {salles.map((salle) => (
                <option key={salle} value={salle}>{salle}</option>
              ))}
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
                      {getPlanning(film.id).map((planning, index) => (
                        <div key={index} className="bg-gray-700 text-white py-1 px-2 rounded text-sm">
                          {jours[new Date(planning.date).getDay()]} - {planning.heure} - {planning.salle}
                        </div>
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
              <p className="text-xl text-gray-400">
                Aucun film ne correspond à votre recherche ou aux critères sélectionnés.
              </p>
            </motion.div>
          )}
        </section>
      </main>
      <Footer/>
    </div>
  );
}