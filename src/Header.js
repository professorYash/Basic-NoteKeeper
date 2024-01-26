import React, { useState } from "react";
import { FaSun, FaMoon } from 'react-icons/fa';

function Header({ onToggleDarkMode }) {
  const [isDarkMode, setIsDarkMode] = useState(true);
  
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    onToggleDarkMode(isDarkMode);
  };

  return (
    <header>
      <h1>Thoughts-Keeper</h1>
      <div className="button-container">
        <button onClick={toggleDarkMode} className={`toggle-button ${isDarkMode ? 'dark' : 'light'}`}>
          {isDarkMode ? <FaMoon size={20} /> : <FaSun size={20} />}
        </button>
      </div>
    </header>
  );
}

export default Header;
