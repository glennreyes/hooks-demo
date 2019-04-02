import styled from 'styled-components';

const Dimensions = styled.div`
  color: ${p => (p.theme.darkMode ? '#fff' : '#000')};
  position: fixed;
  font-size: ${p => (p.big ? '100px' : '32px')};
  font-weight: bold;
  letter-spacing: 4px;
  opacity: ${p => (p.show ? 0.25 : 0)};
  pointer-events: none;
  top: ${p => (p.centered ? 'auto' : '16px')};
  transform: ${p => (p.show ? 'none' : 'scaleY(.5)')};
  transition: 0.2s;
  z-index: 10;
`;

export default Dimensions;
