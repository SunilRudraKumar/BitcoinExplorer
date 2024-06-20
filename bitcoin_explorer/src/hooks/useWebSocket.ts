import { useEffect, useState } from "react";

const useWebSocket = (url: string, message: object, token: string) => {
  const [data, setData] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const ws = new WebSocket(url);

    ws.onopen = () => {
      console.log("WebSocket connection established");
      // Authenticate
      ws.send(JSON.stringify({ token, action: "subscribe", channel: "auth" }));
      // Subscribe to ticker channel
      ws.send(JSON.stringify(message));
    };

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      console.log("Received WebSocket message:", message);
      setData(message);
    };

    ws.onerror = (event) => {
      console.error("WebSocket error:", event);
      setError("WebSocket error occurred");
    };

    ws.onclose = (event) => {
      console.log("WebSocket connection closed:", event);
      setError(`WebSocket connection closed with code: ${event.code} reason: ${event.reason}`);
    };

    return () => {
      ws.close();
    };
  }, [url, message, token]);

  return { data, error };
};

export default useWebSocket;
