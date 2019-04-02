import styled from 'styled-components';

const Title = styled.h1`
  border-bottom: 2px solid;
  border-color: ${p => (p.theme.darkMode ? '#2959bb' : '#eee')};
  color: ${p => (p.theme.darkMode ? '#999' : '#333')};
  font-size: 36px;
  font-weight: 900;
  padding: 0 0 16px;
  margin: 0 0 32px 32px;
  transition: 0.8s;
`;

export default Title;
