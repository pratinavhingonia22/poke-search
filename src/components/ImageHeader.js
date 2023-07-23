
import React from 'react';
import '../styles/ImageHeader.css'; 
import pokemonLogo from '../images/logo.png'; 

const ImageHeader = () => {
  return (
    <div className="header">
      <img src={pokemonLogo} alt="Pokemon Logo" className="logo" />
    </div>
  );
};

export default ImageHeader;
