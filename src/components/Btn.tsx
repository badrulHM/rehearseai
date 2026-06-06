import { type ButtonHTMLAttributes } from 'react';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost' | 'soft';
  size?: 'sm' | 'md' | 'lg';
}

export default function Btn({ variant = 'primary', size = 'md', className = '', style, children, ...rest }: Props) {
  const sizes = {
    sm: 'px-4 py-2 text-[13px]',
    md: 'px-5 py-[10px] text-[14px]',
    lg: 'px-7 py-[13px] text-[15px]',
  };

  const base = 'inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-150 border-0 cursor-pointer select-none';

  const variantStyles: Record<string, React.CSSProperties> = {
    primary: { background: 'var(--accent)', color: '#fff', boxShadow: '0 2px 16px var(--accent-shadow)' },
    outline: { background: '#fff', color: '#374151', border: '1.5px solid #e5e7eb' },
    soft:    { background: 'var(--accent-light)', color: 'var(--accent)' },
    ghost:   { background: 'transparent', color: '#6b7280' },
  };

  return (
    <button
      className={`${base} ${sizes[size]} hover:opacity-90 active:scale-[.98] ${className}`}
      style={{ ...variantStyles[variant], ...style }}
      {...rest}
    >
      {children}
    </button>
  );
}
