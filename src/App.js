// App.js

import React from 'react';
import './App.css'; // Import the CSS file for styles
import PokemonList from './components/PokemonList';
import ImageHeader from "./components/ImageHeader";
import './fonts/fonts.css';

const App = () => {
  return (
    <div className="app-container">
     <ImageHeader/>
      <PokemonList />
    </div>
  );
};

export default App;
