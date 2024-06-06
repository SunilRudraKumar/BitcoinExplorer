"use client";
import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { ChartData, ChartOptions } from "chart.js";
import "chart.js/auto";
import "chartjs-adapter-date-fns";

interface BitcoinChartProps {}

const BitcoinChart: React.FC<BitcoinChartProps> = () => {
  const [chartData, setChartData] = useState<ChartData<"line">>({
    datasets: [],
  });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=30"
        );

        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        const prices = data.prices.map((price: [number, number]) => ({
          x: new Date(price[0]),
          y: price[1],
        }));

        setChartData({
          datasets: [
            {
              label: "Bitcoin Price (USD)",
              data: prices,
              fill: false,
              backgroundColor: "rgba(75,192,192,0.4)",
              borderColor: "rgba(75,192,192,1)",
            },
          ],
        });
      } catch (error: any) {
        setError(error.message);
      }
    };

    fetchData();
  }, []);

  const options: ChartOptions<"line"> = {
    scales: {
      x: {
        type: "time",
        time: {
          unit: "day",
        },
      },
    },
  };

  return (
    <div>
      <h2>Bitcoin Price Chart</h2>
      {error ? (
        <p>Error: {error}</p>
      ) : (
        <Line data={chartData} options={options} />
      )}
    </div>
  );
};

export default BitcoinChart;
