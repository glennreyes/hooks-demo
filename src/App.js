import React, { useEffect, useReducer, useState } from 'react';

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
    dispatch({ type: 'ADD', text });
    setText('');
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
  const { darkMode, toggleDarkMode } = useDarkMode();
  const { todos, text, setText, add, remove, toggle } = useTodo();

  return (
    <div>
      <label>
        Dark Mode
        <input type="checkbox" onChange={toggleDarkMode} checked={darkMode} />
      </label>
      <p>
        {size.width}x{size.height}
      </p>
      <div>
        {todos.map(todo => (
          <div key={todo.id}>
            <button onClick={() => toggle(todo.id)}>
              {todo.completed ? <strike>{todo.text}</strike> : todo.text}
            </button>
            <button onClick={() => remove(todo.id)}>-</button>
          </div>
        ))}
        <div>
          <input
            type="text"
            value={text}
            onChange={event => setText(event.target.value)}
          />
          <button onClick={() => add(text)}>+</button>
        </div>
      </div>
    </div>
  );
};

export default App;
