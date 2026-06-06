import type { CategoryKey, Theme } from '../types';

export const THEMES: Record<CategoryKey, Theme> = {
  career: {
    accent: '#4f6ef7', accentLight: '#eef0fe', accentShadow: 'rgba(79,110,247,.28)',
    heroGrad: 'linear-gradient(135deg,#eef0fe 0%,#f0f2ff 60%,#f8f7f4 100%)',
    label: 'Career',
  },
  workplace: {
    accent: '#6366f1', accentLight: '#ede9fe', accentShadow: 'rgba(99,102,241,.28)',
    heroGrad: 'linear-gradient(135deg,#ede9fe 0%,#f5f3ff 60%,#f8f7f4 100%)',
    label: 'Workplace',
  },
  leadership: {
    accent: '#059669', accentLight: '#d1fae5', accentShadow: 'rgba(5,150,105,.25)',
    heroGrad: 'linear-gradient(135deg,#d1fae5 0%,#ecfdf5 60%,#f8f7f4 100%)',
    label: 'Leadership',
  },
  customer: {
    accent: '#d97706', accentLight: '#fef3c7', accentShadow: 'rgba(217,119,6,.25)',
    heroGrad: 'linear-gradient(135deg,#fef3c7 0%,#fffbeb 60%,#f8f7f4 100%)',
    label: 'Customer & Sales',
  },
  family: {
    accent: '#db2777', accentLight: '#fce7f3', accentShadow: 'rgba(219,39,119,.25)',
    heroGrad: 'linear-gradient(135deg,#fce7f3 0%,#fdf2f8 60%,#f8f7f4 100%)',
    label: 'Family',
  },
  personal: {
    accent: '#7c3aed', accentLight: '#ede9fe', accentShadow: 'rgba(124,58,237,.28)',
    heroGrad: 'linear-gradient(135deg,#ede9fe 0%,#f5f3ff 60%,#f8f7f4 100%)',
    label: 'Personal & Heartfelt',
  },
  health: {
    accent: '#0891b2', accentLight: '#cffafe', accentShadow: 'rgba(8,145,178,.25)',
    heroGrad: 'linear-gradient(135deg,#cffafe 0%,#ecfeff 60%,#f8f7f4 100%)',
    label: 'Health & Advocacy',
  },
  everyday: {
    accent: '#7c5cbf', accentLight: '#f3eeff', accentShadow: 'rgba(124,92,191,.25)',
    heroGrad: 'linear-gradient(135deg,#f3eeff 0%,#faf8ff 60%,#f8f7f4 100%)',
    label: 'Everyday Confidence',
  },
};
