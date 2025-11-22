
import React from 'react';
import CodeHighlight from './CodeHighlight';

interface CodePlaygroundProps {
  codePre: string;
  codePost: string;
  placeholder: string;
  userCode: string;
  onChange: (val: string) => void;
  isCompleted: boolean;
  onRun: () => void;
  error: string | null;
}

const CodePlayground: React.FC<CodePlaygroundProps> = ({ 
  codePre, 
  codePost, 
  placeholder, 
  userCode, 
  onChange, 
  isCompleted,
  onRun,
  error
}) => {
  return (
    <div className="sketchy-border bg-[#282c34] text-white p-6 relative overflow-hidden group shadow-[6px_6px_0px_0px_rgba(0,0,0,0.2)]">
      {/* Notebook Header */}
      <div className="flex justify-between items-center mb-4 pb-2 border-b border-gray-600">
        <div className="flex gap-2">
           <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
           <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
           <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
        </div>
        <div className="text-xs text-gray-400 font-mono">challenge.js</div>
      </div>

      <div className="font-mono text-sm md:text-base leading-loose">
        {/* Pre-Code with Syntax Highlighting */}
        <div className="opacity-90 select-none whitespace-pre-wrap mb-1">
            <CodeHighlight code={codePre} />
        </div>
        
        {/* User Input Area */}
        <div className="relative my-1">
          <textarea
            value={userCode}
            onChange={(e) => onChange(e.target.value)}
            className={`w-full bg-black/20 text-[#e5c07b] p-2 rounded outline-none font-bold font-mono resize-none transition-all
              ${error ? 'border-b-2 border-red-400' : isCompleted ? 'border-b-2 border-green-400' : 'border-b-2 border-blue-400 dashed focus:bg-black/30'}
            `}
            rows={1}
            placeholder={placeholder}
            disabled={isCompleted}
            spellCheck={false}
            autoCapitalize="off"
          />
        </div>

        {/* Post-Code with Syntax Highlighting */}
        <div className="opacity-90 select-none whitespace-pre-wrap mt-1">
            <CodeHighlight code={codePost} />
        </div>
      </div>

      <div className="mt-6 flex justify-end items-center gap-4">
        {error && (
            <div className="bg-red-100 text-red-600 px-3 py-1 text-xs font-bold rounded border-2 border-red-500 transform -rotate-1">
                ⚠️ {error}
            </div>
        )}
        
        {isCompleted ? (
             <div className="flex items-center gap-2 text-[#27c93f] font-bold bg-gray-800 px-4 py-2 rounded-lg border border-[#27c93f]">
                 <span>✓ Compiled</span>
             </div>
        ) : (
            <button 
            onClick={onRun}
            className="bg-[#66d9ef] hover:bg-[#4fd1ea] text-black px-6 py-2 rounded-full font-bold border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-1 active:translate-y-1 transition-all"
            >
            Run Code ▶
            </button>
        )}
      </div>
    </div>
  );
};

export default CodePlayground;
