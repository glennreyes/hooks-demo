import React, { useEffect, useState } from 'react';
import { ThemeProvider } from 'styled-components';
import Container from './Container';
import ThemeSwitch from './ThemeSwitch';
import Dimensions from './Dimensions';

const useWindowSize = () => {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  const handleResize = () =>
    setSize({
      width: window.innerWidth,
      height: window.innerHeight
    });

  useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () =>
      window.removeEventListener('resize', handleResize);
  }, []);

  return size;
};

const App = () => {
  const size = useWindowSize();

  const { darkMode, toggleDarkMode } = {
    darkMode: false,
    toggleDarkMode: () => {}
  };
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
