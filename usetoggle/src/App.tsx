import React from 'react';
import './App.css';
import { useToggle } from './useToggle';

// interface IsetState {
//   (value: boolean): void
// }

function App() {
  const [state, setState] = useToggle(false)
  return (
    <div className="App">
      <header className="App-header">
        <p>
          {state.toString()}
        </p>
        <button onClick={() => setState()}>Toggle</button>
        <button onClick={() => setState(true)}>Set True</button>
        <button onClick={() => setState(false)}>Set False</button>
      </header>
    </div>
  );
}

export default App;
