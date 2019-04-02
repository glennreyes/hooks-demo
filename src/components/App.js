import React, { useEffect, useReducer } from 'react';
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

const useTodo = (initialState = []) => {
  const [text, setText] = useLocalStorage('text', '');
  const [storedValue, setStoredValue] = useLocalStorage(
    'todos',
    initialState
  );
  const [todos, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case 'ADD':
        return [
          ...state,
          { id: Date.now(), text: action.text }
        ];
      case 'REMOVE':
        return state.filter(todo => todo.id !== action.id);

      case 'TOGGLE':
        return state.map(todo =>
          todo.id === action.id
            ? {
                ...todo,
                completed: !todo.completed
              }
            : todo
        );
      default:
        return state;
    }
  }, storedValue);

  useEffect(() => setStoredValue(todos), [todos]);

  const add = text => dispatch({ type: 'ADD', text });
  const remove = id => dispatch({ type: 'REMOVE', id });
  const toggle = id => dispatch({ type: 'TOGGLE', id });

  return { text, setText, todos, add, remove, toggle };
};

const App = () => {
  const { darkMode, toggleDarkMode } = useDarkMode(false);
  const size = useWindowSize();
  const hidden = useHidden(3000, [size.width, size.height]);
  const {
    text,
    setText,
    todos,
    add,
    remove,
    toggle
  } = useTodo();

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
            <AddButton
              onClick={() => {
                add(text);
                setText('');
              }}
            />
          </Form>
        </TodoList>
      </Container>
    </ThemeProvider>
  );
};

export default App;
