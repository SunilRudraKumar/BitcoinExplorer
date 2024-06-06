import Image from "next/image";

import Header from "@/components/layout/Header";
import BitcoinChart from "@/components/ui/BitcoinChart";

export default function Home() {
  return (
    <div>
      <Header />
      Welcome TO Bitcoin Explorer
      <BitcoinChart />
    </div>
  );
}
