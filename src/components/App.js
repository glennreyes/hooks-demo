import React from 'react';
import { ThemeProvider } from 'styled-components';
import Container from './Container';
import ThemeSwitch from './ThemeSwitch';
import Dimensions from './Dimensions';
import { useDarkMode, useWindowSize } from '../hooks';

const App = () => {
  const { darkMode, toggleDarkMode } = useDarkMode(false);
  const size = useWindowSize();

  // ???
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
