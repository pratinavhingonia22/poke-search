import React, { useEffect, useState, useMemo } from 'react';
import { fetchAllPokemons } from '../data/api';
import PokemonCard from './PokemonCard';
import Pagination from './Pagination';
import SearchBar from './SearchBar';
import NoPokemonFound from './NoPokemonFound';
import '../styles/PokemonList.css';

const ITEMS_PER_PAGE = 10;

const PokemonList = () => {
  const [pokemons, setPokemons] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        const data = await fetchAllPokemons();
        setPokemons(data.results);
      } catch (error) {
        console.error('Error fetching Pokémon data:', error);
      }
    };

    fetchPokemonData();
  }, []);

  useEffect(() => {
    // When the search term changes, reset to the first page of results
    setCurrentPage(1);
  }, [searchTerm]);

  const handleSearch = (term) => {
    setSearchTerm(term);
    setCurrentPage(1); // Reset to the first page of results when searching
  };

  const filteredPokemons = useMemo(() => {
    if (!searchTerm) {
      return pokemons;
    }
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    return pokemons.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(lowerCaseSearchTerm)
    );
  }, [searchTerm, pokemons]);

  const totalFilteredPages = Math.ceil(filteredPokemons.length / ITEMS_PER_PAGE);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const getCurrentPageResults = () => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return filteredPokemons.slice(startIndex, endIndex);
  };

  return (
    <div className="pokemon-list-container">
      <SearchBar onSearch={handleSearch} />
      {filteredPokemons.length === 0 ? (
        <NoPokemonFound />
      ) : (
        <>
          <div className="pokemon-list">
            {getCurrentPageResults().map((pokemon) => (
              <PokemonCard key={pokemon.name} url={pokemon.url} />
            ))}
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalFilteredPages}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
};

export default PokemonList;
