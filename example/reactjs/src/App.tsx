import { worker } from './mocks/browser';
import mswDevTool from '@korkt-kim/msw-dev-tool';
import './App.css';
import { useEffect } from 'react';
import { SetupApi } from 'msw';

function App() {
  useEffect(() => {
    new mswDevTool.MSWToolbar({
      worker: worker as unknown as SetupApi<any>,
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
