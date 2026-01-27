import { useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  const [message, setMessage] = useState("");

  function checkLimit(value) {
    if (value > 10) {
      setMessage("Maximum limit reached");
      return false;
    }
    if (value < 0) {
      setMessage("Minimum limit reached");
      return false;
    }
    setMessage("Limit is between 0 and 10.");
    return true;
  }

  function addValue() {
    if (checkLimit(count + 1)) {
      setCount(count + 1);
    }
  }

  function removeValue() {
    if (checkLimit(count - 1)) {
      setCount(count - 1);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-800">
      <h1 className="text-2xl font-bold text-gray-800 m-5 p-5 bg-amber-200 rounded-3xl">
        Hello, This is a counter App.
      </h1>

      <h2 className="text-4xl font-bold text-white mb-6">
        Count: {count}
      </h2>

      <p className="text-red-500 font-sans mb-4 bg-gray-900 p-2 rounded-2xl">{message}</p>

      <div>
        <button
          onClick={addValue}
          className="text-gray-700 p-4 m-2 bg-amber-300 font-bold rounded-3xl hover:bg-amber-500"
        >
          Add Value
        </button>

        <button
          onClick={removeValue}
          className="text-gray-700 p-4 m-2 font-bold bg-amber-300 rounded-3xl hover:bg-amber-500"
        >
          Remove Value
        </button>
      </div>
    </div>
  );
}

export default App;
