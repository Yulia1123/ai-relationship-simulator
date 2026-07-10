import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '@/pages/Home';
import DnaIntro from '@/pages/DnaIntro';
import Dna from '@/pages/Dna';
import DnaSummary from '@/pages/DnaSummary';
import Soulmate from '@/pages/Soulmate';
import Story from '@/pages/Story';
import Ending from '@/pages/Ending';
import Replay from '@/pages/Replay';

export default function App() {
  return (
    <Router>
      <div className="relative min-h-screen">
        <div className="grain-overlay" />
        <div className="vignette" />
        <div className="film-frame" />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dna/intro" element={<DnaIntro />} />
          <Route path="/dna" element={<Dna />} />
          <Route path="/dna/summary" element={<DnaSummary />} />
          <Route path="/soulmate" element={<Soulmate />} />
          <Route path="/story" element={<Story />} />
          <Route path="/ending" element={<Ending />} />
          <Route path="/replay" element={<Replay />} />
        </Routes>
      </div>
    </Router>
  );
}
