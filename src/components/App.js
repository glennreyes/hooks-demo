import React, { useState, useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import Container from './Container';
import ThemeSwitch from './ThemeSwitch';
import Dimensions from './Dimensions';
import { useDarkMode, useWindowSize } from '../hooks';

const useHidden = (timeout = 1000, dependencies) => {
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    setHidden(false);
    const t = setTimeout(() => setHidden(true), timeout);

    return () => clearTimeout(t);
  }, dependencies);

  return hidden;
};

const App = () => {
  const { darkMode, toggleDarkMode } = useDarkMode(false);
  const size = useWindowSize();
  const hidden = useHidden(2000, [size.width, size.height]);

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
