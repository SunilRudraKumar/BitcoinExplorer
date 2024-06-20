"use client";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import useWebSocket from "@/hooks/useWebSocket";

const BTCPrice = () => {
  const message = {
    action: "subscribe",
    channel: "ticker",
    symbol: "BTC-USD",
  };

  const token =
    "eyJhbGciOiJFUzI1NiIsInR5cCI6IkFQSSJ9.eyJhdWQiOiJtZXJjdXJ5IiwidWlkIjoiY2Y4NWY2NzMtYzg1YS00ZDA5LWFjMDQtY2I3YmYxNGMwZGY2IiwiaXNzIjoiYmxvY2tjaGFpbiIsInJkbyI6ZmFsc2UsImlhdCI6MTcxODkyNjI2MCwianRpIjoiNjdmNTk4MDQtN2FjMi00NzlmLWFkOGMtMDhiY2QxMTVlMjg2Iiwic2VxIjo3NzkzODk0LCJ3ZGwiOnRydWV9.IGMjQ5n8c+V8fttc65FszpxHVs0tAqB3F8FC9ulKF/5ZTPXvmWANdmWGhzX1DHPqpQ5q5Do0WWSYwGvM8TdWOkQ=";
  const { data: tickerData, error } = useWebSocket(
    "wss://ws.blockchain.info/mercury-gateway/v1/ws",
    message,
    token
  );
  const [price, setPrice] = useState<number | null>(null);

  useEffect(() => {
    if (tickerData && tickerData.price) {
      setPrice(tickerData.price);
    }
  }, [tickerData]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Real-Time BTC Price</CardTitle>
        <CardDescription>
          Fetching data from Blockchain.com WebSocket API
        </CardDescription>
      </CardHeader>
      <CardContent>
        {error ? (
          <div>Error: {error}</div>
        ) : (
          <div>
            <h2>BTC-USD Price: {price ? `$${price}` : "Loading..."}</h2>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default BTCPrice;
