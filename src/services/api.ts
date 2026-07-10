import type {
  Answers,
  DnaAnalyzeResponse,
  SoulmateMatch,
  StoryEvent,
  RelationshipState,
  Ending,
  Replay,
} from '@/types';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001';

async function post<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  if (!res.ok || !data.success) {
    throw new Error(data.error || '请求失败');
  }
  return data.data;
}

export async function analyzeDna(answers: Answers): Promise<DnaAnalyzeResponse> {
  return post('/api/dna/analyze', answers);
}

export async function generateSoulmate(
  loveDna: DnaAnalyzeResponse['loveDna']
): Promise<{ matches: SoulmateMatch[] }> {
  return post('/api/soulmate/generate', { loveDna });
}

export async function generateEvent(payload: {
  eventIndex: number;
  totalEvents: number;
  loveDna: DnaAnalyzeResponse['loveDna'];
  soulmate: SoulmateMatch['soulmate'];
  relationshipState: RelationshipState;
  history: StoryEvent[];
}): Promise<{ event: StoryEvent }> {
  return post('/api/story/event', payload);
}

export async function generateEnding(payload: {
  loveDna: DnaAnalyzeResponse['loveDna'];
  soulmate: SoulmateMatch['soulmate'];
  history: StoryEvent[];
  finalState: RelationshipState;
}): Promise<{ ending: Ending }> {
  return post('/api/story/ending', payload);
}

export async function generateReplay(payload: {
  loveDna: DnaAnalyzeResponse['loveDna'];
  soulmate: SoulmateMatch['soulmate'];
  history: StoryEvent[];
  finalState: RelationshipState;
  ending: Ending;
}): Promise<{ replay: Replay }> {
  return post('/api/story/replay', payload);
}
