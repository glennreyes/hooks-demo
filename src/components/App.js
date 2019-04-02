import React from 'react';
import { ThemeProvider } from 'styled-components';
import Container from './Container';
import ThemeSwitch from './ThemeSwitch';
import Dimensions from './Dimensions';

const App = () => {
  const size = { width: 0, height: 0 };
  const hidden = false;
  const { darkMode, toggleDarkMode } = {
    darkMode: false,
    toggleDarkMode: () => {}
  };

  return (
    <ThemeProvider theme={{ darkMode }}>
      <Container>
        <ThemeSwitch onClick={toggleDarkMode} />
        <Dimensions centered big show={!hidden}>
          {size.width}x{size.height}
        </Dimensions>
      </Container>
    </ThemeProvider>
  );
};

export default App;
