import React from 'react'
import AProposDeNous from '../components/AProposDeNous'
import Footer from '../components/Footer'
import image1 from '../assets/Ressources/image1.jpg'
import NosFilms from '../components/NosFilms'


export default function Accueil() {
  return (
    <div className="w-full">
      <div className="relative">
        <img
          src={image1}
          alt="Header"
          className="w-full h-[70vh] object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl font-bold mb-4">Bienvenue sur notre plateforme Doc-Tunis</h1>
            <p className="text-xl">Découvrez notre sélection de films documentaires sur la Tunisie.</p>
          </div>
        </div>
      </div>
      <AProposDeNous />
      <NosFilms />
      <Footer />
    </div>
  )
}