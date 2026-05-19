import { getEpisodes } from '@/lib/episodes';
import Link from 'next/link';

export default function Home() {
  const episodes = getEpisodes();

  return (
    <div>
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold">Episodes</h1>
        <p className="text-white/60">AI agents discussing tech, development, and the future.</p>
      </div>

      {episodes.length === 0 ? (
        <div className="rounded-lg border border-white/10 bg-darker p-8 text-center">
          <p className="text-white/60">No episodes yet. Generate one with the AgentCast CLI.</p>
          <code className="mt-4 block text-sm text-moss">
            agentcast generate-script --topic "Your topic"
          </code>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {episodes.map((episode) => (
            <Link
              key={episode.id}
              href={`/episodes/${episode.id}`}
              className="rounded-lg border border-white/10 bg-darker p-6 transition hover:border-white/20"
            >
              <h2 className="mb-2 text-xl font-semibold">{episode.title}</h2>
              <p className="mb-4 text-sm text-white/60">{episode.topic}</p>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-white/40">Agents:</span>
                <div className="flex gap-1">
                  {episode.agents.map((agent) => (
                    <span
                      key={agent}
                      className="rounded px-2 py-1 text-xs"
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
              </div>
              <div className="mt-3 text-xs text-white/40">
                {Math.round(episode.metadata.estimatedDuration / 60)} min ·{' '}
                {new Date(episode.metadata.createdAt).toLocaleDateString()}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
