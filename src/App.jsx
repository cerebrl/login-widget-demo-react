import { configuration } from "@forgerock/login-widget";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import reactLogo from './assets/react.svg'
import './App.css'
import '@forgerock/login-widget/widget.css';

import Login from './Login';
import Register from './Register';
import Home from './Home';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: 'login',
    element: <Login />,
  },
  {
    path: 'register',
    element: <Register />,
  }
]);

function App() {
  // Configure the Widget at the top level
  configuration().set({
    forgerock: {
      redirectUri: 'http://localhost:5173/',
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

      <RouterProvider router={router} />

      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  )
}

export default App
