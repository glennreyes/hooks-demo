import React from 'react';
import { Check, Moon } from 'react-feather';
import styled from 'styled-components';

const Button = styled.button`
  background: ${p => (p.theme.darkMode ? '#2959bb' : '#f0f0f0')};
  border-radius: 16px;
  height: 32px;
  opacity: 0.75;
  position: fixed;
  top: 16px;
  transition: opacity 0.2s, background 0.8s;
  right: 16px;
  width: 64px;

  &::before {
    background: #fff;
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.25);
    content: '';
    border-radius: 50%;
    display: block;
    margin: 4px;
    height: 24px;
    width: 24px;
    position: relative;
    left: ${p => (p.theme.darkMode ? '50%' : '0')};
    transition: cubic-bezier(0.87, 0.12, 0.08, 0.91) 0.4s;
    z-index: 10;
  }

  &:hover {
    opacity: 1;
  }
`;

const StyledMoon = styled(Moon)`
  color: transparent;
  fill: #999;
  margin: 4px 6px;
  opacity: ${p => (p.theme.darkMode ? 0 : 1)};
  position: absolute;
  top: 0;
  right: 0;
  transform: ${p =>
    p.theme.darkMode
      ? 'scaleY(0.25) scaleX(-.25) rotate(-30deg)'
      : 'scaleY(0.75) scaleX(-.75)'};
  transition: 0.4s;
`;

const StyledCheck = styled(Check)`
  color: #fff;
  margin: 4px 6px;
  opacity: ${p => (p.theme.darkMode ? 1 : 0)};
  position: absolute;
  top: 0;
  left: 0;
  transform: ${p =>
    p.theme.darkMode ? 'scale(0.75)' : 'scaleY(0.5) scaleX(0) rotate(-30deg)'};
  transition: 0.4s;
`;

const ThemeSwitch = props => (
  <Button {...props}>
    <StyledMoon />
    <StyledCheck />
  </Button>
);

export default ThemeSwitch;
