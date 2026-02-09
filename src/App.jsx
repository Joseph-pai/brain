import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Test from './pages/Test';
import Report from './pages/Report';
import SecretGarden from './pages/SecretGarden';
import PsychMap from './pages/PsychMap';
import Profile from './pages/Profile';
import HealthMall from './pages/HealthMall';
import Manual from './pages/Manual';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="test" element={<Test />} />
          <Route path="report" element={<Report />} />
          <Route path="garden" element={<SecretGarden />} />
          <Route path="map" element={<PsychMap />} />
          <Route path="profile" element={<Profile />} />
          <Route path="mall" element={<HealthMall />} />
          <Route path="manual" element={<Manual />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
