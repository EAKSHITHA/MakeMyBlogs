import React from 'react';
import './App.css';
import { NavbaarUI } from './components/Common/NavbaarUI';
import { Footer } from './components/Common/Footer';
import RoutePage from './components/RouterModule/routePage';
import Preloader from './components/Common/Preloader';

function App() {
  return (
    <div className="App">
      <Preloader />
      <NavbaarUI />

      <div className="content-height">
        <RoutePage />
      </div>
      <Footer />
    </div>
  );
}

export default App;
