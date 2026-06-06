import { useNavigate } from 'react-router-dom';
import { useStore } from '../store';
import { SCENARIOS } from '../data/scenarios';
import { THEMES } from '../data/themes';
import ScoreRing from '../components/ScoreRing';
import Btn from '../components/Btn';

export default function Feedback() {
  const nav = useNavigate();
  const category = useStore((s) => s.category);
  const sc = SCENARIOS[category];
  const theme = THEMES[category];

  return (
    <div className="min-h-screen bg-white screen-enter">
      <div className="max-w-[860px] mx-auto px-6 py-12">

        {/* Score hero */}
        <div className="rounded-[24px] p-10 text-center mb-8" style={{ background: theme.heroGrad }}>
          <div className="flex justify-center mb-6">
            <ScoreRing score={sc.feedbackScore} size={130} />
          </div>
          <h1 className="text-[26px] font-black tracking-tight mb-3" style={{ color: '#0f0f0f' }}>{sc.feedbackVerdict}</h1>
          <p className="text-[16px] max-w-[500px] mx-auto leading-relaxed" style={{ color: '#4b5563' }}>{sc.feedbackSummary}</p>
        </div>

        {/* Category scores */}
        <div className="grid gap-4 mb-6" style={{ gridTemplateColumns: 'repeat(5,1fr)' }}>
          {sc.catScores.map((cs) => {
            const c = cs.color === 'var(--accent)' ? theme.accent : cs.color;
            return (
              <div key={cs.name} className="bg-white rounded-[16px] p-4 text-center border" style={{ borderColor: '#f0f0f0' }}>
                <p className="text-[11px] font-semibold uppercase tracking-wide mb-2" style={{ color: '#9ca3af' }}>{cs.name}</p>
                <p className="text-[26px] font-black" style={{ color: c }}>{cs.val}</p>
                <div className="h-1 rounded-full mt-3 overflow-hidden" style={{ background: '#f0f0f0' }}>
                  <div className="h-full rounded-full" style={{ width: `${cs.val}%`, background: c, transition: 'width 1s ease' }} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Strengths / Improvements */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-white rounded-[16px] p-6 border" style={{ borderColor: '#f0f0f0' }}>
            <p className="text-[12px] font-bold uppercase tracking-widest mb-5" style={{ color: '#059669' }}>✅ What you did well</p>
            {sc.strengths.map((s) => (
              <div key={s} className="flex items-start gap-3 mb-3 last:mb-0">
                <div className="w-[5px] h-[5px] rounded-full shrink-0 mt-[9px]" style={{ background: '#059669' }} />
                <p className="text-[14px] leading-relaxed" style={{ color: '#374151' }}>{s}</p>
              </div>
            ))}
          </div>
          <div className="bg-white rounded-[16px] p-6 border" style={{ borderColor: '#f0f0f0' }}>
            <p className="text-[12px] font-bold uppercase tracking-widest mb-5" style={{ color: '#d97706' }}>📈 Where to improve</p>
            {sc.improvements.map((s) => (
              <div key={s} className="flex items-start gap-3 mb-3 last:mb-0">
                <div className="w-[5px] h-[5px] rounded-full shrink-0 mt-[9px]" style={{ background: '#d97706' }} />
                <p className="text-[14px] leading-relaxed" style={{ color: '#374151' }}>{s}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Phrase rewrite */}
        <div className="bg-white rounded-[16px] p-6 border mb-8" style={{ borderColor: '#f0f0f0' }}>
          <p className="text-[12px] font-bold uppercase tracking-widest mb-5" style={{ color: '#6b7280' }}>🔄 Better phrasing</p>
          <div className="rounded-[12px] p-4" style={{ background: '#fafafa' }}>
            <p className="text-[13px] mb-3" style={{ color: '#dc2626', textDecoration: 'line-through' }}>{sc.phraseOld}</p>
            <p className="text-[14px] font-medium" style={{ color: '#059669' }}>{sc.phraseNew}</p>
          </div>
        </div>

        {/* Next step */}
        <div className="text-center">
          <p className="text-[14px] mb-6" style={{ color: '#9ca3af' }}>
            Recommended next practice: Handling objections and pushback under pressure
          </p>
          <div className="flex gap-3 justify-center flex-wrap">
            <Btn onClick={() => nav('/script')}>View final script →</Btn>
            <Btn variant="outline" onClick={() => nav('/roleplay')}>Rehearse again</Btn>
            <Btn variant="outline" onClick={() => nav('/dashboard')}>Save &amp; exit</Btn>
          </div>
        </div>
      </div>
    </div>
  );
}
