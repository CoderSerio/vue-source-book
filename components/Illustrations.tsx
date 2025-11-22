import React from 'react';

export const IllustrationEye = () => (
  <svg viewBox="0 0 200 150" className="w-full h-full drop-shadow-md" style={{ overflow: 'visible' }}>
    <g transform="rotate(-5 100 75)">
      {/* Sclera */}
      <path d="M20,75 Q100,5 180,75 Q100,145 20,75 Z" fill="white" stroke="black" strokeWidth="4" strokeLinejoin="round" />
      {/* Iris */}
      <circle cx="100" cy="75" r="30" fill="#42b883" stroke="black" strokeWidth="3" />
      {/* Pupil */}
      <circle cx="100" cy="75" r="12" fill="#35495e" />
      {/* Highlight */}
      <circle cx="90" cy="65" r="5" fill="white" opacity="0.8" />
      {/* Eyelashes */}
      <path d="M40,45 L30,25" stroke="black" strokeWidth="3" strokeLinecap="round" />
      <path d="M70,30 L65,10" stroke="black" strokeWidth="3" strokeLinecap="round" />
      <path d="M100,25 L100,5" stroke="black" strokeWidth="3" strokeLinecap="round" />
      <path d="M130,30 L135,10" stroke="black" strokeWidth="3" strokeLinecap="round" />
      <path d="M160,45 L170,25" stroke="black" strokeWidth="3" strokeLinecap="round" />
    </g>
    <text x="100" y="140" textAnchor="middle" fontFamily="Patrick Hand" fontSize="20" fill="#333">I am watching you...</text>
  </svg>
);

export const IllustrationBell = () => (
  <svg viewBox="0 0 150 150" className="w-full h-full drop-shadow-md" style={{ overflow: 'visible' }}>
     <g className="animate-bounce-slight">
        {/* Bell Body */}
        <path d="M75,20 Q115,20 115,80 L125,100 L25,100 L35,80 Q35,20 75,20 Z" fill="#FFD700" stroke="black" strokeWidth="4" />
        {/* Clapper */}
        <circle cx="75" cy="110" r="10" fill="#DAA520" stroke="black" strokeWidth="3" />
        {/* Vibration Lines */}
        <path d="M130,60 Q140,70 130,80" stroke="black" strokeWidth="3" fill="none" strokeLinecap="round" />
        <path d="M140,50 Q160,70 140,90" stroke="black" strokeWidth="3" fill="none" strokeLinecap="round" />
     </g>
     <text x="75" y="140" textAnchor="middle" fontFamily="Patrick Hand" fontSize="18">Ding! Update time!</text>
  </svg>
);

export const IllustrationTree = () => (
  <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-md" style={{ overflow: 'visible' }}>
    {/* Root Node */}
    <circle cx="100" cy="40" r="25" fill="#fff" stroke="black" strokeWidth="3" />
    <text x="100" y="45" textAnchor="middle" fontSize="12" fontWeight="bold" fill="black">ROOT</text>

    {/* Edges */}
    <path d="M85,60 L50,100" stroke="black" strokeWidth="3" />
    <path d="M115,60 L150,100" stroke="black" strokeWidth="3" />

    {/* Child 1 */}
    <circle cx="50" cy="120" r="20" fill="#E0E7FF" stroke="black" strokeWidth="3" />
    <text x="50" y="125" textAnchor="middle" fontSize="10" fontWeight="bold" fill="black">DIV</text>

    {/* Child 2 */}
    <circle cx="150" cy="120" r="20" fill="#E0E7FF" stroke="black" strokeWidth="3" />
    <text x="150" y="125" textAnchor="middle" fontSize="10" fontWeight="bold" fill="black">SPAN</text>

    {/* Leaves/Decor */}
    <path d="M150,90 Q165,85 170,100" stroke="#42b883" strokeWidth="2" fill="none" />
    <circle cx="170" cy="100" r="3" fill="#42b883" />
  </svg>
);

export const IllustrationMount = () => (
  <svg viewBox="0 0 200 150" className="w-full h-full drop-shadow-md" style={{ overflow: 'visible' }}>
    {/* Pot */}
    <path d="M60,100 L50,140 L150,140 L140,100 Z" fill="#A0522D" stroke="black" strokeWidth="3" />
    <rect x="55" y="100" width="90" height="10" fill="#8B4513" stroke="black" strokeWidth="2" />
    
    {/* Plant growing */}
    <path d="M100,110 Q100,80 100,60" stroke="green" strokeWidth="4" fill="none" />
    
    <g className="animate-pulse">
        <path d="M100,60 Q80,40 80,60 Q100,90 100,60 Z" fill="#42b883" stroke="black" strokeWidth="2" />
        <path d="M100,60 Q120,40 120,60 Q100,90 100,60 Z" fill="#42b883" stroke="black" strokeWidth="2" />
    </g>

    <text x="100" y="30" textAnchor="middle" fontFamily="Patrick Hand" fontSize="18">Mounting to DOM</text>
  </svg>
);

export const IllustrationPatch = () => (
  <svg viewBox="0 0 200 150" className="w-full h-full drop-shadow-md" style={{ overflow: 'visible' }}>
    {/* Old Box */}
    <rect x="30" y="40" width="50" height="50" rx="5" fill="#ccc" stroke="black" strokeWidth="2" strokeDasharray="4 2" opacity="0.5" />
    <text x="55" y="70" textAnchor="middle" fontSize="10">OLD</text>

    {/* New Box */}
    <rect x="120" y="40" width="50" height="50" rx="5" fill="#42b883" stroke="black" strokeWidth="3" />
    <text x="145" y="70" textAnchor="middle" fontSize="10" fontWeight="bold">NEW</text>

    {/* Arrow */}
    <path d="M90,65 L110,65" stroke="black" strokeWidth="4" markerEnd="url(#arrowhead)" />
    
    <defs>
        <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="0" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="black" />
        </marker>
    </defs>
    
    <text x="100" y="120" textAnchor="middle" fontFamily="Patrick Hand" fontSize="16">Patching changes...</text>
  </svg>
);

export const IllustrationProxy = () => (
  <svg viewBox="0 0 200 150" className="w-full h-full drop-shadow-md" style={{ overflow: 'visible' }}>
    {/* Target Object */}
    <rect x="60" y="50" width="80" height="60" rx="10" fill="#fff" stroke="black" strokeWidth="2" />
    <text x="100" y="85" textAnchor="middle" fontSize="12" fontWeight="bold">OBJECT</text>
    
    {/* Proxy Shield */}
    <path d="M40,40 L160,40 L160,100 Q100,140 40,100 Z" fill="#EC4899" stroke="black" strokeWidth="3" fillOpacity="0.3" />
    <path d="M40,40 L160,40 L160,100 Q100,140 40,100 Z" fill="none" stroke="black" strokeWidth="3" strokeDasharray="5 5" />
    
    <text x="100" y="30" textAnchor="middle" fontFamily="Patrick Hand" fontSize="16">Proxy Shield</text>
  </svg>
);

export const IllustrationVapor = () => (
  <svg viewBox="0 0 200 150" className="w-full h-full drop-shadow-md" style={{ overflow: 'visible' }}>
     {/* Cloud 1 */}
     <path d="M50,80 Q60,60 80,70 Q100,50 120,70 Q140,60 150,80 Q160,100 140,110 L60,110 Q40,100 50,80 Z" fill="#fff" stroke="black" strokeWidth="3" />
     
     {/* Steam rising */}
     <g className="animate-float" style={{animationDuration: '3s'}}>
       <path d="M80,60 Q70,40 90,30" stroke="#06b6d4" strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.6" />
       <path d="M100,50 Q90,30 110,20" stroke="#06b6d4" strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.6" />
       <path d="M120,60 Q110,40 130,30" stroke="#06b6d4" strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.6" />
     </g>

     {/* Lightning Bolt (Speed) */}
     <path d="M100,70 L90,90 L105,90 L95,110 L120,85 L105,85 L115,70 Z" fill="#FFD700" stroke="black" strokeWidth="2" className="animate-pulse" />

     <text x="100" y="140" textAnchor="middle" fontFamily="Patrick Hand" fontSize="18">Vapor Mode</text>
  </svg>
);