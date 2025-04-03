import { useState } from "react";
import axios from "axios";

const TaskGenerator = () => {
  const [language, setLanguage] = useState("Python");
  const [task, setTask] = useState("");
  const [loading, setLoading] = useState(false);

  const generateTask = async () => {
    setLoading(true);
    setTask("");

    try {
      const response = await axios.post("/api/task", { language });
      setTask(response.data.task);
    } catch (error) {
      setTask("Error generating task. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg border border-gray-200">
      <h2 className="text-2xl font-semibold mb-3 text-gray-800">🎯 Generate a Pseudo-Code Task</h2>

      <label className="block text-gray-700 font-medium mb-1">Select Language:</label>
      <select
        className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-400"
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
      >
        <option value="Python">Python</option>
        <option value="JavaScript">JavaScript</option>
        <option value="Java">Java</option>
        <option value="C++">C++</option>
        <option value="C#">C#</option>
      </select>

      <button
        onClick={generateTask}
        className="w-full bg-blue-600 text-white font-bold px-4 py-3 mt-4 rounded-lg hover:bg-blue-700 transition duration-300"
        disabled={loading}
      >
        {loading ? "Generating..." : "Generate Task"}
      </button>

      {task && <p className="mt-4 p-3 bg-gray-100 border rounded text-gray-800">{task}</p>}
    </div>
  );
};

export default TaskGenerator;
