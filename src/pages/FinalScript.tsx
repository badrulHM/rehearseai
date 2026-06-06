import { useNavigate } from 'react-router-dom';
import { useStore } from '../store';
import { SCENARIOS } from '../data/scenarios';
import { THEMES } from '../data/themes';
import Btn from '../components/Btn';

const VARIANTS = [
  { key: 'standard',  label: 'Standard',       icon: '📋' },
  { key: 'confident', label: 'More Confident',  icon: '💪' },
  { key: 'gentle',    label: 'More Gentle',     icon: '🤍' },
  { key: 'short',     label: 'Short Version',   icon: '⚡' },
] as const;

const PREFIXES: Record<string, string> = {
  confident: '(More directly) ',
  gentle:    '(More gently) ',
  short:     '(In brief) ',
  standard:  '',
};

export default function FinalScript() {
  const nav = useNavigate();
  const category = useStore((s) => s.category);
  const { scriptVariant, setScriptVariant } = useStore();
  const sc = SCENARIOS[category];
  const theme = THEMES[category];
  const prefix = PREFIXES[scriptVariant] || '';

  const objections = [
    { q: sc.avoids[0]?.replace('❌ ', '') || '', a: sc.quickReplies?.[0] || '' },
    { q: sc.avoids[1]?.replace('❌ ', '') || '', a: sc.quickReplies?.[1] || '' },
    { q: sc.avoids[2]?.replace('❌ ', '') || '', a: sc.quickReplies?.[2] || '' },
  ].filter((o) => o.a);

  const reminders = [
    ...sc.keyPoints.slice(0, 3).map((p) => ({ text: p, good: true })),
    { text: sc.avoids[0]?.replace('❌ ', '') || '', good: false },
    { text: sc.avoids[1]?.replace('❌ ', '') || '', good: false },
  ].filter((r) => r.text);

  return (
    <div className="min-h-screen bg-white screen-enter">
      <div className="max-w-[780px] mx-auto px-6 py-12">

        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-[5px] rounded-full text-[12px] font-semibold mb-5"
            style={{ background: theme.accentLight, color: theme.accent }}>
            {sc.label}
          </div>
          <h1 className="text-[32px] font-black tracking-tight mb-2" style={{ color: '#0f0f0f' }}>Your Conversation Guide</h1>
          <p className="text-[15px]" style={{ color: '#6b7280' }}>Based on your rehearsal &amp; feedback</p>
        </div>

        {/* Variant tabs */}
        <div className="flex gap-1 p-1 rounded-[14px] mb-8" style={{ background: '#f4f4f5' }}>
          {VARIANTS.map((v) => (
            <button key={v.key} onClick={() => setScriptVariant(v.key)}
              className="flex-1 flex items-center justify-center gap-2 py-[9px] rounded-[11px] text-[13px] font-semibold transition-all"
              style={scriptVariant === v.key
                ? { background: '#fff', color: '#0f0f0f', boxShadow: '0 1px 6px rgba(0,0,0,.08)' }
                : { color: '#6b7280' }}>
              <span>{v.icon}</span><span>{v.label}</span>
            </button>
          ))}
        </div>

        {/* Script sections */}
        <div className="flex flex-col gap-4 mb-8">

          {/* Opening */}
          <div className="bg-white rounded-[16px] p-6 border" style={{ borderColor: '#f0f0f0' }}>
            <p className="text-[11px] font-bold uppercase tracking-widest mb-4" style={{ color: theme.accent }}>Opening</p>
            <p className="text-[16px] leading-relaxed italic" style={{ color: '#0f0f0f' }}>
              "{prefix}{sc.openingLine.replace(/^"|"$/g, '')}"
            </p>
          </div>

          {/* Key points */}
          <div className="bg-white rounded-[16px] p-6 border" style={{ borderColor: '#f0f0f0' }}>
            <p className="text-[11px] font-bold uppercase tracking-widest mb-5" style={{ color: theme.accent }}>Key Points</p>
            <div className="flex flex-col gap-3">
              {sc.keyPoints.map((pt, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-lg flex items-center justify-center text-[11px] font-black shrink-0"
                    style={{ background: theme.accentLight, color: theme.accent }}>{i + 1}</div>
                  <p className="text-[14px] leading-relaxed" style={{ color: '#374151' }}>{pt}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Objection handling */}
          <div className="bg-white rounded-[16px] p-6 border" style={{ borderColor: '#f0f0f0' }}>
            <p className="text-[11px] font-bold uppercase tracking-widest mb-5" style={{ color: theme.accent }}>When They Push Back</p>
            <div className="flex flex-col gap-5">
              {objections.map((obj, i) => (
                <div key={i} className="pl-4" style={{ borderLeft: `3px solid ${theme.accent}40` }}>
                  <p className="text-[13px] font-semibold mb-1" style={{ color: '#9ca3af' }}>If they say: {obj.q}</p>
                  <p className="text-[14px] leading-relaxed" style={{ color: '#0f0f0f' }}>{obj.a}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Closing */}
          <div className="bg-white rounded-[16px] p-6 border" style={{ borderColor: '#f0f0f0' }}>
            <p className="text-[11px] font-bold uppercase tracking-widest mb-4" style={{ color: theme.accent }}>Closing</p>
            <p className="text-[16px] leading-relaxed italic" style={{ color: '#0f0f0f' }}>
              "{prefix}{sc.closingLine.replace(/^"|"$/g, '')}"
            </p>
          </div>

          {/* Before you go in */}
          <div className="rounded-[16px] p-6" style={{ background: theme.heroGrad, border: `1px solid ${theme.accent}20` }}>
            <p className="text-[11px] font-bold uppercase tracking-widest mb-5" style={{ color: theme.accent }}>Before You Go In</p>
            <div className="flex flex-col gap-2">
              {reminders.map((r) => (
                <p key={r.text} className="text-[14px] leading-relaxed flex items-start gap-2">
                  <span style={{ color: r.good ? '#059669' : '#dc2626' }}>{r.good ? '✓' : '✗'}</span>
                  <span style={{ color: r.good ? '#064e3b' : '#7f1d1d' }}>{r.text}</span>
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 justify-center flex-wrap">
          <Btn>📄 Export to PDF</Btn>
          <Btn variant="outline">📋 Copy to clipboard</Btn>
          <Btn variant="outline" onClick={() => nav('/dashboard')}>← Dashboard</Btn>
        </div>
      </div>
    </div>
  );
}
