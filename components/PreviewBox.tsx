import React, { useEffect, useState } from "react";
import VueLogo from "./VueLogo";

interface PreviewBoxProps {
  type: "reactivity" | "vdom" | "render" | "patch";
  isCompleted: boolean;
}

const PreviewBox: React.FC<PreviewBoxProps> = ({ type, isCompleted }) => {
  const [counter, setCounter] = useState(10);
  const [mounted, setMounted] = useState(false);
  const [patched, setPatched] = useState(false);

  // Animation loop for reactivity demo
  useEffect(() => {
    if (type === "reactivity" && isCompleted) {
      const interval = setInterval(() => {
        setCounter((c) => (c > 99 ? 10 : c + 1));
      }, 150);
      return () => clearInterval(interval);
    }
  }, [type, isCompleted]);

  // Mount effect for render demo
  useEffect(() => {
    if (type === "render" && isCompleted) {
      const timer = setTimeout(() => setMounted(true), 500);
      return () => clearTimeout(timer);
    } else {
      setMounted(false);
    }
  }, [type, isCompleted]);

  // Patch effect
  useEffect(() => {
    if (type === "patch" && isCompleted) {
      const timer = setTimeout(() => setPatched(true), 800);
      return () => clearTimeout(timer);
    } else {
      setPatched(false);
    }
  }, [type, isCompleted]);

  return (
    <div className="h-[85%] h-min-[400px] bg-white rounded-[2rem] border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6 flex flex-col items-center justify-center relative overflow-hidden transition-all">
      <div className="absolute top-4 left-4 font-bold text-xs font-mono uppercase tracking-widest bg-black text-white px-2 py-1 rounded z-10">
        Live Preview
      </div>

      {/* Placeholder State */}
      {!isCompleted && (
        <div className="text-center opacity-80 flex flex-col items-center gap-4">
          <div className="animate-float">
            <VueLogo className="w-24 h-24 opacity-50 grayscale" />
          </div>
          <p className="font-hand text-xl text-gray-400">
            Waiting for code compilation...
          </p>
        </div>
      )}

      {/* Reactivity Visual */}
      {type === "reactivity" && isCompleted && (
        <div className="text-center animate-in fade-in duration-700">
          <div className="text-8xl font-bold mb-4 text-emerald-600 font-hand">
            {counter}
          </div>
          <div className="bg-emerald-100 px-4 py-2 rounded-full border-2 border-emerald-600 font-bold inline-flex items-center gap-2 shadow-[2px_2px_0px_rgba(0,0,0,0.2)]">
            <span className="w-3 h-3 bg-emerald-500 rounded-full animate-ping"></span>
            Reactive Update
          </div>
          <div className="mt-8 flex justify-center gap-3 opacity-60">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="w-8 h-8 bg-emerald-200 rounded-full border border-emerald-400 animate-pulse flex items-center justify-center text-xs"
                style={{ animationDelay: `${i * 150}ms` }}
              >
                👁️
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-2 font-mono">
            Observers Notified
          </p>
        </div>
      )}

      {/* VDOM Visual */}
      {type === "vdom" && isCompleted && (
        <div className="relative w-full h-full flex items-center justify-center animate-in zoom-in duration-500">
          {/* The VNode Card */}
          <div className="bg-purple-50 border-2 border-purple-500 p-6 rounded-xl shadow-lg transform rotate-2 relative z-10 w-64">
            <div className="text-xs font-bold text-purple-600 mb-2 uppercase border-b border-purple-200 pb-1">
              Virtual Node (JS)
            </div>
            <div className="font-mono text-sm text-purple-900">
              <div className="pl-0">
                <span className="text-purple-400">tag:</span> "div"
              </div>
              <div className="pl-0">
                <span className="text-purple-400">children:</span> [...]
              </div>
            </div>
            <div className="absolute -right-3 -top-3 text-4xl">✨</div>
          </div>
        </div>
      )}

      {/* Render Visual */}
      {type === "render" && mounted && (
        <div className="w-full h-full flex flex-col items-center justify-center animate-in slide-in-from-bottom duration-700">
          <div className="bg-white border-4 border-orange-500 p-8 rounded-2xl shadow-[8px_8px_0px_0px_rgba(249,115,22,1)] text-center relative">
            <div className="absolute -top-4 -right-4 bg-orange-500 text-white font-bold px-3 py-1 rounded-full text-xs">
              DOM Node
            </div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2 font-hand">
              Hello World!
            </h1>
            <p className="text-gray-500 font-mono text-xs">
              Rendered to screen
            </p>
          </div>
        </div>
      )}

      {/* Patch Visual */}
      {type === "patch" && isCompleted && (
        <div className="w-full h-full flex items-center justify-center">
          <div
            className={`transition-all duration-1000 ease-in-out transform ${
              patched ? "scale-110" : "scale-100"
            }`}
          >
            <div className="bg-white border-4 border-blue-500 p-8 rounded-2xl shadow-[8px_8px_0px_0px_#3b82f6] text-center">
              <h1 className="text-2xl font-bold text-gray-400 line-through decoration-4 decoration-red-500 mb-2">
                Hello
              </h1>
              {patched && (
                <h1 className="text-4xl font-bold text-blue-600 font-hand animate-bounce">
                  Hello World
                </h1>
              )}
              <p className="mt-4 text-xs font-mono text-blue-400">
                {patched ? "DOM Updated!" : "Patching..."}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PreviewBox;
