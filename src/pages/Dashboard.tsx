import { useNavigate } from 'react-router-dom';
import { useStore } from '../store';
import { THEMES } from '../data/themes';
import Btn from '../components/Btn';
import type { CategoryKey } from '../types';

const RECENT = [
  { icon: '💼', title: 'Salary negotiation with manager',    cat: 'career'   as CategoryKey, tag: 'Career',             date: '3 days ago',  score: 81, hi: true },
  { icon: '💍', title: 'Marriage proposal speech',           cat: 'personal' as CategoryKey, tag: 'Personal & Heartfelt', date: '1 week ago', score: 91, hi: true },
  { icon: '🏆', title: 'Feedback to underperforming report', cat: 'leadership' as CategoryKey, tag: 'Leadership',        date: '2 weeks ago', score: 67, hi: false },
];

function scoreColor(s: number) {
  if (s >= 85) return '#059669';
  if (s >= 70) return '#4f6ef7';
  return '#d97706';
}

export default function Dashboard() {
  const nav = useNavigate();
  const category = useStore((s) => s.category);
  const theme = THEMES[category];

  return (
    <div className="min-h-screen bg-white screen-enter">
      <div className="flex min-h-[calc(100vh-64px)]">

        {/* Sidebar */}
        <aside className="w-[220px] shrink-0 border-r flex flex-col gap-1 px-3 py-6" style={{ borderColor: '#f0f0f0' }}>
          {[
            { icon: '🏠', label: 'Dashboard',     path: '/dashboard', active: true },
            { icon: '✨', label: 'New Rehearsal',  path: '/new' },
            { icon: '📁', label: 'All Rehearsals', path: '/dashboard' },
            { icon: '⭐', label: 'Saved Scripts',  path: '/script' },
          ].map((s) => (
            <button key={s.label} onClick={() => nav(s.path)}
              className="flex items-center gap-3 px-3 py-[9px] rounded-[10px] text-[14px] font-medium w-full text-left transition-colors"
              style={{ color: s.active ? '#0f0f0f' : '#6b7280', background: s.active ? '#f4f4f5' : 'transparent' }}>
              <span>{s.icon}</span>{s.label}
            </button>
          ))}
          <div className="px-3 pt-4 pb-1 text-[11px] font-semibold uppercase tracking-wider" style={{ color: '#9ca3af' }}>Categories</div>
          {['💼 Career','🗣️ Workplace','🏡 Family','💍 Personal'].map((c) => (
            <button key={c} onClick={() => nav('/new')}
              className="flex items-center gap-3 px-3 py-[9px] rounded-[10px] text-[14px] w-full text-left transition-colors hover:bg-gray-50"
              style={{ color: '#6b7280' }}>{c}
            </button>
          ))}
          <div className="mt-auto px-3">
            <button className="flex items-center gap-3 py-[9px] rounded-[10px] text-[14px] w-full text-left" style={{ color: '#9ca3af' }}>⚙️ Settings</button>
          </div>
        </aside>

        {/* Main */}
        <main className="flex-1 px-10 py-8 overflow-y-auto" style={{ background: '#fafafa' }}>
          {/* Header */}
          <div className="flex justify-between items-start mb-8">
            <div>
              <h1 className="text-[28px] font-black tracking-tight mb-1" style={{ color: '#0f0f0f' }}>Good morning, Alex 👋</h1>
              <p className="text-[14px]" style={{ color: '#6b7280' }}>You have a salary negotiation saved from last week. Ready to practise again?</p>
            </div>
            <button onClick={() => nav('/new')}
              className="flex items-center gap-2 px-5 py-[10px] rounded-full text-[14px] font-semibold text-white transition-all hover:opacity-90"
              style={{ background: theme.accent, boxShadow: `0 2px 16px ${theme.accentShadow}` }}>
              + New Rehearsal
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            {[
              { label: 'Total Rehearsals', value: '7',      note: '↑ 3 this week',              noteOk: true },
              { label: 'Average Score',    value: '74',     note: '↑ 11 pts from first session', noteOk: true, accent: true },
              { label: 'Top Improvement',  value: 'Empathy',note: '58 → 79 over 3 sessions',     noteOk: true, small: true },
            ].map((s) => (
              <div key={s.label} className="bg-white rounded-[16px] p-6 border" style={{ borderColor: '#f0f0f0' }}>
                <p className="text-[12px] font-semibold uppercase tracking-wide mb-2" style={{ color: '#9ca3af' }}>{s.label}</p>
                <p className="font-black tracking-tight" style={{ fontSize: s.small ? '22px' : '36px', color: s.accent ? theme.accent : '#0f0f0f' }}>{s.value}</p>
                <p className="text-[12px] mt-1" style={{ color: '#059669' }}>{s.note}</p>
              </div>
            ))}
          </div>

          {/* Recent */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-[16px] font-bold" style={{ color: '#0f0f0f' }}>Recent Rehearsals</h2>
            <button className="text-[13px] font-semibold" style={{ color: theme.accent }}>View all →</button>
          </div>
          <div className="flex flex-col gap-3 mb-8">
            {RECENT.map((r) => {
              const t = THEMES[r.cat];
              return (
                <div key={r.title} onClick={() => nav('/strategy')}
                  className="bg-white rounded-[16px] p-5 border flex items-center gap-4 cursor-pointer transition-all hover:shadow-md hover:border-gray-200"
                  style={{ borderColor: '#f0f0f0' }}>
                  <div className="w-11 h-11 rounded-[12px] flex items-center justify-center text-[20px] shrink-0" style={{ background: t.accentLight }}>{r.icon}</div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-[15px] mb-1 truncate" style={{ color: '#0f0f0f' }}>{r.title}</p>
                    <div className="flex items-center gap-2 text-[12px]" style={{ color: '#9ca3af' }}>
                      <span className="px-2 py-[2px] rounded-full font-semibold" style={{ background: t.accentLight, color: t.accent }}>{r.tag}</span>
                      <span>·</span><span>{r.date}</span>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-[24px] font-black" style={{ color: scoreColor(r.score) }}>{r.score}</div>
                    <div className="text-[11px]" style={{ color: '#9ca3af' }}>score</div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick start */}
          <h2 className="text-[16px] font-bold mb-4" style={{ color: '#0f0f0f' }}>Quick Start</h2>
          <div className="grid grid-cols-4 gap-3">
            {[
              { icon: '💼', label: 'Salary Talk' },
              { icon: '😔', label: 'Apology' },
              { icon: '🎤', label: 'Job Interview' },
              { icon: '🏆', label: 'Team Feedback' },
            ].map((q) => (
              <button key={q.label} onClick={() => nav('/new')}
                className="bg-white rounded-[14px] p-5 border text-center transition-all hover:-translate-y-[2px] hover:shadow-md"
                style={{ borderColor: '#f0f0f0' }}>
                <div className="text-[24px] mb-2">{q.icon}</div>
                <div className="text-[13px] font-semibold" style={{ color: '#374151' }}>{q.label}</div>
              </button>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
