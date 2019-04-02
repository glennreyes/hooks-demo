import React, { useEffect, useState } from 'react';
import { ThemeProvider } from 'styled-components';
import Container from './Container';
import ThemeSwitch from './ThemeSwitch';
import Dimensions from './Dimensions';

const useDarkMode = initialState => {
  const [darkMode, setDarkMode] = useState(initialState);
  const toggleDarkMode = () => setDarkMode(state => !state);

  return { darkMode, toggleDarkMode };
};

const App = () => {
  const { darkMode, toggleDarkMode } = useDarkMode(true);
  const size = { width: 0, height: 0 };
  const hidden = false;

  return (
    <ThemeProvider theme={{ darkMode }}>
      <Container>
        <Dimensions centered big show={!hidden}>
          {size.width}x{size.height}
        </Dimensions>
        <ThemeSwitch onClick={toggleDarkMode} />
      </Container>
    </ThemeProvider>
  );
};

export default App;
