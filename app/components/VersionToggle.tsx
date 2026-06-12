"use client";

import React from "react";

export type DesignVersion = "A" | "B" | "C";

const versionLabels: Record<DesignVersion, string> = {
  A: "Isometric",
  B: "Topographic",
  C: "Network",
};

interface VersionToggleProps {
  current: DesignVersion;
  onChange: (version: DesignVersion) => void;
}

export function VersionToggle({ current, onChange }: VersionToggleProps) {
  const versions: DesignVersion[] = ["A", "B", "C"];

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end gap-2">
      <div className="bg-[#273927] text-white text-xs px-3 py-1 rounded-full shadow-lg opacity-80">
        Creative Preview
      </div>
      <div className="bg-white rounded-full shadow-2xl border border-gray-200 flex overflow-hidden">
        {versions.map((v) => (
          <button
            key={v}
            onClick={() => onChange(v)}
            className={`px-4 py-2.5 text-sm font-semibold transition-all duration-200 ${
              current === v
                ? "bg-[#273927] text-white"
                : "text-[#273927] hover:bg-[#e5dfcf]"
            }`}
          >
            {v}: {versionLabels[v]}
          </button>
        ))}
      </div>
    </div>
  );
}
