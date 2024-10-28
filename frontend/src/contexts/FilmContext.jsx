import React, { createContext, useState, useContext, useEffect } from 'react';

const FilmContext = createContext();

export const FilmProvider = ({ children }) => {
  const [films, setFilms] = useState([]);

  useEffect(() => {
    fetchFilms();
  }, []);

  const fetchFilms = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/films');
      const data = await response.json();
      setFilms(data);
    } catch (error) {
      console.error('Erreur lors de la récupération des films:', error);
    }
  };

  const ajouterFilm = async (formData) => {
    try {
      const response = await fetch('http://localhost:5000/api/films', {
        method: 'POST',
        body: formData,
      });
      if (response.ok) {
        const newFilm = await response.json();
        setFilms((prevFilms) => [...prevFilms, newFilm]);
      }
    } catch (error) {
      console.error("Erreur lors de l'ajout du film:", error);
    }
  };

  const supprimerFilm = async (filmId) => {
    try {
      await fetch(`http://localhost:5000/api/films/${filmId}`, { method: 'DELETE' });
      setFilms((prevFilms) => prevFilms.filter((film) => film._id !== filmId));
    } catch (error) {
      console.error('Erreur lors de la suppression du film:', error);
    }
  };

  const mettreAJourFilm = async (filmId, formData) => {
    try {
      const response = await fetch(`http://localhost:5000/api/films/${filmId}`, {
        method: 'PUT',
        body: formData,
      });
      if (response.ok) {
        const updatedFilm = await response.json();
        setFilms((prevFilms) =>
          prevFilms.map((film) => (film._id === filmId ? updatedFilm : film))
        );
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour du film:', error);
    }
  };

  return (
    <FilmContext.Provider value={{ films, ajouterFilm, supprimerFilm, mettreAJourFilm }}>
      {children}
    </FilmContext.Provider>
  );
};

export const useFilms = () => useContext(FilmContext);
