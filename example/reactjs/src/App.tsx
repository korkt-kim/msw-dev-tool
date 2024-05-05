import { worker } from './mocks/browser';
import mswDevTool from '../../../dist';

import './App.css';
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    new mswDevTool({
      worker,
    });
  });
  return (
    <div className="App">
      <button
        onClick={() => {
          fetch('http://www.example.com/user').then(async (res) => {
            if (res.ok) {
              const content = await res.json();
              alert(`Here is the mocked response!: ${JSON.stringify(content)}`);
            }
          });
        }}
      >
        Make a request
      </button>
    </div>
  );
}

export default App;
