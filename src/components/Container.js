import styled from 'styled-components';

const Container = styled.div`
  background: ${p =>
    p.theme.darkMode ? '#011338' : '#f9f9f9'};
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  margin: 0;
  transition: 0.8s;
`;

export default Container;
