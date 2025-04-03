const Leaderboard = () => {
  const users = [
    { name: "Alice", points: 150 },
    { name: "Bob", points: 120 },
    { name: "Charlie", points: 100 },
  ];

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg border border-gray-200">
      <h2 className="text-2xl font-semibold text-gray-800 mb-3">🏆 Leaderboard</h2>

      <ul className="divide-y divide-gray-300">
        {users.map((user, index) => (
          <li key={index} className="py-3 flex justify-between">
            <span className="text-gray-700 font-medium">{user.name}</span>
            <span className="text-blue-600 font-bold">{user.points} pts</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Leaderboard;
