import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'

import Widget, { configuration, component, journey, user } from '@forgerock/login-widget';
import '@forgerock/login-widget/widget.css';

function App() {
  const [userInfo, setUserInfo] = useState(null);

  // Initiate all the Widget modules
  const config = configuration();
  const componentEvents = component();
  const journeyEvents = journey();

  useEffect(() => {
    // Set the Widget's configuration
    config.set({
      forgerock: {
        serverConfig: {
          baseUrl: 'https://openam-crbrl-01.forgeblocks.com/am',
          timeout: 3000,
        }
      }
    });

    // Instantiate the Widget and assign it to a variable
    const widget = new Widget({ target: document.getElementById('widget-modal') });

    // Subscribe to journey observable and assign unsubscribe function to variable
    const journeyEventsUnsub = journeyEvents.subscribe((event) => {
      if (userInfo !== event.user.response) {
        setUserInfo(event.user.response);
      }
    });

    // Return a function that destroys the Widget and unsubscribes from the journey observable
    return () => {
      widget.$destroy();
      journeyEventsUnsub();
    };
  }, [userInfo]);

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
          <button onClick={async () => {
            await user.logout();
          }}>
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
