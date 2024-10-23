import React from 'react'

export default function MovieCard({ movie, onWatch }) {
  return (
    <div className="flex-shrink-0 w-64 m-2 bg-white rounded-lg shadow-lg overflow-hidden">
      <img src={movie.image} alt={movie.title} className="w-full h-40 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{movie.title}</h3>
        <button
          onClick={onWatch}
          className="bg-red-600 text-white py-1 px-4 rounded-full hover:bg-red-700 transition duration-300"
        >
          Information
        </button>
      </div>
    </div>
  )
}