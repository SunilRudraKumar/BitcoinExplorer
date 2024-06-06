import React from "react";
import Link from "next/link";
const Header = () => {
  return (
    <div className="flex border-spacing-2 shadow-md gap-5 p-3 ">
      <Link href="/">Home</Link>
      <Link href="/onchain">Onchain-Info</Link>
      <Link href="/">OffChain-Info</Link>
    </div>
  );
};

export default Header;
