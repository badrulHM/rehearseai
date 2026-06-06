import { useNavigate } from 'react-router-dom';
import { useStore } from '../store';
import { CATEGORIES } from '../data/categories';
import { THEMES } from '../data/themes';
import ProgressBar from '../components/ProgressBar';
import Btn from '../components/Btn';
import type { CategoryKey } from '../types';

export default function NewRehearsal() {
  const nav = useNavigate();
  const { category, setCategory } = useStore();

  return (
    <div className="min-h-screen bg-white screen-enter">
      <div className="max-w-[780px] mx-auto px-6 py-12">
        <ProgressBar step={1} label="Step 1 of 4 · Choose Scenario" />

        <h1 className="text-[32px] font-black tracking-tight mb-2" style={{ color: '#0f0f0f' }}>
          What conversation do you need to prepare for?
        </h1>
        <p className="text-[16px] mb-10" style={{ color: '#6b7280' }}>
          Select the category that best fits your situation.
        </p>

        <div className="grid grid-cols-2 gap-3 mb-10">
          {CATEGORIES.map((c) => {
            const selected = category === c.key;
            const t = THEMES[c.key as CategoryKey];
            return (
              <button
                key={c.key}
                onClick={() => setCategory(c.key as CategoryKey)}
                className="flex items-center gap-4 p-5 rounded-[16px] text-left transition-all border-2 relative"
                style={{
                  borderColor: selected ? t.accent : '#f0f0f0',
                  background: selected ? t.accentLight : '#fff',
                  boxShadow: selected ? `0 0 0 1px ${t.accent}` : 'none',
                }}
              >
                <div className="w-12 h-12 rounded-[12px] flex items-center justify-center text-[22px] shrink-0"
                  style={{ background: selected ? `${t.accent}20` : '#f4f4f5' }}>
                  {c.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-[15px] mb-[3px]" style={{ color: '#0f0f0f' }}>{c.name}</div>
                  <div className="text-[13px] truncate" style={{ color: '#6b7280' }}>{c.desc}</div>
                </div>
                {selected && (
                  <div className="w-5 h-5 rounded-full flex items-center justify-center text-white text-[11px] shrink-0"
                    style={{ background: t.accent }}>✓</div>
                )}
              </button>
            );
          })}
        </div>

        <div className="flex justify-between items-center">
          <Btn variant="outline" onClick={() => nav('/dashboard')}>← Back</Btn>
          <Btn onClick={() => nav('/intake')}>Continue →</Btn>
        </div>
      </div>
    </div>
  );
}
