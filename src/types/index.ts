export type AttachmentType = 'secure' | 'anxious' | 'avoidant' | 'fearful';

export type LoveLanguage = 'words' | 'time' | 'gifts' | 'acts' | 'touch';

export type LeeStyle = 'eros' | 'ludus' | 'storge' | 'pragma' | 'mania' | 'agape';

export type Triad = 'intimacy' | 'passion' | 'commitment';

export interface LoveDna {
  attachment: {
    anxiety: number;
    avoidance: number;
    type: AttachmentType;
  };
  need: Record<LoveLanguage, number>;
  expression: Record<LoveLanguage, number>;
  lee: Record<LeeStyle, number>;
  triad: Record<Triad, number>;
  belief: number;
}

export interface LoveArchetypeResult {
  id: string;
  name: string;
  slogan: string;
  tagline: string;
  lee: LeeStyle;
  attachment: AttachmentType;
  portrait: string;
  spark: string;
  flip: string;
  advice: string[];
  fit: number;
}

export interface TopArchetype {
  id: string;
  name: string;
  slogan: string;
  fit: number;
}

export type AnswerValue = number | string;

export interface Answers {
  [questionId: string]: AnswerValue;
}

export interface Soulmate {
  name: string;
  age: number;
  occupation: string;
  city: string;
  traits: string[];
  loveView: string;
  expression: string;
  mbti: string;
  attachment: string;
  lifeGoal: string;
  hobbies: string[];
  strengths: string[];
  weaknesses: string[];
  vulnerability: string;
  firstImpression: string;
  conflictArea: string;
  avatarPrompt: string;
}

export interface SoulmateMatch {
  type: 'best' | 'soul' | 'growth';
  typeLabel: string;
  matchScore: number;
  reason: string;
  pros: string[];
  cons: string[];
  soulmate: Soulmate;
}

export interface RelationshipState {
  love: number;
  trust: number;
  communication: number;
  passion: number;
  responsibility: number;
  growth: number;
  intimacy: number;
  conflict: number;
  commitment: number;
}

export interface StoryChoice {
  text: string;
  effects: Partial<RelationshipState>;
}

export interface StoryEvent {
  stage: 'meet' | 'crush' | 'ambiguous' | 'relationship' | 'life';
  scene: string;
  story: string;
  illustrationPrompt: string;
  choices: StoryChoice[];
  chosenChoiceIndex?: number;
}

export interface Ending {
  title: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  achievement: string;
  number: string;
  prose: string;
  illustrationPrompt: string;
}

export interface Replay {
  firstCrush: string;
  biggestTurningPoint: string;
  happiestMoment: string;
  biggestRegret: string;
  mostInfluentialChoice: string;
  ifRestart: string;
  advice: string[];
}

export interface DnaAnalyzeResponse {
  loveDna: LoveDna;
  summary: string;
  personality: LoveArchetypeResult;
  top3: TopArchetype[];
}

export interface SoulmateGenerateResponse {
  matches: SoulmateMatch[];
}

export interface AppState {
  answers: Answers;
  loveDna: LoveDna | null;
  dnaSummary: string;
  personality: LoveArchetypeResult | null;
  top3: TopArchetype[] | null;
  soulmateMatches: SoulmateMatch[] | null;
  selectedMatch: SoulmateMatch | null;
  relationshipState: RelationshipState;
  history: StoryEvent[];
  ending: Ending | null;
  replay: Replay | null;

  setAnswer: (questionId: string, value: AnswerValue) => void;
  setLoveDna: (dna: LoveDna, summary: string, personality: LoveArchetypeResult, top3: TopArchetype[]) => void;
  setSoulmateMatches: (matches: SoulmateMatch[]) => void;
  selectMatch: (match: SoulmateMatch) => void;
  addEvent: (event: StoryEvent, choiceIndex: number) => void;
  setEnding: (ending: Ending) => void;
  setReplay: (replay: Replay) => void;
  reset: () => void;
}

export const initialRelationshipState: RelationshipState = {
  love: 50,
  trust: 50,
  communication: 50,
  passion: 50,
  responsibility: 50,
  growth: 50,
  intimacy: 40,
  conflict: 30,
  commitment: 40,
};
