import { user } from '@forgerock/login-widget';

import reactLogo from './assets/react.svg'
import './App.css'
import '@forgerock/login-widget/widget.css';

import useLoginWidget from './use-login-widget';
import LoginWidget from './LoginWidget';

function App() {
  const userInfo = useLoginWidget({
    forgerock: {
      serverConfig: {
				baseUrl: 'https://openam-crbrl-01.forgeblocks.com/am',
				timeout: 3000,
      },
    },
  });

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

      { !userInfo ?

        <div className="card tw_dark">
          <LoginWidget />
        </div> :

        <div className="card">
          <button onClick={() => { user.logout(); }}>
            Logout
          </button>

          <pre>
            { JSON.stringify(userInfo, null, ' ') }
          </pre>
        </div>
      }

      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  )
}

export default App
