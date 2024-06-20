"use client";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Cuboid } from "lucide-react";

type BlockData = {
  block_count: number;
  best_block_hash: string;
  num_transactions: number;
  total_volume: number;
  mempool_size: number;
  avg_fee: number;
  timestamp: number;
};

export function Cards_Blocks() {
  const [blocks, setBlocks] = useState<BlockData[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBlocks = async () => {
    try {
      console.log("Fetching blocks data...");
      const response = await fetch("/api/onchain");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: BlockData[] = await response.json();
      console.log("Fetched blocks data:", data);
      setBlocks(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching block data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlocks();
    const interval = setInterval(fetchBlocks, 60000); // Fetch data every 60 seconds
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    console.log("Blocks state updated:", blocks);
  }, [blocks]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Table>
      <TableHeader>
        <CardHeader className="px-7">
          <Cuboid />
          <CardTitle>Latest Blocks</CardTitle>
          <CardDescription>Showing the most recent 5 blocks</CardDescription>
        </CardHeader>
        <TableRow>
          <TableHead className="w-[100px]">Block Number</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Tx Count</TableHead>
          <TableHead>Total Volume</TableHead>
          <TableHead>Mempool Size</TableHead>
          <TableHead>Average Fee</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {blocks.map((block) => (
          <TableRow key={block.block_count}>
            <TableCell>{block.block_count}</TableCell>
            <TableCell>
              {new Date(block.timestamp * 1000).toLocaleDateString()}
            </TableCell>
            <TableCell>{block.num_transactions}</TableCell>
            <TableCell>{block.total_volume.toFixed(8)}</TableCell>
            <TableCell>{block.mempool_size}</TableCell>
            <TableCell>{block.avg_fee.toFixed(8)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow></TableRow>
      </TableFooter>
    </Table>
  );
}
