import { create } from 'zustand';
import type { CategoryKey, Message } from './types';

interface Store {
  category: CategoryKey;
  formData: Record<string, string>;
  selectedTones: string[];
  difficulty: 'supportive' | 'realistic' | 'stress';
  messages: Message[];
  coachVisible: boolean;
  scriptVariant: 'standard' | 'confident' | 'gentle' | 'short';

  setCategory: (k: CategoryKey) => void;
  setFormData: (k: string, v: string) => void;
  toggleTone: (t: string) => void;
  setDifficulty: (d: Store['difficulty']) => void;
  addMessage: (m: Message) => void;
  setMessages: (ms: Message[]) => void;
  toggleCoach: () => void;
  setCoachVisible: (v: boolean) => void;
  setScriptVariant: (v: Store['scriptVariant']) => void;
  resetRehearsal: () => void;
}

export const useStore = create<Store>((set) => ({
  category: 'career',
  formData: {},
  selectedTones: ['Confident', 'Professional'],
  difficulty: 'realistic',
  messages: [],
  coachVisible: false,
  scriptVariant: 'standard',

  setCategory: (k) => set({ category: k, formData: {}, selectedTones: [], messages: [], coachVisible: false }),
  setFormData:  (k, v) => set((s) => ({ formData: { ...s.formData, [k]: v } })),
  toggleTone:   (t) => set((s) => ({
    selectedTones: s.selectedTones.includes(t)
      ? s.selectedTones.filter((x) => x !== t)
      : [...s.selectedTones, t],
  })),
  setDifficulty: (d) => set({ difficulty: d }),
  addMessage:    (m) => set((s) => ({ messages: [...s.messages, m] })),
  setMessages:   (ms) => set({ messages: ms }),
  toggleCoach:   () => set((s) => ({ coachVisible: !s.coachVisible })),
  setCoachVisible: (v) => set({ coachVisible: v }),
  setScriptVariant: (v) => set({ scriptVariant: v }),
  resetRehearsal: () => set({ messages: [], coachVisible: false, formData: {}, selectedTones: [], difficulty: 'realistic' }),
}));
