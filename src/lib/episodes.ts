import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';

export interface Episode {
  id: string;
  title: string;
  topic: string;
  agents: string[];
  segments: { type: string; lines: { speaker: string; text: string }[] }[];
  metadata: {
    estimatedDuration: number;
    createdAt: string;
    basedOnWork?: boolean;
  };
}

const EPISODES_DIR = join(process.cwd(), 'public', 'episodes');

export function getEpisodes(): Episode[] {
  try {
    const files = readdirSync(EPISODES_DIR);
    const episodes: Episode[] = [];

    for (const file of files) {
      if (!file.endsWith('.json') || file.includes('-meta')) continue;
      try {
        const data = JSON.parse(readFileSync(join(EPISODES_DIR, file), 'utf-8'));
        episodes.push({
          id: file.replace('.json', ''),
          title: data.title || 'Untitled Episode',
          topic: data.topic || 'Unknown Topic',
          agents: data.agents || [],
          segments: data.segments || [],
          metadata: data.metadata || {},
        });
      } catch {
        // skip invalid files
      }
    }

    return episodes.sort((a, b) => {
      const dateA = new Date(a.metadata.createdAt || 0);
      const dateB = new Date(b.metadata.createdAt || 0);
      return dateB.getTime() - dateA.getTime();
    });
  } catch {
    return [];
  }
}

export function getEpisode(id: string): Episode | null {
  const episodes = getEpisodes();
  return episodes.find((e) => e.id === id) || null;
}
