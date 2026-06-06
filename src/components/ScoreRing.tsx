import { useEffect, useState } from 'react';

interface Props { score: number; size?: number }

export default function ScoreRing({ score, size = 120 }: Props) {
  const r = 46;
  const circ = 2 * Math.PI * r;
  const [offset, setOffset] = useState(circ);

  useEffect(() => {
    const t = setTimeout(() => setOffset(circ - (score / 100) * circ), 200);
    return () => clearTimeout(t);
  }, [score, circ]);

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox="0 0 120 120" style={{ transform: 'rotate(-90deg)' }}>
        <circle cx="60" cy="60" r={r} fill="none" stroke="#e8e6e1" strokeWidth="10" />
        <circle
          cx="60" cy="60" r={r} fill="none"
          stroke="var(--accent)" strokeWidth="10"
          strokeDasharray={circ}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="ring-progress"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center font-black text-3xl tracking-tight" style={{ color: 'var(--accent)' }}>
        {score}
      </div>
    </div>
  );
}
