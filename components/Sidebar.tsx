import React from "react";
import { CHAPTERS } from "../constants";

interface SidebarProps {
  currentChapterId: number;
  scrollToChapter: (id: number) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  currentChapterId,
  scrollToChapter,
}) => {
  return (
    <div className="fixed left-6 top-1/2 -translate-y-1/2 z-50 group">
      {/* Collapsed State (Cute Icons) */}
      <div className="flex flex-col gap-4 p-3 bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rounded-full transition-all duration-300 group-hover:opacity-0 group-hover:scale-90 pointer-events-auto relative">
        {CHAPTERS.map((chap) => (
          <div
            key={chap.id}
            className={`w-3 h-3 rounded-full border border-black transition-colors ${
              currentChapterId === chap.id ? chap.color : "bg-white"
            }`}
          />
        ))}
      </div>

      {/* Expanded State (Notebook Index) */}
      <div className="flex flex-col gap-3 bg-[#fffef0] p-6 pr-8 rounded-[2rem] border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] w-80 transition-all duration-500 opacity-0 invisible -translate-x-10 group-hover:translate-x-0 group-hover:opacity-100 group-hover:visible absolute top-1/2 left-0 transform -translate-y-1/2">
        {/* Spiral Binding Effect */}
        <div className="absolute left-4 top-0 bottom-0 w-8 flex flex-col justify-evenly py-2">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="w-4 h-4 bg-gray-300 rounded-full border border-black mb-2"
            ></div>
          ))}
        </div>

        <div className="pl-10">
          <h3 className="font-bold text-2xl mb-4 border-b-2 border-black pb-2 font-hand">
            Table of Contents
          </h3>
          {CHAPTERS.map((chap) => (
            <button
              key={chap.id}
              onClick={() => scrollToChapter(chap.id)}
              className={`w-full text-left p-3 rounded-lg border-2 border-transparent transition-all mb-2 flex items-center font-bold ${
                currentChapterId === chap.id
                  ? `bg-white border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transform -translate-y-1`
                  : "hover:bg-gray-100 opacity-60 hover:opacity-100"
              }`}
            >
              <span
                className={`w-6 h-6 rounded-full border border-black mr-3 flex items-center justify-center text-xs flex-shrink-0 ${chap.color}`}
              >
                {chap.id}
              </span>
              <span className="truncate">{chap.title}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
