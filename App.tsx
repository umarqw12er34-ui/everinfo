import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Courses from './components/Courses';
import SmartCoin from './components/SmartCoin';
import Achievements from './components/Achievements';
import Results from './components/Results';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <Courses />
      <SmartCoin />
      <Achievements />
      <Results />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;