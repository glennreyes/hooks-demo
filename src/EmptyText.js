import styled from 'styled-components';

const EmptyText = styled.p`
  color: ${p => (p.theme.darkMode ? '#666' : '#bbb')};
  font-weight: bold;
  margin: 0 32px;
  transition: 0.8s;
`;

export default EmptyText;
