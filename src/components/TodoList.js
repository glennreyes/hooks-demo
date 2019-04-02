import React from 'react';
import Tilt from 'react-tilt';
import styled from 'styled-components';
import Title from './Title';

const Container = styled(Tilt).attrs({
  options: { max: 10, scale: 1 }
})`
  background: ${p =>
    p.theme.darkMode ? '#112348' : '#fff'};
  border-radius: 16px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  max-width: 360px;
  padding: 32px 0;
  transition: 0.8s;
`;

const TodoList = ({ children, title, ...props }) => (
  <Container {...props}>
    <Title>{title}</Title>
    {children}
  </Container>
);

export default TodoList;
