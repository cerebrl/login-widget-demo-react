import { component, journey, user } from '@forgerock/login-widget';

import reactLogo from './assets/react.svg'
import './App.css'
import '@forgerock/login-widget/widget.css';

import useLoginWidget from './use-login-widget';

function App() {
  const userInfo = useLoginWidget({
    forgerock: {
      serverConfig: {
				baseUrl: 'https://openam-crbrl-01.forgeblocks.com/am',
				timeout: 3000,
      },
    },
  });

  // Initiate all the Widget modules
  const componentEvents = component();
  const journeyEvents = journey();

  return (
    <div className="App">

      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>

      <h1>Vite + React</h1>

      <div className="card">

        { !userInfo ?
          <button onClick={() => {
            journeyEvents.start();
            componentEvents.open();
          }}>
            Login
          </button> :
          <button onClick={() => { user.logout(); }}>
            Logout
          </button>
        }

        <pre>
          { JSON.stringify(userInfo, null, ' ') }
        </pre>
      </div>

      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  )
}

export default App
