import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import ResponsiveAppBar from './ResponsiveAppBar';
import Home from './pages/Home';
import Matches from './pages/Matches';
import Teams from './pages/Teams';
import Rankings from './pages/Rankings';
import Profile from './pages/Profile';
import TerrainDetails from './components/TerrainDetails';

function App() {
  return (
    <Router>
      <div>
        <ResponsiveAppBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/accueil" element={<Home />} />
          <Route path="/matchs" element={<Matches />} />
          <Route path="/equipes" element={<Teams />} />
          <Route path="/classement" element={<Rankings />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/terrain/:id" element={<TerrainDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
