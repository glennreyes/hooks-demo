import styled from 'styled-components';

const Input = styled.input`
  color: ${p => (p.theme.darkMode ? '#fff' : '#000')};
  border-bottom: 2px solid #eee;
  flex: 1;
  font-size: 16px;
  font-weight: bold;
  transition: 0.8s;
`;

export default Input;
