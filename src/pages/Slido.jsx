import React from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import SlidoGame from '../components/SlidoGame';

function Slido() {
  return (
    <div className="slido-page">
      <Header />
      <main className="main-content">
        <SlidoGame />
      </main>
      <Footer />
    </div>
  );
}

export default Slido;