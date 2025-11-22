import React from 'react';

const VueLogo: React.FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <div className={`relative w-24 h-24 ${className}`}>
      {/* Outer Green Triangle */}
      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center drop-shadow-[4px_4px_0px_rgba(0,0,0,1)] filter">
        <div 
          className="w-0 h-0 border-l-[48px] border-r-[48px] border-t-[84px] border-l-transparent border-r-transparent border-t-[#42b883] relative"
          style={{ 
              filter: 'drop-shadow(2px 2px 0px #000)',
              transform: 'rotate(0deg) skewX(2deg)',
          }}
        >
           {/* Inner Blue Triangle */}
           <div 
              className="absolute -top-[84px] -left-[20px] w-0 h-0 border-l-[20px] border-r-[20px] border-t-[35px] border-l-transparent border-r-transparent border-t-[#35495e]"
           ></div>
        </div>
      </div>
      
      {/* Cute Eyes */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 w-full flex justify-center gap-4 z-10 pointer-events-none">
        <div className="w-2 h-2 bg-black rounded-full animate-blink"></div>
        <div className="w-2 h-2 bg-black rounded-full animate-blink"></div>
      </div>

      {/* Cute Mouth */}
       <div className="absolute top-9 left-1/2 -translate-x-1/2 w-2 h-1 border-b-2 border-black rounded-[50%] z-10 pointer-events-none"></div>
    </div>
  );
};

export default VueLogo;