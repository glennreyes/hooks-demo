import React from 'react';
import { ThemeProvider } from 'styled-components';
import {
  useWindowSize,
  useHidden,
  useDarkMode,
  useLocalStorage
} from '../hooks';
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
  const { darkMode, toggleDarkMode } = useDarkMode(false);
  const size = useWindowSize();
  const hidden = useHidden(1000, [size.width, size.height]);

  const [text, setText] = useLocalStorage('text', '');

  // ???
  const todos = [
    { text: 'Buy milk', id: 1, completed: true },
    { text: 'Get breakfast', id: 2, completed: false },
    {
      text: 'Prepare presentation',
      id: 3,
      completed: false
    }
  ];

  return (
    <ThemeProvider theme={{ darkMode }}>
      <Container>
        <ThemeSwitch onClick={toggleDarkMode} />
        <Dimensions centered big show={!hidden}>
          {size.width}x{size.height}
        </Dimensions>

        <TodoList title="My tasks">
          {todos.length > 0 ? (
            todos.map(todo => (
              <TodoItem
                key={todo.id}
                completed={todo.completed}
                onClick={() => {}}
                onClickRemove={() => {}}
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
            }}
            indent={todos.length > 0}
          >
            <Input
              type="text"
              value={text}
              onChange={event =>
                setText(event.target.value)
              }
            />
            <AddButton onClick={() => {}} />
          </Form>
        </TodoList>
      </Container>
    </ThemeProvider>
  );
};

export default App;
