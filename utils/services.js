import axios from "axios";

const baseUrl = 'https://sw-api.starnavi.io';

export const fetchPeople = async (page) => {
  const response = await axios.get(`${baseUrl}/people/?format=json&page=${page}`);
  return response.data;
};

export const fetchCharacter = async (characterId) => {
  const response = await axios.get(`${baseUrl}/people/${characterId}`);
  return response.data;
};

export const fetchFilms = async (character) => {
  const filmPromises = character.films.map((filmId) => axios.get(`${baseUrl}/films/${filmId}/`));
  return await Promise.all(filmPromises);
};

export const fetchCharacterStarships = async (character) => {
  const characterStarshipPromises = character.starships.map((starshipId) => axios.get(`${baseUrl}/starships/${starshipId}/`));
  return await Promise.all(characterStarshipPromises);
};
