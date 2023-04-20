import React from 'react';
import './App.css';
import { useToggle } from './useToggle';
import Demo from './Task1_useFetch';

function App() {
  const [toggle, setToggle] = useToggle()
  return (
    <div className="App">
      <header className="App-header">
      <p>Result School home work. React 2th week</p>
      </header>
      <Demo />
    </div>
  );
}

export default App;
