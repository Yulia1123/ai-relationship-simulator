import { create } from 'zustand';
import type { AppState, Answers, AnswerValue, RelationshipState, StoryEvent, TopArchetype, LoveDna, LoveArchetypeResult } from '@/types';
import { initialRelationshipState } from '@/types';

const defaultAnswers: Answers = {};

const clampState = (state: RelationshipState): RelationshipState => {
  const next = { ...state };
  (Object.keys(next) as Array<keyof RelationshipState>).forEach((key) => {
    next[key] = Math.max(0, Math.min(100, next[key]));
  });
  return next;
};

export const useAppStore = create<AppState>((set) => ({
  answers: defaultAnswers,
  loveDna: null,
  dnaSummary: '',
  personality: null,
  top3: null,
  soulmateMatches: null,
  selectedMatch: null,
  relationshipState: { ...initialRelationshipState },
  history: [],
  ending: null,
  replay: null,

  setAnswer: (questionId: string, value: AnswerValue) =>
    set((state) => ({
      answers: { ...state.answers, [questionId]: value },
    })),

  setLoveDna: (dna: LoveDna, summary: string, personality: LoveArchetypeResult, top3: TopArchetype[]) =>
    set({ loveDna: dna, dnaSummary: summary, personality, top3 }),

  setSoulmateMatches: (matches) => set({ soulmateMatches: matches }),

  selectMatch: (match) => set({ selectedMatch: match }),

  addEvent: (event, choiceIndex) =>
    set((state) => {
      const choice = event.choices[choiceIndex];
      const effects = choice?.effects || {};
      const nextState = { ...state.relationshipState };
      (Object.keys(effects) as Array<keyof RelationshipState>).forEach((key) => {
        const delta = effects[key];
        if (typeof delta === 'number') {
          nextState[key] = nextState[key] + delta;
        }
      });
      const eventWithChoice: StoryEvent = { ...event, chosenChoiceIndex: choiceIndex };
      return {
        history: [...state.history, eventWithChoice],
        relationshipState: clampState(nextState),
      };
    }),

  setEnding: (ending) => set({ ending }),

  setReplay: (replay) => set({ replay }),

  reset: () =>
    set({
      answers: defaultAnswers,
      loveDna: null,
      dnaSummary: '',
      personality: null,
      top3: null,
      soulmateMatches: null,
      selectedMatch: null,
      relationshipState: { ...initialRelationshipState },
      history: [],
      ending: null,
      replay: null,
    }),
}));
