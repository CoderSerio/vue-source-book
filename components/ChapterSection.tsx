
import React, { useState } from 'react';
import { ChapterData, PageData } from '../types';
import CodePlayground from './CodePlayground';
import PreviewBox from './PreviewBox';
import ReadingSection from './ReadingSection';

interface ChapterSectionProps {
  data: ChapterData;
  isActive: boolean;
  nextChapterId: number | null;
  scrollToChapter: (id: number) => void;
}

const ChapterSection: React.FC<ChapterSectionProps> = ({ 
  data, 
  isActive, 
  nextChapterId, 
  scrollToChapter 
}) => {
  // State for challenges within this chapter
  const [completedPages, setCompletedPages] = useState<Record<string, boolean>>({});
  const [userCodes, setUserCodes] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string | null>>({});
  
  // Stores which hint index (1-based) the user is currently on for a specific page
  const [hintSteps, setHintSteps] = useState<Record<string, number>>({});

  const handleRun = (page: PageData, code: string) => {
    if (!page.challenge) return;
    
    const normalizedInput = code.replace(/\s+/g, '').toLowerCase();
    const validAnswers = page.challenge.correctAnswer;
    
    const isValid = validAnswers.some(ans => 
        normalizedInput.includes(ans.replace(/\s+/g, '').toLowerCase())
    );

    if (isValid) {
      setCompletedPages(prev => ({ ...prev, [page.id]: true }));
      setErrors(prev => ({ ...prev, [page.id]: null }));
    } else {
      setErrors(prev => ({ ...prev, [page.id]: "Hmm, that doesn't look quite right..." }));
      setCompletedPages(prev => ({ ...prev, [page.id]: false }));
    }
  };

  const revealHint = (pageId: string) => {
    setHintSteps(prev => {
        const current = prev[pageId] || 0;
        return { ...prev, [pageId]: current + 1 };
    });
  };

  return (
    <div id={`chapter-${data.id}`} className="w-full">
      {data.pages.map((page) => {
        
        // Hint Logic
        const currentHintStep = hintSteps[page.id] || 0;
        const maxHints = page.challenge?.hints?.length || 0;
        const activeHintText = currentHintStep > 0 && page.challenge?.hints 
            ? page.challenge.hints[Math.min(currentHintStep, maxHints) - 1] 
            : null;

        // Wrapper for snap behavior
        return (
          <div key={page.id} className="min-h-screen w-full snap-start snap-always flex items-center justify-center p-4 md:p-8 relative">
            
            {/* Chapter Indicator Watermark */}
            <div className={`absolute top-4 left-4 md:top-8 md:left-8 px-4 py-1 rounded-full border border-black/20 font-bold text-sm opacity-50 ${data.color} z-20`}>
                CH.{data.id} - {data.title}
            </div>

            {page.type === 'read' ? (
              <ReadingSection data={page} />
            ) : (
              /* Challenge Layout */
              <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-center h-full max-h-[90vh]">
                  
                  {/* Left: Challenge Code */}
                  <div className="flex flex-col gap-6 h-full justify-center relative z-10 w-full">
                      <div className="bg-white p-6 sketchy-border border-2 relative shadow-lg">
                          <div className="absolute -top-3 -left-2 bg-black text-white px-3 py-1 text-xs font-bold rounded transform -rotate-3 shadow-md">
                              CHALLENGE
                          </div>
                          <h3 className="text-3xl font-bold mb-2 font-hand">{page.challenge?.subtitle}</h3>
                          <p className="text-gray-600 text-lg leading-snug font-hand">{page.challenge?.description}</p>
                      </div>

                      <CodePlayground 
                          codePre={page.challenge!.codePre}
                          codePost={page.challenge!.codePost}
                          placeholder={page.challenge!.placeholder}
                          userCode={userCodes[page.id] || ""}
                          onChange={(val) => setUserCodes(prev => ({ ...prev, [page.id]: val }))}
                          isCompleted={!!completedPages[page.id]}
                          onRun={() => handleRun(page, userCodes[page.id] || "")}
                          error={errors[page.id] || null}
                      />

                      {/* Hints System (Hardcoded) */}
                      {!completedPages[page.id] && page.challenge?.hints && (
                        <div className="w-full">
                            {currentHintStep === 0 ? (
                                <button 
                                    onClick={() => revealHint(page.id)}
                                    className="w-full py-3 rounded-xl border-2 border-purple-200 bg-purple-50 hover:bg-purple-100 text-purple-700 font-bold transition-all flex items-center justify-center gap-2 shadow-sm group"
                                >
                                    <span className="text-xl group-hover:scale-110 transition-transform">🧙‍♂️</span> 
                                    Ask the Wizard for a Hint
                                </button>
                            ) : (
                                <div className="w-full bg-purple-50 p-4 rounded-xl border-2 border-purple-200 text-purple-900 shadow-sm animate-in fade-in slide-in-from-bottom-2 relative">
                                    <div className="flex justify-between items-start mb-2">
                                        <div className="font-bold text-xs text-purple-400 uppercase">
                                            Wizard's Wisdom ({Math.min(currentHintStep, maxHints)}/{maxHints})
                                        </div>
                                        {currentHintStep < maxHints && (
                                            <button 
                                                onClick={() => revealHint(page.id)}
                                                className="text-xs font-bold text-purple-600 hover:text-purple-800 underline bg-purple-100 px-2 py-1 rounded"
                                            >
                                                Next Hint →
                                            </button>
                                        )}
                                    </div>
                                    <div className="font-hand text-lg leading-tight">
                                        {activeHintText}
                                    </div>
                                </div>
                            )}
                        </div>
                      )}
                  </div>

                  {/* Right: Preview */}
                  <div className="h-full max-h-[600px] flex items-center justify-center">
                      <div className="w-full h-full">
                        <PreviewBox type={page.challenge!.visualType} isCompleted={!!completedPages[page.id]} />
                      </div>
                  </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ChapterSection;
