
import React, { useState, useEffect, useRef } from 'react';
import { CHAPTERS } from './constants';
import Sidebar from './components/Sidebar';
import ChapterSection from './components/ChapterSection';
import VueLogo from './components/VueLogo';
import EndScreen from './components/EndScreen';

const App: React.FC = () => {
  const [activeChapter, setActiveChapter] = useState(1);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    
    // Logic to determine active chapter based on scroll position
    // We check which chapter element is closest to the top of the viewport
    const containerTop = scrollContainerRef.current.scrollTop;
    const containerHeight = scrollContainerRef.current.clientHeight;
    const centerLine = containerTop + containerHeight / 2;

    CHAPTERS.forEach((chapter) => {
      const element = document.getElementById(`chapter-${chapter.id}`);
      if (element) {
        const { offsetTop, offsetHeight } = element;
        if (centerLine >= offsetTop && centerLine < offsetTop + offsetHeight) {
          setActiveChapter(chapter.id);
        }
      }
    });
  };

  const scrollToChapter = (id: number) => {
    const element = document.getElementById(`chapter-${id}`);
    if (element && scrollContainerRef.current) {
       // We scroll the container, not the window
       const top = element.offsetTop;
       scrollContainerRef.current.scrollTo({ top, behavior: 'smooth' });
    }
  };

  // Initial scroll to hero
  const startReading = () => {
     scrollToChapter(1);
  };

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-[#FFF8E7] text-[#2c3e50]">
      {/* Background Grid Pattern */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-5">
        <div className="absolute inset-0" style={{ 
            backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', 
            backgroundSize: '24px 24px' 
        }}></div>
      </div>

      {/* Github Corner Ribbon */}
      <a href="https://github.com/CoderSerio/vue-source-book" target="_blank" className="fixed top-0 right-0 z-[60] group" aria-label="View source on GitHub">
        <svg width="80" height="80" viewBox="0 0 250 250" style={{ fill: '#151513', color: '#fff', position: 'absolute', top: 0, border: 0, right: 0 }} aria-hidden="true">
          <path d="M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z"></path>
          <path d="M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2" fill="currentColor" style={{ transformOrigin: '130px 106px' }} className="group-hover:animate-[wave_0.5s_ease-in-out_infinite]"></path>
          <path d="M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z" fill="currentColor" className="opacity-90"></path>
        </svg>
        <style>{`
          @keyframes wave {
            0%, 100% { transform: rotate(0) }
            20%, 60% { transform: rotate(-25deg) }
            40%, 80% { transform: rotate(10deg) }
          }
        `}</style>
      </a>

      <Sidebar currentChapterId={activeChapter} scrollToChapter={scrollToChapter} />

      {/* Main Scroll Snap Container - Added strict scroll rules */}
      <div 
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="h-full w-full overflow-y-scroll snap-y snap-mandatory scroll-smooth no-scrollbar"
        style={{ scrollBehavior: 'smooth' }}
      >
        {/* Hero Section (Snap Item) */}
        <section className="min-h-screen snap-start snap-always flex flex-col items-center justify-center text-center p-6 relative">
           {/* Decorative Blobs */}
           <div className="absolute top-20 right-10 w-64 h-64 bg-green-200 rounded-full mix-blend-multiply filter blur-2xl opacity-60 animate-pulse pointer-events-none"></div>
           <div className="absolute bottom-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-2xl opacity-60 animate-pulse pointer-events-none" style={{animationDelay: '1s'}}></div>

           <div className="bg-white p-12 rounded-[3rem] sketchy-border border-4 max-w-4xl relative z-10 transform hover:scale-[1.01] transition-transform duration-500">
              <div className="flex justify-center mb-8">
                  <VueLogo className="transform scale-150" />
              </div>
              
              <h1 className="text-6xl md:text-8xl font-bold mb-4 tracking-tighter font-hand">
                SOURCE BOOK
              </h1>
              
              <div className="w-full h-1 bg-black my-6 rounded-full opacity-20"></div>
              
              <h2 className="text-2xl md:text-4xl font-bold text-gray-600 mb-8 font-mono">
                The Vue.js Chronicles
              </h2>
              
              <p className="text-xl mb-10 max-w-lg mx-auto font-medium text-gray-500">
                An interactive, hand-drawn journey through Reactivity, VDOM, Compilers, and Vapor Mode.
              </p>
              
              <button 
                onClick={startReading}
                className="bg-[#42b883] text-white text-2xl px-12 py-4 rounded-full font-bold hover:bg-[#35495e] border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-none transition-all"
              >
                Start Journey ↓
              </button>
           </div>
        </section>

        {/* Render Chapters */}
        {CHAPTERS.map((chapter, index) => (
        <ChapterSection
            key={chapter.id}
            data={chapter}
            isActive={activeChapter === chapter.id}
            nextChapterId={index < CHAPTERS.length - 1 ? CHAPTERS[index + 1].id : null}
            scrollToChapter={scrollToChapter}
        />
        ))}

        {/* End Screen */}
        <EndScreen />
      </div>
    </div>
  );
};

export default App;
