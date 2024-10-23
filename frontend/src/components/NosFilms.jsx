import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import MovieCard from './MovieCard'
import Modal from './Modal'
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

const movies = [
  { 
    id: 1, 
    title: "Film Joker", 
    image: joker, 
    description: "Un voyage dans le cœur historique de Tunis.", 
    director: "Todd Phillips", 
    producer: "Bradley Cooper" 
  },
  { 
    id: 2, 
    title: "Films Calla", 
    image: calla, 
    description: "", 
    director: "Sara Smith", 
    producer: "John Doe" 
  },
  { 
    id: 3, 
    title: "Films Cargo", 
    image: Cargo, 
    description: "", 
    director: "James Gray", 
    producer: "David Heyman" 
  },
  { 
    id: 4, 
    title: "Films Fast and Furious", 
    image: Fast, 
    description: "Plongez dans l'histoire de l'ancienne cité de Carthage.", 
    director: "Justin Lin", 
    producer: "Neal H. Moritz" 
  },
  { 
    id: 5, 
    title: "Films GLASS", 
    image: glass, 
    description: "Un festin pour les yeux et les papilles.", 
    director: "M. Night Shyamalan", 
    producer: "Jason Blum" 
  },
  { 
    id: 6, 
    title: "Films SICARIO", 
    image: sicario, 
    description: "Les secrets des artisans tunisiens.", 
    director: "Denis Villeneuve", 
    producer: "Basil Iwanyk" 
  },
  { 
    id: 7, 
    title: "Films HIDDEN FIGURES", 
    image: hidden, 
    description: "Découvrez la beauté verdoyante des oasis tunisiennes.", 
    director: "Theodore Melfi", 
    producer: "Donna Gigliotti" 
  },
  { 
    id: 8, 
    title: "Films Jumanji", 
    image: jumanji, 
    description: "Promenade dans le village bleu et blanc emblématique.", 
    director: "Jake Kasdan", 
    producer: "Matt Tolmach" 
  },
  { 
    id: 9, 
    title: "Films Ghosted", 
    image: ghosted, 
    description: "Plongez dans l'ambiance du célèbre festival culturel.", 
    director: "Dexter Fletcher", 
    producer: "David Ellison" 
  },
  { 
    id: 10, 
    title: "Films RED NOTICE", 
    image: red, 
    description: "Explorez les greniers fortifiés du sud tunisien.", 
    director: "Rawson Marshall Thurber", 
    producer: "Dwayne Johnson" 
  },
  { 
    id: 11, 
    title: "Films SIDEMEN BECOME FARMERS", 
    image: sidemen, 
    description: "Un voyage sonore à travers les traditions musicales.", 
    director: "Ethan Payne", 
    producer: "Joshua Bradley" 
  },
  { 
    id: 12, 
    title: "Films Divergente", 
    image: divergente, 
    description: "L'importance de l'olivier dans la culture tunisienne.", 
    director: "Neil Burger", 
    producer: "Lucy Fisher" 
  }
]

export default function NosFilms() {
  const navigate = useNavigate();
  const [selectedMovie, setSelectedMovie] = useState(null)
  const [showAll, setShowAll] = useState(false)
  const carouselRef = useRef(null)
  const [isScrolling, setIsScrolling] = useState(true)

  useEffect(() => {
    const carousel = carouselRef.current
    let scrollInterval

    const startScroll = () => {
      scrollInterval = setInterval(() => {
        if (carousel && isScrolling) {
          if (carousel.scrollLeft >= carousel.scrollWidth - carousel.clientWidth) {
            carousel.scrollLeft = 0
          } else {
            carousel.scrollLeft += 1
          }
        }
      }, 30)
    }

    const stopScroll = () => {
      clearInterval(scrollInterval)
    }

    if (isScrolling && !showAll) {
      startScroll()
    }

    return () => {
      stopScroll()
    }
  }, [isScrolling, showAll])

  const closeModal = () => {
    setSelectedMovie(null)
  }

  const toggleView = () => {
    setShowAll(!showAll)
    setIsScrolling(!showAll)
  }

  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 relative inline-block">
          Nos Films
          <span className="absolute bottom-0 left-0 w-full h-1 bg-red-600"></span>
        </h2>
        
        {!showAll && (
          <div 
            ref={carouselRef}
            className="flex overflow-x-hidden mb-8"
            style={{ scrollBehavior: 'smooth' }}
          >
            {movies.map((movie) => (
              <MovieCard 
                key={movie.id} 
                movie={movie} 
                onWatch={() => setSelectedMovie(movie)}
              />
            ))}
          </div>
        )}

        <AnimatePresence>
          {showAll && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
            >
              {movies.map((movie) => (
                <MovieCard 
                  key={movie.id} 
                  movie={movie} 
                  onWatch={() => setSelectedMovie(movie)}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="text-center mt-8">
          <button
            onClick={toggleView}
            className="bg-blue-600 text-white py-2 px-6 rounded-full hover:bg-blue-700 transition duration-300"
          >
            {showAll ? "Réduire" : "Voir tous"}
          </button>
        </div>

        {selectedMovie && (
          <Modal closeModal={closeModal}>
            <div className="p-6">
              <h3 className="text-2xl font-bold mb-4">{selectedMovie.title}</h3>
              <img src={selectedMovie.image} alt={selectedMovie.title} className="w-full h-64 object-cover rounded-lg mb-4" />
              <p className="text-gray-600 mb-4">{selectedMovie.description}</p>
              <p className="text-gray-600 mb-4"><strong>Réalisateur: </strong>{selectedMovie.director}</p>
              <p className="text-gray-600 mb-4"><strong>Producteur: </strong>{selectedMovie.producer}</p>
              <button 
                className="bg-red-600 text-white py-2 px-6 rounded-full hover:bg-red-700 transition duration-300"
                onClick={() => {
                  closeModal();
                  navigate('/planning');
                }}
              >
                Consulter Planning
              </button>
            </div>
          </Modal>
        )}
      </div>
    </section>
  )
}
