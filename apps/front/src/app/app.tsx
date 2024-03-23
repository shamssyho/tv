// eslint-disable-next-line @typescript-eslint/no-unused-vars
import './global-style.css'
import './app.module.css'

import { Route, Routes } from "react-router";
import Home from "./Pages/Home/Home";
import Watched from "./Pages/Watched/Watched";
import { NavLink } from 'react-router-dom';
import MovieDetails from './Pages/MovieDetail/MovieDetails';

export function App() {
  return (
    <div>
      <div style={{ display: 'flex' }} className='header-container'>
        <div>
          <h1>Ciné 4 Me</h1>
        </div>
        <ul>
          <li><NavLink to="/">Home</NavLink></li>
          <li><NavLink to="/watched">Watched</NavLink></li>
        </ul>
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:id" element={<MovieDetails />} />
        <Route path="/watched" element={<Watched />} />
      </Routes>
    </div>
  );
}

export default App;
