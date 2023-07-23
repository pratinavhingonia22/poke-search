import React, { useEffect, useState } from 'react';
import { fetchPokemonDetails } from '../data/api';
import '../styles/PokemonCard.css'; // Import the CSS file for styles

const PokemonCard = ({ url }) => {
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    const loadPokemonDetails = async () => {
      try {
        const data = await fetchPokemonDetails(url);
        setPokemon(data);
      } catch (error) {
        console.error('Error fetching pokemon details:', error);
      }
    };
    loadPokemonDetails();
  }, [url]);

  const renderPokemonDetails = () => {
    if (!pokemon) {
      return <div>Loading...</div>;
    }

    const { name, sprites, stats, types } = pokemon;
    const attack = getStatValue(stats, 'attack');
    const hp = getStatValue(stats, 'hp');
    const defense = getStatValue(stats, 'defense');
    const type = types.map((type) => type.type.name).join(", ");

    return (
      <div className="pokemon-card">
        <h3 id='name'>{name.toUpperCase()}</h3>
        <img src={getSpriteUrl(sprites)} alt={name} />
        <p><strong>Attack</strong>: {attack}</p>
        <p><strong>HP</strong>: {hp}</p>
        <p><strong>Defense</strong>: {defense}</p>
        <p><strong>Type</strong>: {type}</p>
      </div>
    );
  };

  const getStatValue = (stats, statName) => {
    const stat = stats.find((stat) => stat.stat.name === statName);
    return stat ? stat.base_stat : 0;
  };

  const getSpriteUrl = (sprites) => {
    return sprites?.other?.dream_world.front_default || sprites?.front_default || '';
  };

  return renderPokemonDetails();
};

export default PokemonCard;
