
import React from 'react';
import VueLogo from './VueLogo';

const EndScreen: React.FC = () => {
  const shareText = "I just built my own Mini Vue.js! 🚀 #SourceBook #VueJS";
  
  const handleShare = () => {
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`, '_blank');
  };

  return (
    <section className="min-h-screen w-full snap-start snap-always flex flex-col items-center justify-center p-4 md:p-8 relative overflow-hidden bg-[#fffbf0]">
      
      {/* Confetti Background Effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
        {[...Array(20)].map((_, i) => (
            <div key={i} 
                 className={`absolute w-4 h-4 rounded-sm ${['bg-red-400','bg-blue-400','bg-green-400','bg-yellow-400'][i%4]}`}
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
                    <span>🐦</span> Share Your Achievement
                </button>
            </div>
        </div>

        {/* Right: Future & Upsell */}
        <div className="space-y-8">
            <div className="text-center lg:text-left">
                <h3 className="text-3xl font-bold mb-6 font-hand">Coming Next...</h3>
            </div>

            {/* Next Card: React */}
            <div className="bg-[#f0f9ff] p-6 rounded-2xl border-2 border-black/20 hover:border-black hover:shadow-[6px_6px_0px_0px_#61dafb] transition-all group cursor-pointer opacity-60 hover:opacity-100">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-[#282c34] rounded-full flex items-center justify-center text-2xl group-hover:animate-spin-slow">
                        ⚛️
                    </div>
                    <div>
                        <h4 className="font-bold text-xl">React Source Book</h4>
                        <p className="text-sm text-gray-500 font-mono">Understand Fiber, Hooks & Concurrent Mode</p>
                    </div>
                </div>
            </div>
            
            <div className="text-center mt-12 border-t border-gray-200 pt-6">
                <p className="text-sm text-gray-500 font-mono mb-2">
                   Created by <a href="https://github.com/CoderSerio" target="_blank" className="text-blue-500 hover:underline font-bold">CoderSerio</a>
                </p>
                <a 
                  href="https://github.com/CoderSerio/vue-source-book"
                  target="_blank"
                  className="inline-flex items-center gap-2 text-xs font-bold bg-black text-white px-3 py-1 rounded-full hover:bg-gray-800 transition-colors"
                >
                    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                    View on GitHub
                </a>
            </div>
        </div>

      </div>
    </section>
  );
};

export default EndScreen;
