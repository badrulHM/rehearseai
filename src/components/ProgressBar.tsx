interface Props { step: number; total?: number; label?: string }
export default function ProgressBar({ step, total = 4, label }: Props) {
  return (
    <div className="mb-10">
      <div className="flex items-center justify-between mb-2">
        <span className="text-[12px] font-semibold uppercase tracking-wider" style={{ color: '#9ca3af' }}>
          {label || `Step ${step} of ${total}`}
        </span>
        <span className="text-[12px] font-semibold" style={{ color: 'var(--accent)' }}>
          {Math.round((step / total) * 100)}%
        </span>
      </div>
      <div className="w-full h-[3px] rounded-full overflow-hidden" style={{ background: '#f0f0f0' }}>
        <div className="h-full rounded-full transition-all duration-500" style={{ width: `${(step / total) * 100}%`, background: 'var(--accent)' }} />
      </div>
    </div>
  );
}
