@@ .. @@
 import React from 'react';
-import Header from './components/Header';
-import Hero from './components/Hero';
-import Courses from './components/Courses';
-import SmartCoin from './components/SmartCoin';
-import Achievements from './components/Achievements';
-import Results from './components/Results';
-import Contact from './components/Contact';
-import Footer from './components/Footer';
+import PortfolioHeader from './components/PortfolioHeader';
+import PortfolioHero from './components/PortfolioHero';
+import About from './components/About';
+import Portfolio from './components/Portfolio';
+import PortfolioContact from './components/PortfolioContact';
+import PortfolioFooter from './components/PortfolioFooter';
 
 function App() {
   return (
     <div className="min-h-screen bg-white">
-      <Header />
-      <Hero />
-      <Courses />
-      <SmartCoin />
-      <Achievements />
-      <Results />
-      <Contact />
-      <Footer />
+      <PortfolioHeader />
+      <PortfolioHero />
+      <About />
+      <Portfolio />
+      <PortfolioContact />
+      <PortfolioFooter />
     </div>
   );
 }