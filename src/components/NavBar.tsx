import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useStore } from '../store';
import { THEMES } from '../data/themes';

const LINKS = [
  { path: '/dashboard', label: 'Dashboard' },
  { path: '/new',       label: 'Scenarios' },
];

export default function NavBar() {
  const location = useLocation();
  const nav = useNavigate();
  const category = useStore((s) => s.category);
  const { accent } = THEMES[category];
  const isLanding = location.pathname === '/';

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 h-[64px]"
      style={{
        background: 'rgba(255,255,255,0.88)',
        backdropFilter: 'blur(16px)',
        borderBottom: '1px solid #f0f0f0',
      }}
    >
      {/* Logo */}
      <Link to="/" className="flex items-center gap-2 text-[17px] font-bold tracking-tight" style={{ color: '#0f0f0f' }}>
        <div className="w-7 h-7 rounded-[8px] flex items-center justify-center text-white text-[13px] font-black" style={{ background: accent }}>R</div>
        Rehearse<span style={{ color: accent }}>AI</span>
      </Link>

      {/* Nav links */}
      <div className="hidden md:flex items-center gap-1">
        {LINKS.map((l) => (
          <Link
            key={l.path}
            to={l.path}
            className="px-4 py-2 rounded-full text-[14px] font-medium transition-all"
            style={{ color: location.pathname === l.path ? '#0f0f0f' : '#6b7280' }}
          >
            {l.label}
          </Link>
        ))}
        {/* Dev nav */}
        {!isLanding && (
          <div className="flex items-center gap-1 ml-2 pl-2" style={{ borderLeft: '1px solid #f0f0f0' }}>
            {[
              { path: '/intake',   label: 'Intake' },
              { path: '/strategy', label: 'Strategy' },
              { path: '/roleplay', label: 'Roleplay' },
              { path: '/feedback', label: 'Feedback' },
              { path: '/script',   label: 'Script' },
            ].map((l) => (
              <Link key={l.path} to={l.path}
                className="px-3 py-1.5 rounded-full text-[12px] font-medium transition-all"
                style={{ color: location.pathname === l.path ? accent : '#9ca3af',
                         background: location.pathname === l.path ? `${accent}15` : 'transparent' }}>
                {l.label}
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* CTA */}
      <button
        onClick={() => nav('/new')}
        className="px-5 py-2 rounded-full text-[13px] font-semibold text-white transition-all hover:opacity-90"
        style={{ background: accent, boxShadow: `0 2px 12px ${accent}44` }}
      >
        Start rehearsing →
      </button>
    </nav>
  );
}
