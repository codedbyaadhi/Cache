"use client";
import React, { useState } from "react";
import { useTextScramble } from "@/hooks/useTextScramble";
import Link from "next/link";

const navigationItems = [
  { label: "COMPONENTS", key: "components" },
  { label: "DOCS", key: "docs" },
  { label: "PRICING", key: "pricing" },
  { label: "RESOURCES", key: "resources" },
  { label: "ABOUT", key: "about" },
];

const Header = () => {
  const [hoveredKey, setHoveredKey] = useState<string | null>(null);

  return (
    <div className="flex items-center justify-center w-full h-[85px]">
      <div className="flex items-center justify-between w-[400px] h-[50px] bg-gradient-to-b from-[#19172F] via-[#02001650] to-[#19172F] border border-[#43435D20] shadow-md">
        {/* Left Borders */}
        <div className="flex flex-col items-center justify-between w-auto h-full">
          <div className="w-[7px] h-[7px] border-l-2 border-t-2 border-white"></div>
          <div className="w-[7px] h-[7px] border-l-2 border-b-2 border-white"></div>
        </div>

        {/* Navigation Links */}
        <ul className="flex items-center gap-3">
          {navigationItems.map((item) => {
            const isHovered = hoveredKey === item.key;
            const displayText = useTextScramble(item.label, isHovered);

            return (
              <li key={item.key} className="flex items-center">
                <Link
                  href="/"
                  className="text-[13px] text-[#4E4B6D] transition-all duration-300 delay-150 font-mono hover:text-[#9793bd]"
                  onMouseEnter={() => setHoveredKey(item.key)}
                  onMouseLeave={() => setHoveredKey(null)}
                >
                  {displayText}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Right Borders */}
        <div className="flex flex-col items-center justify-between w-auto h-full">
          <div className="w-[7px] h-[7px] border-r-2 border-t-2 border-white"></div>
          <div className="w-[7px] h-[7px] border-r-2 border-b-2 border-white"></div>
        </div>
      </div>
    </div>
  );
};

export default Header;
