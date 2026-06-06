import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store';
import { SCENARIOS } from '../data/scenarios';
import { THEMES } from '../data/themes';

const AI_REPLIES: Record<string, string[]> = {
  career:     ["That's a fair point. I'll need to check what's possible within the current budget cycle.", "I hear you — the work you've done on Q2 is hard to argue with. Let me think about timing.", "Can you send me the market data you mentioned? That would help me make the case upward."],
  workplace:  ["Okay, that's fair. I didn't realise it was creating blockers for the team.", "I've had some things going on. Can we talk about what specifically needs to change?", "I appreciate you coming to me directly. What would help most right now?"],
  leadership: ["What does this mean for our current workstreams?", "I need more clarity before I can reassure my direct reports.", "How long have you known about this?"],
  customer:   ["That's not good enough. I need to know what you're doing about this TODAY.", "My director wants answers. What am I supposed to tell him?", "We've been a client for five years. Does that mean nothing to you?"],
  family:     ["I just don't understand why this is so hard for you to see.", "Fine. If that's how you feel about it.", "I'm not angry, I'm just... really disappointed."],
  personal:   ["[takes your hand] I've been waiting for this moment too.", "[quietly, eyes glistening] I love you.", "A thousand times yes."],
  health:     ["We'll need to run some tests first before I can say anything definitive.", "Can you describe when the symptoms are at their worst?", "I'll refer you to a specialist. It may take a few weeks to get an appointment."],
  everyday:   ["Of course, no worries at all! I'll figure something out.", "Thanks for being honest with me. I genuinely didn't realise I was putting pressure on you.", "That's totally fair. I'll give you more notice next time."],
};

let replyIdx = 0;
function getMockReply(cat: string): string {
  const replies = AI_REPLIES[cat] || AI_REPLIES.career;
  return replies[replyIdx++ % replies.length];
}

export default function Roleplay() {
  const nav = useNavigate();
  const category = useStore((s) => s.category);
  const { messages, addMessage, setMessages, coachVisible, toggleCoach, setCoachVisible } = useStore();
  const sc = SCENARIOS[category];
  const theme = THEMES[category];
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [ended, setEnded] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);
  const taRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (messages.length === 0) {
      setMessages(sc.messages.map((m, i) => ({ id: `seed-${i}`, role: m.role, sender: m.sender, text: m.text })));
    }
  }, [category]);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages, isTyping]);

  const send = async () => {
    const text = input.trim();
    if (!text || isTyping || ended) return;
    setInput('');
    setCoachVisible(false);
    addMessage({ id: Date.now().toString(), role: 'user', sender: 'You', text });
    setIsTyping(true);
    await new Promise((r) => setTimeout(r, 1100 + Math.random() * 700));
    addMessage({ id: (Date.now() + 1).toString(), role: 'ai', sender: sc.persona.name, text: getMockReply(category) });
    setIsTyping(false);
  };

  const handleKey = (e: React.KeyboardEvent) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); } };

  const handleCoach = () => {
    if (!coachVisible) {
      addMessage({ id: `coach-${Date.now()}`, role: 'coach', sender: 'Coach', text: sc.coachTip });
    }
    toggleCoach();
  };

  const handleRedo = () => {
    const last = [...messages].reverse().find((m) => m.role === 'user');
    if (last) setMessages(messages.filter((m) => m.id !== last.id));
  };

  return (
    <div className="flex h-[calc(100vh-64px)] bg-white screen-enter">

      {/* ── Left sidebar ────────────────────────────────────────────── */}
      <aside className="w-[260px] shrink-0 flex flex-col gap-5 p-5 overflow-y-auto" style={{ borderRight: '1px solid #f0f0f0' }}>
        {/* Persona */}
        <div className="rounded-[16px] p-4" style={{ background: '#fafafa', border: '1px solid #f0f0f0' }}>
          <div className="w-12 h-12 rounded-[14px] flex items-center justify-center text-[24px] mb-3"
            style={{ background: theme.accentLight }}>{sc.persona.avatar}</div>
          <p className="font-bold text-[15px]" style={{ color: '#0f0f0f' }}>{sc.persona.name}</p>
          <p className="text-[12px] mt-1 leading-snug" style={{ color: '#6b7280' }}>{sc.persona.role}</p>
          <div className="inline-flex items-center gap-1 mt-3 px-3 py-1 rounded-full text-[12px] font-semibold"
            style={{ background: sc.persona.diffColor, color: sc.persona.diffText }}>
            {sc.persona.diff}
          </div>
        </div>

        {/* Goal */}
        <div>
          <p className="text-[11px] font-bold uppercase tracking-widest mb-2" style={{ color: '#9ca3af' }}>Your goal</p>
          <p className="text-[13px] leading-relaxed" style={{ color: '#374151' }}>
            {useStore.getState().formData['outcome'] || sc.strategyGoal.replace('Goal: ', '')}
          </p>
          <div className="mt-3 rounded-[12px] p-3 border" style={{ background: theme.accentLight, borderColor: `${theme.accent}30` }}>
            <p className="text-[10px] font-bold uppercase tracking-wide mb-1" style={{ color: theme.accent }}>💡 Tip</p>
            <p className="text-[12px] leading-snug" style={{ color: theme.accent }}>{sc.tip.slice(0, 110)}…</p>
          </div>
        </div>

        {/* Adjust difficulty */}
        <div>
          <p className="text-[11px] font-bold uppercase tracking-widest mb-2" style={{ color: '#9ca3af' }}>Adjust</p>
          {['🕊️ Make it easier', '🔥 Make it harder'].map((b) => (
            <button key={b} className="w-full px-3 py-2 mb-2 rounded-[10px] text-[13px] font-medium text-left border transition-colors hover:bg-gray-50"
              style={{ borderColor: '#f0f0f0', color: '#374151', background: '#fff' }}>{b}</button>
          ))}
        </div>
      </aside>

      {/* ── Chat area ───────────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* Chat header */}
        <div className="px-6 py-4 flex justify-between items-center shrink-0" style={{ borderBottom: '1px solid #f0f0f0', background: '#fff' }}>
          <div>
            <p className="font-semibold text-[15px]" style={{ color: '#0f0f0f' }}>{sc.chatScenario}</p>
            <p className="text-[12px] mt-[2px]" style={{ color: '#9ca3af' }}>{sc.chatMeta}</p>
          </div>
          <button className="w-9 h-9 rounded-[10px] border flex items-center justify-center text-[15px] hover:bg-gray-50 transition-colors"
            style={{ borderColor: '#f0f0f0' }}>🚩</button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-6 py-6 flex flex-col gap-4" style={{ background: '#fafafa' }}>
          {messages.map((m) => {
            if (m.role === 'coach') return (
              <div key={m.id} className="rounded-[16px] p-5 border" style={{ background: '#faf5ff', borderColor: '#e9d5ff' }}>
                <p className="text-[11px] font-bold uppercase tracking-widest mb-2" style={{ color: '#7c3aed' }}>🎯 Coach (paused)</p>
                <p className="text-[14px] leading-relaxed" style={{ color: '#5b21b6' }}>{m.text}</p>
                <button onClick={() => setCoachVisible(false)} className="mt-3 text-[12px] font-semibold underline" style={{ color: '#7c3aed' }}>Resume roleplay →</button>
              </div>
            );

            const isUser = m.role === 'user';
            return (
              <div key={m.id} className={`flex gap-3 max-w-[78%] ${isUser ? 'flex-row-reverse ml-auto' : ''}`}>
                <div className="w-8 h-8 rounded-[10px] flex items-center justify-center text-[14px] shrink-0 border"
                  style={{ background: isUser ? theme.accentLight : '#fff', borderColor: '#f0f0f0' }}>
                  {isUser ? '🧑' : sc.persona.avatar}
                </div>
                <div>
                  <p className="text-[11px] font-semibold mb-[5px]" style={{ color: '#9ca3af' }}>{m.sender}</p>
                  <div className="px-4 py-3 rounded-[14px] text-[14px] leading-relaxed"
                    style={isUser
                      ? { background: theme.accent, color: '#fff', borderTopRightRadius: 4 }
                      : { background: '#fff', border: '1px solid #f0f0f0', color: '#0f0f0f', borderTopLeftRadius: 4 }}>
                    {m.text}
                  </div>
                </div>
              </div>
            );
          })}

          {isTyping && (
            <div className="flex gap-3 max-w-[78%]">
              <div className="w-8 h-8 rounded-[10px] flex items-center justify-center text-[14px] border" style={{ background: '#fff', borderColor: '#f0f0f0' }}>{sc.persona.avatar}</div>
              <div className="px-4 py-3 rounded-[14px] bg-white border flex items-center gap-1" style={{ borderColor: '#f0f0f0' }}>
                <div className="typing-dot" /><div className="typing-dot" /><div className="typing-dot" />
              </div>
            </div>
          )}
          <div ref={endRef} />
        </div>

        {/* Quick replies */}
        <div className="px-6 pt-3 pb-1 flex gap-2 flex-wrap shrink-0" style={{ background: '#fff' }}>
          {sc.quickReplies.map((r) => (
            <button key={r} onClick={() => { setInput(r); taRef.current?.focus(); }}
              className="px-4 py-[6px] rounded-full text-[12px] border transition-all hover:border-gray-300 truncate max-w-[220px]"
              style={{ borderColor: '#e5e7eb', background: '#fff', color: '#374151' }}>
              {r}
            </button>
          ))}
        </div>

        {/* Input area */}
        <div className="px-6 py-4 bg-white shrink-0" style={{ borderTop: '1px solid #f0f0f0' }}>
          <div className="flex gap-3 items-end mb-3">
            <textarea
              ref={taRef} rows={1}
              placeholder={ended ? 'Rehearsal ended' : 'Type your reply…'}
              disabled={ended || isTyping}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKey}
              className="flex-1 px-4 py-3 rounded-[12px] text-[14px] resize-none outline-none border transition-all"
              style={{ borderColor: '#e5e7eb', fontFamily: 'inherit', minHeight: 46, maxHeight: 120, color: '#0f0f0f', background: '#fafafa' }}
              onFocus={(e) => { e.target.style.borderColor = theme.accent; e.target.style.boxShadow = `0 0 0 3px ${theme.accentLight}`; }}
              onBlur={(e)  => { e.target.style.borderColor = '#e5e7eb'; e.target.style.boxShadow = 'none'; }}
            />
            <button onClick={send} disabled={!input.trim() || isTyping || ended}
              className="w-11 h-11 rounded-[12px] flex items-center justify-center text-white text-[18px] shrink-0 transition-all hover:opacity-90 disabled:opacity-30"
              style={{ background: theme.accent }}>↑</button>
          </div>
          <div className="flex gap-2 flex-wrap">
            <button onClick={handleCoach}
              className="px-4 py-[6px] rounded-full text-[13px] font-medium border transition-all"
              style={{ color: '#7c3aed', borderColor: '#e9d5ff', background: '#faf5ff' }}>
              ⏸ Pause &amp; coach me
            </button>
            <button onClick={handleRedo}
              className="px-4 py-[6px] rounded-full text-[13px] font-medium border transition-all hover:bg-gray-50"
              style={{ color: '#6b7280', borderColor: '#e5e7eb', background: '#fff' }}>
              ↩ Redo last message
            </button>
            <button onClick={() => { setEnded(true); nav('/feedback'); }}
              className="px-4 py-[6px] rounded-full text-[13px] font-medium border ml-auto"
              style={{ color: '#dc2626', borderColor: '#fecdd3', background: '#fef2f2' }}>
              End rehearsal
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
