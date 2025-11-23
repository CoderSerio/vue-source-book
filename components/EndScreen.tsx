import React from "react";
import { Twitter, Atom, Github } from "lucide-react";
import VueLogo from "./VueLogo";

const EndScreen: React.FC = () => {
  const shareText = "I just built my own Mini Vue.js! 🚀 #SourceBook #VueJS";

  const handleShare = () => {
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`,
      "_blank"
    );
  };

  return (
    <section className="min-h-screen w-full snap-start snap-always flex flex-col items-center justify-center p-4 md:p-8 relative overflow-hidden bg-[#fffbf0]">
      {/* Confetti Background Effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-4 h-4 rounded-sm ${
              ["bg-red-400", "bg-blue-400", "bg-green-400", "bg-yellow-400"][
                i % 4
              ]
            }`}
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              transform: `rotate(${Math.random() * 360}deg)`,
            }}
          ></div>
        ))}
      </div>

      <div className="max-w-4xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        {/* Left: Certificate Card */}
        <div className="sketchy-border bg-white p-8 md:p-12 text-center transform rotate-[-2deg] hover:rotate-0 transition-transform duration-500 shadow-[12px_12px_0px_rgba(0,0,0,0.15)]">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <VueLogo className="transform scale-125" />
              <div className="absolute -bottom-2 -right-4 bg-yellow-400 text-black font-bold text-xs px-2 py-1 rounded-full border border-black transform rotate-12">
                VERIFIED
              </div>
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-2 font-hand text-gray-800">
            Mission Complete!
          </h1>
          <p className="text-xl text-gray-600 font-hand mb-8">
            You have successfully implemented the core of Vue.js.
          </p>

          <div className="border-t-2 border-dashed border-gray-300 my-6 w-full"></div>

          <div className="flex flex-col gap-4">
            <button
              onClick={handleShare}
              className="bg-[#1DA1F2] text-white font-bold py-3 px-6 rounded-xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all flex items-center justify-center gap-2"
            >
              <Twitter size={20} /> Share Your Achievement
            </button>
          </div>
        </div>

        {/* Right: Future & Upsell */}
        <div className="space-y-8">
          <div className="text-center lg:text-left">
            <h3 className="text-3xl font-bold mb-6 font-hand">
              Coming Next...
            </h3>
          </div>

          {/* Next Card: React */}
          <div className="bg-[#f0f9ff] p-6 rounded-2xl border-2 border-black/20 hover:border-black hover:shadow-[6px_6px_0px_0px_#61dafb] transition-all group cursor-pointer opacity-60 hover:opacity-100">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#282c34] rounded-full flex items-center justify-center group-hover:animate-spin-slow">
                <Atom size={28} color="#61dafb" />
              </div>
              <div>
                <h4 className="font-bold text-xl">React Source Book</h4>
                <p className="text-sm text-gray-500 font-mono">
                  Understand Fiber, Hooks & Concurrent Mode
                </p>
              </div>
            </div>
          </div>

          <div className="text-center mt-12 border-t border-gray-200 pt-6">
            <p className="text-sm text-gray-500 font-mono mb-2">
              Created by{" "}
              <a
                href="https://github.com/CoderSerio"
                target="_blank"
                className="text-blue-500 hover:underline font-bold"
              >
                Carbon
              </a>
            </p>
            <a
              href="https://github.com/CoderSerio/vue-source-book"
              target="_blank"
              className="inline-flex items-center gap-2 text-base font-bold bg-black text-white px-3 py-2 rounded-full hover:bg-gray-800 transition-colors"
            >
              <Github size={20} />
              View on GitHub
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EndScreen;
