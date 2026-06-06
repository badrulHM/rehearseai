import { useNavigate } from 'react-router-dom';
import { useStore } from '../store';
import { CATEGORIES } from '../data/categories';
import { THEMES } from '../data/themes';
import ProgressBar from '../components/ProgressBar';
import Btn from '../components/Btn';

const DIFF = [
  { key: 'supportive', label: 'Supportive', desc: 'Gentle & encouraging', icon: '🕊️', color: '#059669' },
  { key: 'realistic',  label: 'Realistic',  desc: 'Natural pushback',     icon: '⚡', color: '#d97706' },
  { key: 'stress',     label: 'Stress Test', desc: 'Escalation & pressure', icon: '🔥', color: '#dc2626' },
] as const;

const inputCls = "w-full px-4 py-3 rounded-[12px] border text-[15px] outline-none transition-all bg-white";
const inputStyle = { borderColor: '#e5e7eb', color: '#0f0f0f', fontFamily: 'inherit' };
const focusStyle = { borderColor: 'var(--accent)', boxShadow: '0 0 0 3px var(--accent-light)' };

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div className="mb-6">
      <label className="block text-[14px] font-semibold mb-2" style={{ color: '#0f0f0f' }}>{label}</label>
      {hint && <p className="text-[13px] mb-2" style={{ color: '#9ca3af' }}>{hint}</p>}
      {children}
    </div>
  );
}

export default function Intake() {
  const nav = useNavigate();
  const { category, formData, setFormData, selectedTones, toggleTone, difficulty, setDifficulty } = useStore();
  const cat = CATEGORIES.find((c) => c.key === category)!;
  const theme = THEMES[category];
  const f = cat.intakeFields;
  const val = (k: string, def: string) => formData[k] ?? def;

  const chipStyle = (sel: boolean) => ({
    borderColor: sel ? theme.accent : '#e5e7eb',
    background: sel ? theme.accentLight : '#fff',
    color: sel ? theme.accent : '#6b7280',
    fontWeight: sel ? 600 : 500,
  });

  return (
    <div className="min-h-screen bg-white screen-enter">
      <div className="max-w-[720px] mx-auto px-6 py-12">
        <ProgressBar step={2} label="Step 2 of 4 · Add Context" />

        {/* Category badge */}
        <button onClick={() => nav('/new')}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border text-[13px] font-medium mb-6 transition-all hover:border-gray-300"
          style={{ borderColor: '#e5e7eb', color: '#374151', background: '#fafafa' }}>
          <span>{cat.icon}</span><span style={{ color: theme.accent, fontWeight: 600 }}>{cat.name}</span>
          <span style={{ color: '#9ca3af' }}>· change</span>
        </button>

        <h1 className="text-[28px] font-black tracking-tight mb-2" style={{ color: '#0f0f0f' }}>
          {cat.key === 'personal'   ? 'Tell us about this heartfelt moment'
           : cat.key === 'health'   ? 'Tell us about the health conversation'
           : cat.key === 'leadership' ? 'Tell us about the leadership situation'
           : `Tell us about your ${cat.name.toLowerCase()} conversation`}
        </h1>
        <p className="text-[15px] mb-10" style={{ color: '#6b7280' }}>
          The more context you share, the more personalised your rehearsal will be.
        </p>

        {/* Sub-type */}
        <Field label="What type of conversation is this?">
          <div className="flex flex-wrap gap-2">
            {cat.subTypes.map((st) => (
              <button key={st} onClick={() => setFormData('subType', formData['subType'] === st ? '' : st)}
                className="px-4 py-2 rounded-full text-[13px] border transition-all"
                style={chipStyle(formData['subType'] === st)}>
                {st}
              </button>
            ))}
          </div>
        </Field>

        {/* Situation */}
        <Field label={f.situation.label}>
          <textarea
            className={inputCls} style={{ ...inputStyle, minHeight: 88, resize: 'none' }}
            placeholder={f.situation.placeholder}
            value={val('situation', f.situation.defaultValue)}
            onChange={(e) => setFormData('situation', e.target.value)}
            onFocus={(e) => Object.assign(e.target.style, focusStyle)}
            onBlur={(e) => Object.assign(e.target.style, { borderColor: '#e5e7eb', boxShadow: 'none' })}
          />
        </Field>

        {/* Who */}
        <Field label={f.who.label}>
          <input type="text" className={inputCls} style={inputStyle}
            placeholder={f.who.placeholder}
            value={val('who', f.who.defaultValue)}
            onChange={(e) => setFormData('who', e.target.value)}
            onFocus={(e) => Object.assign(e.target.style, { ...inputStyle, ...focusStyle })}
            onBlur={(e) => Object.assign(e.target.style, { ...inputStyle, boxShadow: 'none' })}
          />
        </Field>

        {/* Outcome */}
        <Field label={f.outcome.label}>
          <input type="text" className={inputCls} style={inputStyle}
            value={val('outcome', f.outcome.defaultValue)}
            onChange={(e) => setFormData('outcome', e.target.value)}
            onFocus={(e) => Object.assign(e.target.style, { ...inputStyle, ...focusStyle })}
            onBlur={(e) => Object.assign(e.target.style, { ...inputStyle, boxShadow: 'none' })}
          />
        </Field>

        {/* Concern */}
        <Field label={f.concern.label}>
          <input type="text" className={inputCls} style={inputStyle}
            value={val('concern', f.concern.defaultValue)}
            onChange={(e) => setFormData('concern', e.target.value)}
            onFocus={(e) => Object.assign(e.target.style, { ...inputStyle, ...focusStyle })}
            onBlur={(e) => Object.assign(e.target.style, { ...inputStyle, boxShadow: 'none' })}
          />
        </Field>

        {/* Extra */}
        {f.extra && (
          <Field label={f.extra.label}>
            {f.extra.type === 'chips' && f.extra.options ? (
              <div className="flex flex-wrap gap-2">
                {f.extra.options.map((opt) => (
                  <button key={opt} onClick={() => setFormData('extra', formData['extra'] === opt ? '' : opt)}
                    className="px-4 py-2 rounded-full text-[13px] border transition-all"
                    style={chipStyle(formData['extra'] === opt)}>
                    {opt}
                  </button>
                ))}
              </div>
            ) : (
              <textarea className={inputCls} style={{ ...inputStyle, minHeight: 80, resize: 'none' }}
                placeholder={f.extra.placeholder}
                value={val('extra', '')}
                onChange={(e) => setFormData('extra', e.target.value)}
                onFocus={(e) => Object.assign(e.target.style, focusStyle)}
                onBlur={(e) => Object.assign(e.target.style, { borderColor: '#e5e7eb', boxShadow: 'none' })}
              />
            )}
          </Field>
        )}

        {/* Tone */}
        <Field label="Preferred tone" hint="Select all that apply">
          <div className="flex flex-wrap gap-2">
            {cat.tones.map((t) => (
              <button key={t} onClick={() => toggleTone(t)}
                className="px-4 py-2 rounded-full text-[13px] border transition-all"
                style={chipStyle(selectedTones.includes(t))}>
                {t}
              </button>
            ))}
          </div>
        </Field>

        {/* Difficulty */}
        <Field label="Roleplay difficulty" hint="How should the AI challenge you?">
          <div className="grid grid-cols-3 gap-3">
            {DIFF.map((d) => (
              <button key={d.key} onClick={() => setDifficulty(d.key)}
                className="p-4 rounded-[14px] text-center border-2 transition-all"
                style={{ borderColor: difficulty === d.key ? d.color : '#e5e7eb', background: '#fff' }}>
                <div className="text-[20px] mb-2">{d.icon}</div>
                <div className="font-bold text-[13px]" style={{ color: difficulty === d.key ? d.color : '#0f0f0f' }}>{d.label}</div>
                <div className="text-[12px] mt-1" style={{ color: '#9ca3af' }}>{d.desc}</div>
              </button>
            ))}
          </div>
        </Field>

        <div className="flex justify-between pt-4">
          <Btn variant="outline" onClick={() => nav('/new')}>← Back</Btn>
          <Btn onClick={() => nav('/strategy')}>Generate strategy →</Btn>
        </div>
      </div>
    </div>
  );
}
