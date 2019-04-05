import React from 'react';
import { ThemeProvider } from 'styled-components';
import Container from './Container';
import ThemeSwitch from './ThemeSwitch';
import Dimensions from './Dimensions';

const App = () => {
  const darkMode = false; // ???
  const toggleDarkMode = () => {}; // ???

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
