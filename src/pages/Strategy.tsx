import { useNavigate } from 'react-router-dom';
import { useStore } from '../store';
import { SCENARIOS } from '../data/scenarios';
import { THEMES } from '../data/themes';
import ProgressBar from '../components/ProgressBar';
import Btn from '../components/Btn';

export default function Strategy() {
  const nav = useNavigate();
  const category = useStore((s) => s.category);
  const sc = SCENARIOS[category];
  const theme = THEMES[category];

  return (
    <div className="min-h-screen bg-white screen-enter">
      <div className="max-w-[820px] mx-auto px-6 py-12">
        <ProgressBar step={3} label="Step 3 of 4 · Your Strategy" />

        {/* Header */}
        <div className="rounded-[20px] p-8 mb-8" style={{ background: theme.heroGrad }}>
          <div className="inline-flex items-center gap-2 px-3 py-[5px] rounded-full text-[12px] font-semibold mb-4"
            style={{ background: `${theme.accent}20`, color: theme.accent }}>
            {sc.label}
          </div>
          <h1 className="text-[24px] font-black tracking-tight mb-3" style={{ color: '#0f0f0f' }}>{sc.strategyH1}</h1>
          <p className="text-[15px] leading-relaxed" style={{ color: '#4b5563' }}>{sc.strategyGoal}</p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-2 gap-4 mb-5">

          {/* Opening */}
          <div className="bg-white rounded-[16px] p-6 border" style={{ borderColor: '#f0f0f0' }}>
            <p className="text-[11px] font-bold uppercase tracking-widest mb-3" style={{ color: theme.accent }}>Opening line</p>
            <p className="text-[16px] font-bold leading-relaxed mb-3" style={{ color: '#0f0f0f' }}>{sc.openingLine}</p>
            <p className="text-[13px] leading-relaxed" style={{ color: '#6b7280' }}>{sc.openingNote}</p>
          </div>

          {/* Closing */}
          <div className="bg-white rounded-[16px] p-6 border" style={{ borderColor: '#f0f0f0' }}>
            <p className="text-[11px] font-bold uppercase tracking-widest mb-3" style={{ color: theme.accent }}>Closing line</p>
            <p className="text-[16px] font-bold leading-relaxed mb-3" style={{ color: '#0f0f0f' }}>{sc.closingLine}</p>
            <p className="text-[13px] leading-relaxed" style={{ color: '#6b7280' }}>{sc.closingNote}</p>
          </div>

          {/* Key points — full width */}
          <div className="col-span-2 bg-white rounded-[16px] p-6 border" style={{ borderColor: '#f0f0f0' }}>
            <p className="text-[11px] font-bold uppercase tracking-widest mb-5" style={{ color: theme.accent }}>Key points to cover</p>
            <div className="grid grid-cols-2 gap-3">
              {sc.keyPoints.map((pt, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-lg flex items-center justify-center text-[11px] font-black shrink-0 mt-[1px]"
                    style={{ background: theme.accentLight, color: theme.accent }}>{i + 1}</div>
                  <p className="text-[14px] leading-relaxed" style={{ color: '#374151' }}>{pt}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Risks */}
          <div className="bg-white rounded-[16px] p-6 border" style={{ borderColor: '#f0f0f0' }}>
            <p className="text-[11px] font-bold uppercase tracking-widest mb-4" style={{ color: '#d97706' }}>Watch out for</p>
            <div className="flex flex-col gap-2">
              {sc.risks.map((r) => (
                <div key={r} className="flex items-start gap-2 px-3 py-2 rounded-[10px] text-[13px]" style={{ background: '#fffbeb', color: '#92400e' }}>
                  {r}
                </div>
              ))}
            </div>
          </div>

          {/* Avoids */}
          <div className="bg-white rounded-[16px] p-6 border" style={{ borderColor: '#f0f0f0' }}>
            <p className="text-[11px] font-bold uppercase tracking-widest mb-4" style={{ color: '#dc2626' }}>Phrases to avoid</p>
            <div className="flex flex-col gap-2">
              {sc.avoids.map((a) => (
                <div key={a} className="flex items-start gap-2 px-3 py-2 rounded-[10px] text-[13px]" style={{ background: '#fef2f2', color: '#991b1b' }}>
                  {a}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Confidence tip */}
        <div className="flex items-start gap-4 rounded-[16px] p-5 mb-8" style={{ background: '#f0fdf4', border: '1px solid #bbf7d0' }}>
          <div className="w-9 h-9 rounded-[10px] flex items-center justify-center text-[18px] shrink-0" style={{ background: '#dcfce7' }}>💡</div>
          <div>
            <p className="font-semibold text-[13px] mb-1" style={{ color: '#166534' }}>Confidence tip</p>
            <p className="text-[14px] leading-relaxed" style={{ color: '#15803d' }}>{sc.tip}</p>
          </div>
        </div>

        <div className="flex justify-between">
          <Btn variant="outline" onClick={() => nav('/intake')}>← Edit context</Btn>
          <Btn onClick={() => nav('/roleplay')}>Start roleplay →</Btn>
        </div>
      </div>
    </div>
  );
}
