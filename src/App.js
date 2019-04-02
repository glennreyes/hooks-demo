import React, { useEffect, useReducer, useState } from 'react';
import { ThemeProvider } from 'styled-components';
import Container from './Container';
import ThemeSwitch from './ThemeSwitch';
import Dimensions from './Dimensions';
import TodoList from './TodoList';
import TodoItem from './TodoItem';
import Form from './Form';
import Input from './Input';
import AddButton from './AddButton';

const useHidden = (timeout = 5000, dependencies) => {
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    setHidden(false);

    const t = setTimeout(() => {
      setHidden(true);
    }, timeout);

    return () => clearTimeout(t);
  }, dependencies);

  return hidden;
};

const useWindowSize = () => {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  const handleResize = () =>
    setSize({
      width: window.innerWidth,
      height: window.innerHeight
    });

  useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return size;
};

const useLocalStorage = (key, initialState) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialState;
    } catch (error) {
      console.log(error);
      return initialState;
    }
  });
  const setValue = value => {
    try {
      const valueToStore =
        typeof value === 'function' ? value(storedValue) : value;
      setStoredValue(valueToStore);
      localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.log(error);
    }
  };
  return [storedValue, setValue];
};

const useTodo = (initialState = []) => {
  const [text, setText] = useState('');
  const [storedValue, setStoredValue] = useLocalStorage('todos', initialState);
  const [todos, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case 'ADD':
        return [
          ...state,
          {
            text: action.text,
            id: Date.now()
          }
        ];
      case 'REMOVE':
        return state.filter(todo => todo.id !== action.id);
      case 'TOGGLE':
        return state.map(todo =>
          todo.id === action.id ? { ...todo, completed: !todo.completed } : todo
        );
      default:
        return state;
    }
  }, storedValue);

  useEffect(() => {
    if (todos.length) {
      setStoredValue(todos);
    }
  }, [todos]);

  const add = () => {
    if (text) {
      dispatch({ type: 'ADD', text });
      setText('');
    }
  };

  const remove = id => {
    dispatch({ type: 'REMOVE', id });
  };

  const toggle = id => {
    dispatch({ type: 'TOGGLE', id });
  };

  return {
    todos,
    text,
    setText,
    add,
    remove,
    toggle
  };
};

const useDarkMode = (initialState = false) => {
  const [darkMode, setDarkMode] = useLocalStorage('darkMode', initialState);
  const toggleDarkMode = () => {
    setDarkMode(darkMode => !darkMode);
  };

  return { darkMode, toggleDarkMode };
};

const App = () => {
  const size = useWindowSize();
  const hidden = useHidden(5000, [size.width, size.height]);
  const { darkMode, toggleDarkMode } = useDarkMode();
  const { todos, text, setText, add, remove, toggle } = useTodo();

  return (
    <ThemeProvider theme={{ darkMode }}>
      <Container>
        <ThemeSwitch onClick={toggleDarkMode} />
        <Dimensions show={!hidden}>
          {size.width}x{size.height}
        </Dimensions>
        <TodoList title="My tasks">
          {todos.map(todo => (
            <TodoItem
              key={todo.id}
              completed={todo.completed}
              onClick={() => toggle(todo.id)}
              onClickRemove={() => remove(todo.id)}
            >
              {todo.text}
            </TodoItem>
          ))}
          <Form
            onSubmit={event => {
              event.preventDefault();
              add(text);
            }}
          >
            <Input
              type="text"
              value={text}
              onChange={event => setText(event.target.value)}
            />
            <AddButton />
          </Form>
        </TodoList>
      </Container>
    </ThemeProvider>
  );
};

export default App;
