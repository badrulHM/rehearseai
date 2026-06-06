import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import NavBar from './components/NavBar';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import NewRehearsal from './pages/NewRehearsal';
import Intake from './pages/Intake';
import Strategy from './pages/Strategy';
import Roleplay from './pages/Roleplay';
import Feedback from './pages/Feedback';
import FinalScript from './pages/FinalScript';
import { useStore } from './store';
import { THEMES } from './data/themes';

export default function App() {
  const category = useStore((s) => s.category);
  const theme = THEMES[category];

  return (
    <BrowserRouter>
      <div className="min-h-screen" style={{ background: '#f8f7f4' }}>
        <style>{`
          :root {
            --accent: ${theme.accent};
            --accent-light: ${theme.accentLight};
            --accent-shadow: ${theme.accentShadow};
            --hero-grad: ${theme.heroGrad};
          }
        `}</style>
        <NavBar />
        <div className="pt-[60px]">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/new" element={<NewRehearsal />} />
            <Route path="/intake" element={<Intake />} />
            <Route path="/strategy" element={<Strategy />} />
            <Route path="/roleplay" element={<Roleplay />} />
            <Route path="/feedback" element={<Feedback />} />
            <Route path="/script" element={<FinalScript />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}
