import React, { useRef } from 'react';
import { ThemeProvider } from 'styled-components';
import { useWindowSize, useHidden, useDarkMode, useTodo } from '../hooks';
import Container from './Container';
import ThemeSwitch from './ThemeSwitch';
import Dimensions from './Dimensions';
import EmptyText from './EmptyText';
import TodoList from './TodoList';
import TodoItem from './TodoItem';
import Form from './Form';
import Input from './Input';
import AddButton from './AddButton';

const App = () => {
  const size = useWindowSize();
  const hidden = useHidden(5000, [size.width, size.height]);
  const { darkMode, toggleDarkMode } = useDarkMode();
  const { todos, text, setText, add, remove, toggle } = useTodo();
  const inputElement = useRef(null);

  return (
    <ThemeProvider theme={{ darkMode }}>
      <Container>
        <ThemeSwitch onClick={toggleDarkMode} />
        <Dimensions show={!hidden}>
          {size.width}x{size.height}
        </Dimensions>
        <TodoList title="My tasks">
          {todos.length > 0 ? (
            todos.map(todo => (
              <TodoItem
                key={todo.id}
                completed={todo.completed}
                onClick={() => toggle(todo.id)}
                onClickRemove={() => remove(todo.id)}
              >
                {todo.text}
              </TodoItem>
            ))
          ) : (
            <EmptyText>Nothing there.</EmptyText>
          )}
          <Form
            onSubmit={event => {
              event.preventDefault();
              add(text);
            }}
            indent={todos.length > 0}
          >
            <Input
              ref={inputElement}
              type="text"
              value={text}
              onChange={event => setText(event.target.value)}
            />
            <AddButton
              onClick={() => {
                inputElement.current.focus();
              }}
            />
          </Form>
        </TodoList>
      </Container>
    </ThemeProvider>
  );
};

export default App;
