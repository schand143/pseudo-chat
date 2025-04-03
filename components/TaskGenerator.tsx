import { useState } from "react";
import axios from "axios";

const Chat = () => {
  const [language, setLanguage] = useState("JavaScript");
  const [task, setTask] = useState("");
  const [expectedOutput, setExpectedOutput] = useState("");
  const [userInput, setUserInput] = useState("");
  const [points, setPoints] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState("");

  const generateTask = async () => {
    setLoading(true);
    setError("");
    setTask("");
    setExpectedOutput("");

    try {
      console.log("Generating task for:", language);

      const response = await axios.post(
        "https://api.cohere.ai/v1/generate",
        {
          model: "command",
          prompt: `Generate a pseudo-code task for a beginner in ${language}. Also, provide the expected output.`,
          max_tokens: 100,
        },
        {
          headers: {
            Authorization: `Bearer JvQmTmR2WoW2E51fvHu3WNzuDUOdnK75hxEaI1rK`,
            "Content-Type": "application/json",
          },
        }
      );

      const generatedText = response.data.generations[0]?.text || "No response";
      console.log("Generated task:", generatedText);

      const taskText = generatedText.split("\nExpected Output:")[0].trim();
      const outputText = generatedText.split("\nExpected Output:")[1]?.trim() || "Unknown";

      setTask(taskText);
      setExpectedOutput(outputText);
    } catch (error) {
      console.error("Error generating task:", error);
      setError("Failed to generate task. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  
  const validateAnswer = async () => {
    if (!userInput.trim()) {
      setResult("❌ Please enter an answer.");
      return;
    }

    setLoading(true);
    setResult("");

    try {
      const response = await axios.post(
        "https://api.cohere.ai/v1/generate",
        {
          model: "command",
          prompt: `Check if the given user answer correctly solves the pseudo-code task. Provide only "YES" or "NO".\n\n
          Pseudo-code Task:\n
          ${task}\n\n
          User Answer:\n
          ${userInput}\n\n
          Does the user's answer correctly solve the task? Reply only with "YES" or "NO".`,
          max_tokens: 10,
        },
        {
          headers: {
            Authorization: `Bearer JvQmTmR2WoW2E51fvHu3WNzuDUOdnK75hxEaI1rK`,
            "Content-Type": "application/json",
          },
        }
      );

      const validationResponse = response.data.generations[0]?.text?.trim().toUpperCase() || "NO";

      console.log("AI Response:", validationResponse);

      if (validationResponse === "YES") {
        setPoints((prev) => prev + 10);
        setResult("✅ Correct! You earned 10 points.");
      } else {
        setPoints((prev) => Math.max(prev - 5, 0));
        setResult("❌ Incorrect! Try again.");
      }
    } catch (error) {
      console.error("Error validating answer:", error);
      setResult("⚠️ Validation failed. Try again.");
    } finally {
      setLoading(false);
    }
  };



  return (
    <div className="p-6 bg-white shadow-lg rounded-lg border border-gray-200 max-w-2xl mx-auto">
      <h2 className="text-2xl font-semibold text-gray-800 mb-3">💬 AI Pseudo-Code Chat</h2>

      {/* Display Current Points */}
      <p className="mb-2 text-lg font-semibold text-green-700">⭐ Points: {points}</p>

      {/* Language Selection Dropdown */}
      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
        className="border p-2 rounded-lg mb-4"
      >
        <option value="JavaScript">JavaScript</option>
        <option value="Python">Python</option>
        <option value="C++">C++</option>
      </select>

      {/* Generate Task Button */}
      <button
        onClick={generateTask}
        className="bg-blue-500 text-white px-5 py-3 rounded-lg hover:bg-blue-600 transition duration-300"
      >
        {loading ? "Generating..." : "Generate Task"}
      </button>

      {/* Error Message */}
      {error && <p className="mt-3 text-red-500">{error}</p>}

      {/* Show Pseudo-Code Task */}
      {task && (
        <div className="mt-4 p-3 bg-gray-100 rounded-lg">
          <h3 className="text-lg font-semibold">Generated Task:</h3>
          <pre className="bg-gray-900 text-white p-3 rounded-lg overflow-auto">
            {task}
          </pre>
        </div>
      )}

      {/* User Input Section */}
      {task && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Enter Your Output:</h3>
          <input
            type="text"
            className="border p-2 rounded-lg w-full mt-2"
            placeholder="Enter expected output..."
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
          />
          <button
            onClick={validateAnswer}
            className="bg-green-500 text-white px-5 py-3 rounded-lg hover:bg-green-600 transition duration-300 mt-3"
          >
            Submit Answer
          </button>
        </div>
      )}

      {/* Show Result Message */}
      {result && (
        <p className={`mt-3 font-semibold ${result.includes("✅") ? "text-green-500" : "text-red-500"}`}>
          {result}
        </p>
      )}
    </div>
  );
};

export default Chat;
