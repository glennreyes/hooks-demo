import { useEffect, useReducer, useState } from 'react';

// Sets the state to back to false after a given time
export const useHidden = (timeout = 5000, dependencies) => {
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

// Returns window sizes
export const useWindowSize = () => {
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

    return () =>
      window.removeEventListener('resize', handleResize);
  }, []);

  return size;
};

// Util for dark mode
export const useDarkMode = (initialState = false) => {
  const [darkMode, setDarkMode] = useLocalStorage(
    'darkMode',
    initialState
  );
  const toggleDarkMode = () => {
    setDarkMode(darkMode => !darkMode);
  };

  return { darkMode, toggleDarkMode };
};

// Custom hook to perist data to local storage
export const useLocalStorage = (key, initialState) => {
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
        typeof value === 'function'
          ? value(storedValue)
          : value;
      setStoredValue(valueToStore);
      localStorage.setItem(
        key,
        JSON.stringify(valueToStore)
      );
    } catch (error) {
      console.log(error);
    }
  };
  return [storedValue, setValue];
};

// Custom hook for todo lists
export const useTodo = (initialState = []) => {
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
          {
            text: action.text,
            id: Date.now()
          }
        ];
      case 'REMOVE':
        return state.filter(todo => todo.id !== action.id);
      case 'TOGGLE':
        return state.map(todo =>
          todo.id === action.id
            ? { ...todo, completed: !todo.completed }
            : todo
        );
      default:
        return state;
    }
  }, storedValue);

  useEffect(() => {
    setStoredValue(todos);
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
