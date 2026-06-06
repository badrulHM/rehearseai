import type { CategoryKey } from '../types';

export interface Category {
  key: CategoryKey;
  icon: string;
  name: string;
  desc: string;
  subTypes: string[];
  tones: string[];
  intakeFields: {
    situation: { label: string; placeholder: string; defaultValue: string };
    who: { label: string; placeholder: string; defaultValue: string };
    outcome: { label: string; defaultValue: string };
    concern: { label: string; defaultValue: string };
    extra?: { label: string; type: 'chips' | 'textarea'; options?: string[]; placeholder?: string };
  };
}

export const CATEGORIES: Category[] = [
  {
    key: 'career',
    icon: '💼', name: 'Career',
    desc: 'Interviews, salary, promotion, resignation',
    subTypes: ['Salary negotiation','Job interview','Promotion ask','Resignation','Flexible work','Asking for feedback','Career gap explanation'],
    tones: ['Confident','Professional','Warm','Direct','Calm','Firm'],
    intakeFields: {
      situation: { label: 'What career conversation do you need to prepare for?', placeholder: 'e.g. I want to ask my manager for a 15% salary increase...', defaultValue: 'I want to ask my manager for a 15% salary increase. I\'ve been in the role for 18 months and led our biggest project this year.' },
      who:       { label: 'Who are you speaking with?', placeholder: 'e.g. My direct manager — supportive but data-driven', defaultValue: 'My direct manager Sarah — supportive but budget-conscious and data-driven' },
      outcome:   { label: 'What outcome do you want?', defaultValue: 'A commitment to review my salary within 30 days, or a clear reason why not' },
      concern:   { label: 'What are you worried about?', defaultValue: 'Sounding demanding or putting her on the spot — I don\'t want to damage our relationship' },
      extra:     { label: 'What evidence supports your ask?', type: 'textarea', placeholder: 'e.g. Projects delivered, skills gained, market research...' },
    },
  },
  {
    key: 'workplace',
    icon: '🗣️', name: 'Workplace',
    desc: 'Conflict, feedback, performance, boundaries',
    subTypes: ['Giving feedback','Receiving difficult feedback','Conflict with colleague','Conflict with manager','Saying no professionally','Escalating a concern','Performance discussion'],
    tones: ['Direct','Respectful','Empathetic','Firm','Calm','Professional'],
    intakeFields: {
      situation: { label: 'What workplace situation are you preparing for?', placeholder: 'e.g. I need to give honest feedback to a colleague...', defaultValue: 'I need to give honest feedback to a colleague who keeps missing deadlines and it\'s affecting the whole team.' },
      who:       { label: 'Who is involved, and what is your working relationship?', placeholder: 'e.g. James — a peer, generally good relationship', defaultValue: 'James — a peer on my team, we\'ve worked together 2 years, generally good relationship but this has been building.' },
      outcome:   { label: 'What outcome do you want from this conversation?', defaultValue: 'Acknowledgement of the issue and a clear agreement on what changes, without making things awkward' },
      concern:   { label: 'What are you worried about?', defaultValue: 'Coming across as accusatory or creating long-term awkwardness in the team' },
      extra:     { label: 'What is the power dynamic?', type: 'chips', options: ['I manage them','We\'re peers','They manage me','I\'m more senior informally'] },
    },
  },
  {
    key: 'leadership',
    icon: '🏆', name: 'Leadership',
    desc: 'Team motivation, change, difficult meetings',
    subTypes: ['Delivering bad news','Explaining change','Managing resistance','Coaching a team member','Stakeholder disagreement','Team motivation','Managing up'],
    tones: ['Calm','Honest','Empathetic','Authoritative','Warm','Clear'],
    intakeFields: {
      situation: { label: 'What leadership conversation are you preparing for?', placeholder: 'e.g. I need to tell my team a project has been cancelled...', defaultValue: 'I need to tell my team that a major project has been cancelled and two roles may be at risk.' },
      who:       { label: 'Who is your audience?', placeholder: 'e.g. My team of 6 — high performers, emotionally invested', defaultValue: 'Team of 6 — high performers, emotionally invested in this project, likely to feel blindsided.' },
      outcome:   { label: 'What do you want people to feel at the end?', defaultValue: 'Informed, heard, and still able to trust leadership — even if they\'re disappointed' },
      concern:   { label: 'What are you worried about saying or getting wrong?', defaultValue: 'Over-promising on job security when I don\'t have full clarity yet' },
      extra:     { label: 'What resistance or reactions do you expect?', type: 'textarea', placeholder: 'e.g. Anger, disengagement, demands for answers you don\'t have...' },
    },
  },
  {
    key: 'customer',
    icon: '🤝', name: 'Customer & Sales',
    desc: 'Complaints, negotiation, service recovery',
    subTypes: ['Handling a complaint','Price negotiation','Delivering bad news','Handling objections','Service recovery','Customer retention','Asking for payment'],
    tones: ['Empathetic','Solution-focused','Calm','Professional','Accountable','Warm'],
    intakeFields: {
      situation: { label: 'What customer or sales situation are you preparing for?', placeholder: 'e.g. A long-term client is furious after a service outage...', defaultValue: 'A long-term client is furious after a service outage affected their operations. They\'re threatening to leave.' },
      who:       { label: 'How would you describe the customer\'s emotional state?', placeholder: '', defaultValue: 'Angry and threatening to escalate to senior leadership.' },
      outcome:   { label: 'What outcome do you need?', defaultValue: 'De-escalate the call, acknowledge what went wrong, and agree a next step that keeps the account' },
      concern:   { label: 'What are you worried about?', defaultValue: 'Being blamed for things outside my control, or making promises I can\'t keep' },
      extra:     { label: 'What authority do you have in this conversation?', type: 'chips', options: ['Full authority to resolve','Limited — goodwill only','Need to escalate','I\'m the final escalation'] },
    },
  },
  {
    key: 'family',
    icon: '🏡', name: 'Family',
    desc: 'Sensitive discussions, boundaries, apologies',
    subTypes: ['Sincere apology','Setting a boundary','Sensitive family discussion','Discussing a misunderstanding','Asking for support','Expressing disappointment','Repairing a relationship'],
    tones: ['Warm','Calm','Firm','Gentle','Empathetic','Loving'],
    intakeFields: {
      situation: { label: 'What family conversation do you need to prepare for?', placeholder: 'e.g. I need to tell my parents I won\'t attend the family holiday...', defaultValue: 'I need to tell my parents that I won\'t be attending the family holiday this year. They\'ll take it personally.' },
      who:       { label: 'Who are you speaking with?', placeholder: 'e.g. My mum — sensitive, tends to take things personally', defaultValue: 'My mum — she\'s sensitive and tends to take things personally. We\'re close but she can guilt-trip without realising.' },
      outcome:   { label: 'What do you hope for by the end of this conversation?', defaultValue: 'That she understands my decision, doesn\'t feel rejected, and we can move on without it lingering' },
      concern:   { label: 'What are you worried about?', defaultValue: 'It becoming a bigger conflict that damages the relationship for months' },
      extra:     { label: 'Is there emotional history that affects this conversation?', type: 'textarea', placeholder: 'e.g. Previous times this topic came up, past conflicts...' },
    },
  },
  {
    key: 'personal',
    icon: '💍', name: 'Personal & Heartfelt',
    desc: 'Proposals, expressing feelings, rebuilding trust',
    subTypes: ['Marriage proposal','Expressing feelings','Rebuilding trust','Apology to partner','Discussing commitment','Meeting future in-laws','Wedding vows','Long-distance conversation'],
    tones: ['Sincere','Warm','Romantic but natural','Vulnerable','Humorous and heartfelt'],
    intakeFields: {
      situation: { label: 'What heartfelt conversation are you preparing for?', placeholder: 'e.g. I want to propose to my partner of 4 years...', defaultValue: 'I want to propose to my partner of 4 years. I\'ve planned the setting, but I\'m terrified of freezing up or sounding rehearsed.' },
      who:       { label: 'Tell us about your partner', placeholder: 'Personality, what they value, what makes them feel loved...', defaultValue: 'She\'s thoughtful and values sincerity over grand gestures. She doesn\'t like feeling put on the spot but loves when I\'m vulnerable.' },
      outcome:   { label: 'What do you most want them to feel?', defaultValue: 'Completely certain that I mean every word. That this is coming from the heart, not a script.' },
      concern:   { label: 'What\'s your biggest fear about this conversation?', defaultValue: 'Crying before I finish, forgetting what I wanted to say, or sounding like I\'m reading from a card' },
      extra:     { label: 'Are there specific memories or words you want to include?', type: 'textarea', placeholder: 'Optional — anything meaningful to your relationship...' },
    },
  },
  {
    key: 'health',
    icon: '🩺', name: 'Health & Advocacy',
    desc: 'Doctor visits, disability, caregiving',
    subTypes: ['Speaking to a doctor','Asking for a referral','Discussing diagnosis with family','Disability conversation with employer','Caregiver discussion','Mental health disclosure','Asking for accommodations'],
    tones: ['Calm','Clear','Assertive','Collaborative','Prepared'],
    intakeFields: {
      situation: { label: 'What health or advocacy conversation do you need to prepare for?', placeholder: 'e.g. I need to speak to my GP about symptoms I\'ve been dismissing...', defaultValue: 'I need to speak to my GP about symptoms I\'ve been dismissing for months. I\'m worried they won\'t take me seriously.' },
      who:       { label: 'Who are you speaking with?', placeholder: 'e.g. My GP — busy, appointment-focused', defaultValue: 'My GP — I\'ve seen her a few times but feel like I never get enough time to explain properly.' },
      outcome:   { label: 'What outcome do you need from this conversation?', defaultValue: 'A referral, blood tests, or at minimum a follow-up plan — not just being told to rest' },
      concern:   { label: 'What are you worried about?', defaultValue: 'Being dismissed, minimising my own symptoms under pressure, or leaving without what I came for' },
      extra:     { label: 'What information do they need to understand?', type: 'textarea', placeholder: 'Key facts, symptoms, history, functional impact...' },
    },
  },
  {
    key: 'everyday',
    icon: '✨', name: 'Everyday Confidence',
    desc: 'Networking, small talk, asking for help',
    subTypes: ['Introducing myself','Networking event','Saying no politely','Making a complaint','Asking for help','Neighbour or tenant issue','Speaking to authority'],
    tones: ['Polite','Calm','Firm','Friendly but clear','Confident','Warm'],
    intakeFields: {
      situation: { label: 'What everyday conversation do you want to practise?', placeholder: 'e.g. A colleague keeps asking me to cover their shifts last-minute...', defaultValue: 'A colleague keeps asking me to cover their shifts last-minute and I feel unable to say no. I want to set a clear boundary.' },
      who:       { label: 'Who is the other person?', placeholder: 'Their role and how you know them...', defaultValue: 'A colleague at work — we\'re friendly but not close. I don\'t want to be rude but I need to be clear.' },
      outcome:   { label: 'What do you want to walk away having said?', defaultValue: 'A clear, polite no that doesn\'t leave room for negotiation but doesn\'t cause a fallout either' },
      concern:   { label: 'What makes this feel difficult?', defaultValue: 'I tend to say yes to avoid awkwardness and then resent it later. I don\'t want to seem unhelpful.' },
      extra:     { label: 'Has this happened before?', type: 'chips', options: ['First time raising it','Once before informally','Multiple times','It\'s becoming a pattern'] },
    },
  },
];
