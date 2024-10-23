import React from 'react'
import image2 from '../assets/Ressources/image2.jpg'


export default function AProposDeNous() {
  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 relative inline-block">
          À propos de Nous
          <span className="absolute bottom-0 left-0 w-full h-1 bg-red-600"></span>
        </h2>
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <img
              src={image2}
              alt="À propos de Doc-Tunis"
              className="rounded-lg shadow-lg"
            />
          </div>
          <div className="md:w-1/2 md:pl-8">
            <p className="text-lg mb-4">
              Doc-Tunis est votre destination de choix pour découvrir des documentaires fascinants sur la Tunisie. Notre passion pour le cinéma documentaire et notre amour pour la culture tunisienne nous poussent à vous offrir une sélection soigneusement curatée de films qui capturent l'essence de ce pays magnifique.
            </p>
            <p className="text-lg mb-4">
              Notre mission est de vous faire voyager à travers la Tunisie, ses paysages époustouflants, son riche patrimoine et ses histoires captivantes, le tout depuis le confort de vo
tre salon. Que vous soyez un passionné de cinéma, un amoureux de la Tunisie ou simplement curieux d'en apprendre davantage, Doc-Tunis est là pour vous offrir une expérience cinématographique unique.
            </p>
            <p className="text-lg">
              Rejoignez-nous dans cette aventure documentaire et laissez-vous emporter par la beauté et la diversité de la Tunisie à travers le regard de cinéastes talentueux.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}