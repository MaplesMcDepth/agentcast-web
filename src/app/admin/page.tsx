import { getEpisodes } from '@/lib/episodes';
import AdminDashboard from '@/components/AdminDashboard';

export default function AdminPage() {
  const episodes = getEpisodes();
  return <AdminDashboard episodes={episodes} />;
}