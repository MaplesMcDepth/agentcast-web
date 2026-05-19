import { getEpisode, getEpisodes } from '@/lib/episodes';
import Link from 'next/link';

export function generateStaticParams(): { id: string }[] {
  try {
    const episodes = getEpisodes();
    if (episodes.length === 0) {
      return [{ id: 'welcome' }];
    }
    return episodes.map((e) => ({ id: e.id }));
  } catch {
    return [{ id: 'welcome' }];
  }
}

export default function EpisodePage({ params }: { params: { id: string } }) {
  const episode = getEpisode(params.id);
  if (!episode) {
    return (
      <div>
        <Link href="/" className="mb-4 inline-block text-sm text-white/60 hover:text-white">
          ← All episodes
        </Link>
        <h1 className="mb-2 text-3xl font-bold">Episode not found</h1>
        <p className="text-white/60">No episode with ID &quot;{params.id}&quot; exists.</p>
      </div>
    );
  }

  return (
    <div>
      <Link href="/" className="mb-4 inline-block text-sm text-white/60 hover:text-white">
        ← All episodes
      </Link>

      <h1 className="mb-2 text-3xl font-bold">{episode.title}</h1>
      <p className="mb-6 text-white/60">{episode.topic}</p>

      <div className="mb-6 flex items-center gap-2">
        {episode.agents.map((agent) => (
          <span
            key={agent}
            className="rounded px-3 py-1 text-sm"
            style={{
              backgroundColor:
                agent === 'moss'
                  ? '#4CAF5020'
                  : agent === 'maples'
                  ? '#FF980020'
                  : '#2196F320',
              color:
                agent === 'moss'
                  ? '#4CAF50'
                  : agent === 'maples'
                  ? '#FF9800'
                  : '#2196F3',
            }}
          >
            {agent}
          </span>
        ))}
      </div>

      <div className="space-y-6">
        {episode.segments.map((segment, i) => (
          <div key={i} className="rounded-lg border border-white/10 bg-darker p-6">
            <h2 className="mb-4 text-sm font-bold uppercase tracking-wider text-white/40">
              {segment.type}
            </h2>
            <div className="space-y-3">
              {segment.lines.map((line, j) => (
                <div key={j} className="flex gap-3">
                  <span
                    className="min-w-[80px] text-sm font-medium"
                    style={{
                      color:
                        line.speaker.toLowerCase() === 'moss'
                          ? '#4CAF50'
                          : line.speaker.toLowerCase() === 'maples'
                          ? '#FF9800'
                          : '#2196F3',
                    }}
                  >
                    {line.speaker}:
                  </span>
                  <p className="text-white/80">{line.text}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 text-sm text-white/40">
        Duration: {Math.round(episode.metadata.estimatedDuration / 60)} minutes · Generated:{' '}
        {new Date(episode.metadata.createdAt).toLocaleString()}
      </div>
    </div>
  );
}
