import { useNavigate } from 'react-router-dom';
import { useStore } from '../store';
import { THEMES } from '../data/themes';
import Btn from '../components/Btn';

const TRUSTED_BY = ['Google', 'Microsoft', 'Salesforce', 'HubSpot', 'Atlassian', 'Notion', 'Stripe', 'Figma', 'Linear', 'Vercel'];

const HOW = [
  { icon: '🎯', title: 'Choose your scenario', desc: 'Pick from 8 conversation categories — salary, proposal, feedback, family, health, and more.' },
  { icon: '✍️', title: 'Add your context',     desc: 'Tell us who you\'re speaking with, what you want, and what you\'re worried about.' },
  { icon: '⚡', title: 'Get a strategy',        desc: 'AI generates your opening line, key points, emotional risks, and what to avoid.' },
  { icon: '🎭', title: 'Practise with AI',      desc: 'Roleplay with a realistic AI character. Pause anytime for live coaching.' },
  { icon: '📋', title: 'Walk in prepared',      desc: 'Get a personalised final script in Standard, Confident, Gentle, or Short form.' },
];

const SCENARIOS = [
  { icon: '💼', label: 'Salary negotiation',     tag: 'Career',      color: '#4f6ef7' },
  { icon: '💍', label: 'Marriage proposal',      tag: 'Heartfelt',   color: '#7c3aed' },
  { icon: '🗣️', label: 'Giving difficult feedback', tag: 'Workplace', color: '#6366f1' },
  { icon: '😤', label: 'Angry customer',         tag: 'Customer',    color: '#d97706' },
  { icon: '🏡', label: 'Family boundary',        tag: 'Family',      color: '#db2777' },
  { icon: '👨‍⚕️', label: 'Doctor appointment',   tag: 'Health',      color: '#0891b2' },
  { icon: '🏆', label: 'Delivering bad news',    tag: 'Leadership',  color: '#059669' },
  { icon: '✨', label: 'Saying no politely',     tag: 'Everyday',    color: '#7c5cbf' },
];

const FEATURES = [
  {
    icon: '🎯',
    title: 'Guided preparation',
    desc: 'Structured intake questions surface what matters most before you start.',
    color: '#4f6ef7',
  },
  {
    icon: '🎭',
    title: 'Realistic AI roleplay',
    desc: 'The AI plays the other person and responds naturally — not a script reader.',
    color: '#7c3aed',
  },
  {
    icon: '⏸️',
    title: 'Pause & get coached',
    desc: 'Step out of roleplay mid-conversation and get instant advice on what to say next.',
    color: '#059669',
  },
  {
    icon: '↩️',
    title: 'Redo any message',
    desc: 'Try a different approach and compare — no other conversation tool does this.',
    color: '#d97706',
  },
  {
    icon: '📊',
    title: 'Scored feedback',
    desc: 'Scored across clarity, empathy, assertiveness, structure — with concrete rewrites.',
    color: '#db2777',
  },
  {
    icon: '📋',
    title: 'Final script in 4 styles',
    desc: 'Standard, More Confident, More Gentle, and Short — choose what fits your moment.',
    color: '#0891b2',
  },
];

export default function Landing() {
  const nav = useNavigate();
  const category = useStore((s) => s.category);
  const theme = THEMES[category];

  return (
    <div className="screen-enter bg-white min-h-screen">

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section className="max-w-[1100px] mx-auto px-6 pt-32 pb-20 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 border rounded-full px-4 py-[6px] text-[13px] font-medium mb-8"
          style={{ borderColor: '#e5e7eb', color: '#6b7280' }}>
          <span className="w-[6px] h-[6px] rounded-full" style={{ background: theme.accent }} />
          Private AI Conversation Coach
        </div>

        {/* Headline */}
        <h1 className="font-black tracking-tight leading-[1.08] mb-6"
          style={{ fontSize: 'clamp(42px,6.5vw,80px)', color: '#0f0f0f' }}>
          Practise the conversation<br />
          <span className="gradient-text">before it matters.</span>
        </h1>

        {/* Sub */}
        <p className="text-[18px] max-w-[580px] mx-auto leading-relaxed mb-10"
          style={{ color: '#6b7280', fontSize: 'clamp(16px,2vw,18px)' }}>
          RehearseAI is your private AI coach for difficult, emotional, professional, and heartfelt conversations. Prepare what to say, practise with AI, and walk in with confidence.
        </p>

        {/* CTAs */}
        <div className="flex items-center gap-3 justify-center flex-wrap mb-6">
          <button
            onClick={() => nav('/new')}
            className="px-8 py-4 rounded-full text-[15px] font-bold text-white transition-all hover:opacity-90 active:scale-[.98]"
            style={{ background: theme.accent, boxShadow: `0 4px 24px ${theme.accentShadow}` }}
          >
            Start rehearsing — it&apos;s free →
          </button>
          <button
            onClick={() => nav('/dashboard')}
            className="px-8 py-4 rounded-full text-[15px] font-medium border transition-all hover:bg-gray-50"
            style={{ borderColor: '#e5e7eb', color: '#374151' }}
          >
            View dashboard
          </button>
        </div>

        {/* Social proof */}
        <div className="flex items-center justify-center gap-3 text-[13px]" style={{ color: '#9ca3af' }}>
          <div className="flex">
            {['#c7d2fe','#ddd6fe','#fde68a','#bbf7d0'].map((c, i) => (
              <div key={i} className="w-8 h-8 rounded-full border-2 border-white -ml-2 first:ml-0 flex items-center justify-center text-[10px] font-bold text-white"
                style={{ background: c }} />
            ))}
          </div>
          <span>Trusted by 2,400+ people in 40+ countries</span>
        </div>
      </section>

      {/* ── SCENARIO CARDS (product preview) ─────────────────────────── */}
      <section className="max-w-[1100px] mx-auto px-6 pb-24">
        <div className="grid grid-cols-4 gap-3">
          {SCENARIOS.map((s) => (
            <button
              key={s.label}
              onClick={() => nav('/new')}
              className="group p-5 rounded-[16px] text-left border transition-all hover:-translate-y-[2px] hover:shadow-lg"
              style={{ borderColor: '#f0f0f0', background: '#fafafa' }}
            >
              <div className="text-[26px] mb-3">{s.icon}</div>
              <div className="font-semibold text-[14px] mb-1" style={{ color: '#0f0f0f' }}>{s.label}</div>
              <div className="inline-block px-2 py-[2px] rounded-full text-[11px] font-semibold" style={{ background: `${s.color}18`, color: s.color }}>{s.tag}</div>
            </button>
          ))}
        </div>
      </section>

      {/* ── LOGO STRIP ───────────────────────────────────────────────── */}
      <section className="border-y py-10 overflow-hidden" style={{ borderColor: '#f0f0f0' }}>
        <p className="text-center text-[13px] font-medium mb-7" style={{ color: '#9ca3af' }}>Used by professionals at</p>
        <div className="logo-strip flex items-center gap-12 px-12 overflow-hidden">
          {[...TRUSTED_BY, ...TRUSTED_BY].map((name, i) => (
            <span key={i} className="text-[15px] font-semibold whitespace-nowrap" style={{ color: '#d1d5db' }}>{name}</span>
          ))}
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────────────────── */}
      <section className="max-w-[1100px] mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <p className="text-[12px] font-bold tracking-[1.5px] uppercase mb-4" style={{ color: theme.accent }}>How it works</p>
          <h2 className="font-black tracking-tight" style={{ fontSize: 'clamp(28px,4vw,48px)', color: '#0f0f0f' }}>
            Five steps to walk in ready
          </h2>
        </div>
        <div className="grid grid-cols-5 gap-6 relative">
          {/* Connecting line */}
          <div className="absolute top-[28px] left-[10%] right-[10%] h-[1px]" style={{ background: 'linear-gradient(to right,transparent,#e5e7eb,transparent)' }} />
          {HOW.map((s, i) => (
            <div key={i} className="flex flex-col items-center text-center">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-[22px] mb-4 relative z-10 border"
                style={{ background: '#fff', borderColor: '#f0f0f0', boxShadow: '0 2px 12px rgba(0,0,0,.06)' }}>
                {s.icon}
              </div>
              <div className="font-bold text-[14px] mb-2" style={{ color: '#0f0f0f' }}>{s.title}</div>
              <div className="text-[13px] leading-relaxed" style={{ color: '#6b7280' }}>{s.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FEATURES GRID ────────────────────────────────────────────── */}
      <section className="py-24" style={{ background: '#fafafa' }}>
        <div className="max-w-[1100px] mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-[12px] font-bold tracking-[1.5px] uppercase mb-4" style={{ color: theme.accent }}>What makes it different</p>
            <h2 className="font-black tracking-tight" style={{ fontSize: 'clamp(28px,4vw,48px)', color: '#0f0f0f' }}>
              Built for real conversations,<br />not generic chat.
            </h2>
          </div>
          <div className="grid grid-cols-3 gap-5">
            {FEATURES.map((f) => (
              <div key={f.title} className="bg-white rounded-[20px] p-7 border" style={{ borderColor: '#f0f0f0' }}>
                <div className="w-12 h-12 rounded-[14px] flex items-center justify-center text-[22px] mb-5"
                  style={{ background: `${f.color}15` }}>
                  {f.icon}
                </div>
                <h3 className="font-bold text-[16px] mb-2" style={{ color: '#0f0f0f' }}>{f.title}</h3>
                <p className="text-[14px] leading-relaxed" style={{ color: '#6b7280' }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SAFETY ───────────────────────────────────────────────────── */}
      <section className="max-w-[740px] mx-auto px-6 py-20 text-center">
        <div className="inline-flex items-center gap-2 mb-5 px-4 py-2 rounded-full border text-[13px]" style={{ borderColor: '#e5e7eb', color: '#6b7280' }}>
          🔒 Private &amp; Safe
        </div>
        <h2 className="font-black tracking-tight mb-4" style={{ fontSize: 'clamp(24px,3.5vw,38px)', color: '#0f0f0f' }}>
          Your rehearsals stay yours.
        </h2>
        <p className="text-[16px] leading-relaxed mb-8" style={{ color: '#6b7280' }}>
          RehearseAI supports respectful, consent-based communication only. Content is never used to train AI. Sensitive transcripts can be auto-deleted after 7 or 30 days — or immediately.
        </p>
        <div className="grid grid-cols-3 gap-4 text-[13px]">
          {['No adult or explicit content','Conversations never shared','Delete anytime'].map((t) => (
            <div key={t} className="flex items-center gap-2 justify-center" style={{ color: '#374151' }}>
              <span style={{ color: '#059669' }}>✓</span> {t}
            </div>
          ))}
        </div>
      </section>

      {/* ── FINAL CTA ────────────────────────────────────────────────── */}
      <section className="py-24" style={{ background: theme.heroGrad }}>
        <div className="max-w-[800px] mx-auto px-6 text-center">
          <h2 className="font-black tracking-tight mb-4" style={{ fontSize: 'clamp(32px,5vw,60px)', color: '#0f0f0f', lineHeight: 1.1 }}>
            The conversation is coming.<br />
            <span className="gradient-text">Walk in ready.</span>
          </h2>
          <p className="text-[17px] mb-10" style={{ color: '#6b7280' }}>
            Join thousands of people who rehearse before the moment arrives.
          </p>
          <button
            onClick={() => nav('/new')}
            className="px-10 py-5 rounded-full text-[16px] font-bold text-white transition-all hover:opacity-90"
            style={{ background: theme.accent, boxShadow: `0 6px 32px ${theme.accentShadow}` }}
          >
            Start your first rehearsal — free →
          </button>
          <p className="mt-4 text-[13px]" style={{ color: '#9ca3af' }}>No credit card required. Works in your browser.</p>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────────────── */}
      <footer className="border-t py-8 px-8 flex items-center justify-between text-[13px]" style={{ borderColor: '#f0f0f0', color: '#9ca3af' }}>
        <span className="font-bold" style={{ color: '#0f0f0f' }}>Rehearse<span style={{ color: theme.accent }}>AI</span></span>
        <span>© 2026 RehearseAI. Not therapy. Not legal advice. Just preparation.</span>
        <div className="flex gap-6">
          {['Privacy','Terms','Safety'].map((l) => <a key={l} href="#" className="hover:text-gray-600 transition-colors">{l}</a>)}
        </div>
      </footer>
    </div>
  );
}
