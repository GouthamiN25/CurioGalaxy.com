import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { StarBackground } from './components/StarBackground';
import { Header } from './components/Header';
import { Home } from './pages/Home';
import { Profile } from './pages/Profile';
import { Chat } from './pages/Chat';
import { Guidora } from './pages/Guidora';
import { Tales, Collection } from './pages/Placeholders';

const App: React.FC = () => {
  return (
    <HashRouter>
      <StarBackground />
      <div className="relative z-0 flex flex-col min-h-screen">
        <Header />
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/tales" element={<Tales />} />
          <Route path="/collection" element={<Collection />} />
          <Route path="/guidora" element={<Guidora />} />
        </Routes>
      </div>
    </HashRouter>
  );
};

export default App;
