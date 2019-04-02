import styled from 'styled-components';

const Dimensions = styled.div`
  color: #fff;
  position: fixed;
  font-size: 32px;
  font-weight: bold;
  letter-spacing: 4px;
  opacity: ${p => (p.show ? 0.5 : 0)};
  pointer-events: none;
  top: 16px;
  transform: ${p => (p.show ? 'none' : 'scaleY(.5)')};
  transition: 0.2s;
  z-index: 10;
`;

export default Dimensions;
