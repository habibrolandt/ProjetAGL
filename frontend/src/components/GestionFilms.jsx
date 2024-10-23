import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function GestionFilms() {
  const [films, setFilms] = useState([]);
  const [newFilm, setNewFilm] = useState({ titre: '', description: '', realisateur: '', producteur: '', image: null });
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchFilms();
  }, []);

  const fetchFilms = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/films');
      setFilms(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des films:', error);
      setMessage('Erreur lors de la récupération des films');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewFilm(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setNewFilm(prev => ({ ...prev, image: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (const key in newFilm) {
      formData.append(key, newFilm[key]);
    }

    try {
      await axios.post('http://localhost:5000/api/films', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true
      });
      setMessage('Film ajouté avec succès');
      setNewFilm({ titre: '', description: '', realisateur: '', producteur: '', image: null });
      fetchFilms();
    } catch (error) {
      console.error('Erreur lors de l\'ajout du film:', error);
      setMessage('Erreur lors de l\'ajout du film');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/films/${id}`, { withCredentials: true });
      setMessage('Film supprimé avec succès');
      fetchFilms();
    } catch (error) {
      console.error('Erreur lors de la suppression du film:', error);
      setMessage('Erreur lors de la suppression du film');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Gestion des Films</h2>
      
      <form onSubmit={handleSubmit} className="mb-8 space-y-4">
        <input
          type="text"
          name="titre"
          value={newFilm.titre}
          onChange={handleInputChange}
          placeholder="Titre du film"
          className="w-full p-2 border rounded"
          required
        />
        <textarea
          name="description"
          value={newFilm.description}
          onChange={handleInputChange}
          placeholder="Description du film"
          className="w-full p-2 border rounded"
          required
        ></textarea>
        <input
          type="text"
          name="realisateur"
          value={newFilm.realisateur}
          onChange={handleInputChange}
          placeholder="Réalisateur"
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="producteur"
          value={newFilm.producteur}
          onChange={handleInputChange}
          placeholder="Producteur"
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="file"
          name="image"
          onChange={handleImageChange}
          className="w-full p-2 border rounded"
          required
        />
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
          Ajouter un film
        </button>
      </form>

      {message && <p className="my-4 text-center font-bold">{message}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {films.map(film => (
          <div key={film._id} className="border rounded p-4">
            <h3 className="font-bold">{film.titre}</h3>
            <p>{film.description}</p>
            <p>Réalisateur: {film.realisateur}</p>
            <p>Producteur: {film.producteur}</p>
            {film.image && <img src={`http://localhost:5000/${film.image}`} alt={film.titre} className="mt-2 w-full h-40 object-cover" />}
            <button
              onClick={() => handleDelete(film._id)}
              className="mt-2 bg-red-500 text-white p-2 rounded hover:bg-red-600"
            >
              Supprimer
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}