import { useState, useCallback, useEffect } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";

function App() {
  const wsUrl = "ws://localhost:3030/ws-conn";

  const [messageHistory, setMessageHistory] = useState([]);

  const { sendMessage, lastMessage, readyState } = useWebSocket(wsUrl);

  useEffect(() => {
    if (lastMessage !== null) {
      setMessageHistory((prev) => prev.concat(lastMessage as any));
    }
  }, [lastMessage, setMessageHistory]);

  const handleClickSendMessage = useCallback(() => sendMessage("Hello"), []);

  const connectionStatus = {
    [ReadyState.CONNECTING]: "Connecting",
    [ReadyState.OPEN]: "Open",
    [ReadyState.CLOSING]: "Closing",
    [ReadyState.CLOSED]: "Closed",
    [ReadyState.UNINSTANTIATED]: "Uninstantiated",
  }[readyState];

  return (
    <div className="dark:bg-gray-600 min-h-full text-gray-900 dark:text-white">
      <p className="text-xl font-bold">Websocket status: {connectionStatus}</p>

      <div className="flex gap-4">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleClickSendMessage}
        >
          Send Message
        </button>

        <button
          onClick={() => {
            setMessageHistory([]);
          }}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Clear
        </button>
      </div>

      <ul className="flex gap-4 flex-col">
        {messageHistory.map((message, idx) => (
          <span key={idx}>{message ? (message as any).data : null}</span>
        ))}
      </ul>
    </div>
  );
}

export default App;
