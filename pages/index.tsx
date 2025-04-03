import Chat from "../components/Chat";
import Leaderboard from "../components/Leaderboard";
import TaskGenerator from "../components/TaskGenerator";

export default function Home() {
  return (
    <div className="p-10 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-6">AI Pseudo-Code Chat</h1>

      <div className="max-w-3xl mx-auto space-y-6">
        <TaskGenerator />
        <Chat />
        <Leaderboard />
      </div>
    </div>
  );
}
