export type CategoryKey =
  | 'career' | 'workplace' | 'leadership' | 'customer'
  | 'family' | 'personal' | 'health' | 'everyday';

export interface Theme {
  accent: string;
  accentLight: string;
  accentShadow: string;
  heroGrad: string;
  label: string;
}

export interface Persona {
  avatar: string;
  name: string;
  role: string;
  diff: string;
  diffColor: string;
  diffText: string;
}

export interface CatScore {
  name: string;
  val: number;
  color: string;
}

export interface ScenarioContent {
  label: string;
  strategyH1: string;
  strategyGoal: string;
  openingLine: string;
  openingNote: string;
  closingLine: string;
  closingNote: string;
  keyPoints: string[];
  risks: string[];
  avoids: string[];
  tip: string;
  persona: Persona;
  chatScenario: string;
  chatMeta: string;
  messages: { role: 'ai' | 'user'; sender: string; text: string }[];
  coachTip: string;
  quickReplies: string[];
  feedbackVerdict: string;
  feedbackSummary: string;
  feedbackScore: number;
  strengths: string[];
  improvements: string[];
  phraseOld: string;
  phraseNew: string;
  catScores: CatScore[];
}

export interface Message {
  id: string;
  role: 'ai' | 'user' | 'coach';
  sender: string;
  text: string;
  typing?: boolean;
}

export interface RehearsalState {
  category: CategoryKey;
  formData: Record<string, string>;
  messages: Message[];
  coachVisible: boolean;
  difficulty: 'supportive' | 'realistic' | 'stress';
  tones: string[];
}
