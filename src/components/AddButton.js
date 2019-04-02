import React from 'react';
import styled from 'styled-components';
import Container from './Container';

const Button = styled.button`
  background: ${p =>
    p.theme.darkMode ? '#2959bb' : '#000'};
  border-radius: 50%;
  opacity: 0;
  padding: 0;
  position: relative;
  transform: scale(0.9);
  transition: transform 0.2s, opacity 0.2s, background 0.8s;
  width: 48px;
  height: 48px;

  &::before,
  &::after {
    background: #fff;
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 16px;
    height: 1px;
    transform: translate(-50%, -50%);
  }

  &::after {
    transform: translate(-50%, -50%) rotate(90deg);
  }

  ${Container}:hover & {
    opacity: 1;
    transform: none;

    &:hover,
    &:active {
      opacity: 0.75;
      transform: scale(0.9);
    }
  }
`;

const AddButton = props => <Button {...props} />;

export default AddButton;
