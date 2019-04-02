import React from 'react';
import {
  Circle,
  CheckCircle,
  MinusCircle
} from 'react-feather';
import styled, { css } from 'styled-components';

const Item = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  overflow: hidden;
  padding: 0 32px;
  position: relative;

  &::before {
    background: linear-gradient(to right, transparent, rgba(0, 0, 0, 0.25));
    bottom: 0;
    content: '';
    display: block;
    left: 0;
    opacity: ${p => (p.theme.darkMode ? 1 : 0.1)}
    pointer-events: none;
    position: absolute;
    right: 0;
    top: 0;
    transition: 0.8s;
    transform: ${p =>
      p.completed ? 'none' : 'translateX(100%)'};
  }
`;
const Text = styled.span`
  color: ${p =>
    p.completed
      ? p.theme.darkMode
        ? '#19af88'
        : '#8af397'
      : p.theme.darkMode
      ? '#fff'
      : '#000'}
  display: block;
  flex: 1;
  padding: 16px;
  position: relative;
  transition: color .8s;

  ${p =>
    !p.completed &&
    css`
      &:hover {
        color: ${p => (p.theme.darkMode ? '#999' : '#666')};
      }
    `}
`;

const Button = styled.button`
  align-items: center;
  display: flex;
  flex: 1;
  font-size: 16px;
  font-weight: bold;
  padding: 0;
  text-align: left;
`;

const StyledCheckCircle = styled(CheckCircle)`
  color: ${p => (p.theme.darkMode ? '#19af88' : '#8af397')};
  transform: scale(0.9);
  transition: 0.2s;
`;

const StyledCircle = styled(Circle)`
  color: ${p => (p.theme.darkMode ? '#2959bb' : '#ddd')};
  transition: color 0.8s, transform 0.2s;

  ${Item}:hover & {
    transform: scale(0.9);
  }
`;

const Checkbox = ({ checked }) =>
  checked ? <StyledCheckCircle /> : <StyledCircle />;

const RemoveButton = styled.button`
  color: ${p => (p.theme.darkMode ? '#e4b4e6' : '#ef708d')};
  opacity: 0;
  transition: 0.2s;
  transform: translateX(8px);

  ${Item}:hover & {
    opacity: 0.5;
    transform: none;

    &:hover {
      opacity: 1;
      transform: scale(0.9);
    }
  }
`;

const TodoItem = ({
  completed,
  onClick,
  onClickRemove,
  ...props
}) => (
  <Item completed={completed}>
    <Button onClick={onClick}>
      <Checkbox checked={completed} />
      <Text completed={completed} {...props} />
    </Button>
    <RemoveButton onClick={onClickRemove}>
      <MinusCircle />
    </RemoveButton>
  </Item>
);

export default TodoItem;
