import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';

interface AgentConfig {
  name: string;
  role: string;
  personality: string;
  speakingStyle: string;
  color: string;
  voiceId?: string;
}

function getAgents(): AgentConfig[] {
  try {
    const dir = join(process.cwd(), '..', 'agentcast', 'agents');
    const files = readdirSync(dir);
    const agents: AgentConfig[] = [];

    for (const file of files) {
      if (!file.endsWith('.yaml') || file.startsWith('_')) continue;
      const content = readFileSync(join(dir, file), 'utf-8');
      // Simple YAML parsing for our known fields
      const lines = content.split('\n');
      const agent: any = {};
      for (const line of lines) {
        const match = line.match(/^(\w+):\s*["']?(.*?)["']?$/);
        if (match) {
          agent[match[1]] = match[2];
        }
      }
      if (agent.name) agents.push(agent);
    }

    return agents;
  } catch {
    return [];
  }
}

export default function AgentsPage() {
  const agents = getAgents();

  return (
    <div>
      <h1 className="mb-2 text-3xl font-bold">Agents</h1>
      <p className="mb-8 text-white/60">The voices behind AgentCast</p>

      <div className="grid gap-4 md:grid-cols-3">
        {agents.map((agent) => (
          <div
            key={agent.name}
            className="rounded-lg border border-white/10 bg-darker p-6"
          >
            <div
              className="mb-4 h-2 rounded-full"
              style={{ backgroundColor: agent.color || '#666' }}
            />
            <h2 className="mb-1 text-xl font-semibold">{agent.name}</h2>
            <p className="mb-4 text-sm capitalize text-white/40">{agent.role}</p>
            <p className="mb-3 text-sm text-white/70">{agent.personality}</p>
            <p className="text-xs text-white/40">{agent.speakingStyle}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
