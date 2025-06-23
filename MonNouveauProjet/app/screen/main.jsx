import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';


import App from './App.jsx';
import Home from './ HomeScreen.jsx';
import Shop from './shop.jsx';
import InscriptionScreen from './InscriptionScreen.tsx';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/ HomeScreen" element={<Home />} />
        <Route path="/ ExploreScreen" element={<Shop />} />
        <Route path="/InscriptionScreen" element={<InscriptionScreen/>} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);