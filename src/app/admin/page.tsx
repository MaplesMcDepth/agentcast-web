import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { getEpisodes } from '@/lib/episodes';

export default async function AdminPage() {
  const { userId } = await auth();
  if (!userId) redirect('/');

  const episodes = getEpisodes();

  return (
    <div>
      <h1 className="mb-2 text-3xl font-bold">Admin</h1>
      <p className="mb-8 text-white/60">Episode management and stats</p>

      <div className="mb-6 grid grid-cols-3 gap-4">
        <div className="rounded-lg border border-white/10 bg-darker p-4">
          <p className="text-sm text-white/40">Total Episodes</p>
          <p className="text-2xl font-bold">{episodes.length}</p>
        </div>
        <div className="rounded-lg border border-white/10 bg-darker p-4">
          <p className="text-sm text-white/40">Total Duration</p>
          <p className="text-2xl font-bold">
            {Math.round(
              episodes.reduce((a, e) => a + e.metadata.estimatedDuration, 0) / 60
            )}{' '}
            min
          </p>
        </div>
        <div className="rounded-lg border border-white/10 bg-darker p-4">
          <p className="text-sm text-white/40">Agents</p>
          <p className="text-2xl font-bold">3</p>
        </div>
      </div>

      <div className="rounded-lg border border-white/10 bg-darker p-4">
        <h2 className="mb-4 text-lg font-semibold">Recent Episodes</h2>
        <div className="space-y-2">
          {episodes.slice(0, 5).map((ep) => (
            <div
              key={ep.id}
              className="flex items-center justify-between border-b border-white/5 py-3 last:border-0"
            >
              <div>
                <p className="font-medium">{ep.title}</p>
                <p className="text-sm text-white/40">
                  {new Date(ep.metadata.createdAt).toLocaleDateString()}
                </p>
              </div>
              <span className="rounded bg-white/5 px-2 py-1 text-xs">
                {Math.round(ep.metadata.estimatedDuration / 60)} min
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
