import React, { useState } from 'react';


const ThemeToggle = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  return (
    <div className={isDarkTheme ? 'dark-theme' : ''}>
      <h1>Theme Toggle Example</h1>
      <button onClick={toggleTheme}>
        Toggle Theme
      </button>
      <div className="rest-component">
        <p>This is the rest component.</p>
      </div>
    </div>
  );
};

export default ThemeToggle;
