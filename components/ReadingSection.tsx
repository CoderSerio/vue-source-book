
import React from 'react';
import { PageData } from '../types';
import CodeHighlight from './CodeHighlight';
import { 
  IllustrationEye, 
  IllustrationBell, 
  IllustrationTree, 
  IllustrationMount, 
  IllustrationPatch,
  IllustrationProxy,
  IllustrationVapor
} from './Illustrations';

interface ReadingSectionProps {
  data: PageData;
}

const ReadingSection: React.FC<ReadingSectionProps> = ({ data }) => {
  
  const renderIllustration = () => {
    switch(data.illustration) {
        case 'reactivity-eye': return <IllustrationEye />;
        case 'dep-bell': return <IllustrationBell />;
        case 'vdom-tree': return <IllustrationTree />;
        case 'mount-plant': return <IllustrationMount />;
        case 'patch-diff': return <IllustrationPatch />;
        case 'proxy-shield': return <IllustrationProxy />;
        case 'vapor-steam': return <IllustrationVapor />;
        default: return null;
    }
  };

  const hasCode = !!data.codeSnippet;

  return (
    <div className="w-full max-w-6xl mx-auto flex flex-col justify-center h-full max-h-[90vh]">
      <div className="sketchy-border bg-[#fffdf5] p-8 md:p-12 lg:p-16 relative shadow-[12px_12px_0px_rgba(0,0,0,0.1)] flex flex-col lg:flex-row gap-10 items-center h-full max-h-[80vh]">
        
        {/* Text Content */}
        <div className={`${hasCode ? 'flex-1' : 'flex-[0.8]'} space-y-6 overflow-y-auto max-h-full pr-4 scroll-smooth custom-scrollbar flex flex-col justify-center`}>
             <div className="flex items-center gap-4 mb-2">
                <span className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center text-lg font-bold shadow-md flex-shrink-0">
                    {data.id.split('-')[1]}
                </span>
                <h2 className="text-4xl md:text-5xl font-bold font-hand text-gray-800 leading-none">
                    {data.title}
                </h2>
             </div>
             
             <div className="text-xl md:text-2xl leading-relaxed text-gray-700 font-hand space-y-4">
                <div dangerouslySetInnerHTML={{ __html: data.content || '' }} />
             </div>
        </div>

        {/* Visuals / Code Side */}
        <div className={`flex-1 w-full flex flex-col items-center justify-center gap-8 h-full ${!hasCode ? 'bg-white/50 rounded-xl border-2 border-dashed border-black/10 p-8' : ''}`}>
            
            {data.illustration && (
                <div className={`${hasCode ? 'w-40 h-40 md:w-56 md:h-56' : 'w-64 h-64 md:w-96 md:h-96'} animate-float transition-all duration-500`}>
                    {renderIllustration()}
                </div>
            )}

            {data.codeSnippet && (
                <div className="w-full max-w-lg relative group">
                     {/* Tape effect */}
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-6 bg-yellow-200 opacity-90 transform -rotate-1 shadow-sm z-10"></div>
                    
                    <div className="bg-[#282c34] p-6 rounded-xl border-2 border-gray-800 shadow-xl overflow-hidden">
                        <div className="flex gap-1.5 mb-4 opacity-50">
                            <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
                            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
                            <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
                        </div>
                        <div className="overflow-x-auto">
                            <CodeHighlight code={data.codeSnippet} />
                        </div>
                    </div>
                </div>
            )}
        </div>

      </div>
    </div>
  );
};

export default ReadingSection;
