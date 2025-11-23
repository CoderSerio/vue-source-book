import React, { useState } from "react";
import { ChapterData, PageData } from "../types";
import CodePlayground from "./CodePlayground";
import PreviewBox from "./PreviewBox";
import ReadingSection from "./ReadingSection";

interface ChapterSectionProps {
  data: ChapterData;
}

const ChapterSection: React.FC<ChapterSectionProps> = ({ data }) => {
  const [completedPages, setCompletedPages] = useState<Record<string, boolean>>(
    {}
  );
  const [userCodes, setUserCodes] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string | null>>({});
  const [hintLevels, setHintLevels] = useState<Record<string, number>>({});

  const incrementHintLevel = (pageId: string, maxLevel: number) => {
    setHintLevels((prev) => {
      const current = prev[pageId] ?? 0;
      // Max level is hints.length
      const next = Math.min(current + 1, maxLevel);
      return { ...prev, [pageId]: next };
    });
  };

  const handleRun = (page: PageData, code: string) => {
    if (!page.challenge) return;

    const normalizedInput = code.replace(/\s+/g, "").toLowerCase();
    const validAnswers = page.challenge.correctAnswer;

    const isValid = validAnswers.some((ans) =>
      normalizedInput.includes(ans.replace(/\s+/g, "").toLowerCase())
    );

    if (isValid) {
      setCompletedPages((prev) => ({ ...prev, [page.id]: true }));
      setErrors((prev) => ({ ...prev, [page.id]: null }));
    } else {
      setErrors((prev) => ({
        ...prev,
        [page.id]: "Hmm, that doesn't look quite right...",
      }));
      setCompletedPages((prev) => ({ ...prev, [page.id]: false }));

      // Auto-increment hint level on error
      if (page.challenge.hints && page.challenge.hints.length > 0) {
        incrementHintLevel(page.id, page.challenge.hints.length);
      }
    }
  };

  const askWizard = (page: PageData) => {
    if (
      !page.challenge ||
      !page.challenge.hints ||
      page.challenge.hints.length === 0
    )
      return;

    incrementHintLevel(page.id, page.challenge.hints.length);
  };

  return (
    <div id={`chapter-${data.id}`} className="w-full">
      {/* Chapter Title Slide (Optional, integrated into first page or just distinct) */}

      {data.pages.map((page) => {
        // Wrapper for snap behavior
        const challengeHints = page.challenge?.hints || [];
        const currentHintLevel = hintLevels[page.id] ?? 0;
        const currentHintText =
          challengeHints.length > 0 && currentHintLevel > 0
            ? challengeHints[
                Math.min(currentHintLevel - 1, challengeHints.length - 1)
              ]
            : null;

        return (
          <div
            key={page.id}
            className="min-h-screen w-full snap-start flex items-center justify-center p-4 md:p-8 relative"
          >
            {/* Chapter Indicator Watermark */}
            <div
              className={`absolute top-4 left-4 md:top-8 md:left-8 px-4 py-1 rounded-full border border-black/20 font-bold text-sm opacity-50 ${data.color}`}
            >
              CH.{data.id} - {data.title}
            </div>

            {page.type === "read" ? (
              <ReadingSection data={page} />
            ) : (
              /* Challenge Layout */
              <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-center h-full max-h-[90vh]">
                {/* Left: Challenge Code */}
                <div className="flex flex-col gap-6 h-full justify-center">
                  <div className="bg-white p-6 sketchy-border border-2 relative z-10 shadow-lg">
                    <div className="absolute -top-3 -left-2 bg-black text-white px-3 py-1 text-xs font-bold rounded transform -rotate-3 shadow-md">
                      CHALLENGE
                    </div>
                    <h3 className="text-3xl font-bold mb-2 font-hand">
                      {page.challenge?.subtitle}
                    </h3>
                    <div
                      className="text-gray-600 text-lg leading-snug font-hand"
                      dangerouslySetInnerHTML={{
                        __html: page.challenge?.description || "",
                      }}
                    />
                  </div>

                  <CodePlayground
                    codePre={page.challenge!.codePre}
                    codePost={page.challenge!.codePost}
                    placeholder={page.challenge!.placeholder}
                    userCode={userCodes[page.id] || ""}
                    onChange={(val) =>
                      setUserCodes((prev) => ({ ...prev, [page.id]: val }))
                    }
                    isCompleted={!!completedPages[page.id]}
                    onRun={() => handleRun(page, userCodes[page.id] || "")}
                    error={errors[page.id] || null}
                  />

                  {/* Hints */}
                  {!completedPages[page.id] && challengeHints.length > 0 && (
                    <div className="flex justify-start pl-2">
                      {!currentHintText ? (
                        <button
                          onClick={() => askWizard(page)}
                          className="text-sm font-bold text-purple-600 hover:text-purple-800 transition-all flex items-center gap-2"
                        >
                          <span className="text-lg">🧙‍♂️</span>
                          Need a hint?
                        </button>
                      ) : (
                        <div className="bg-purple-50 p-3 rounded-lg border border-purple-200 text-purple-900 text-sm max-w-md animate-in fade-in slide-in-from-bottom-2">
                          <strong>Wizard says:</strong>{" "}
                          <span
                            dangerouslySetInnerHTML={{
                              __html: currentHintText || "",
                            }}
                          />
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Right: Preview */}
                <div className="h-full max-h-[600px] flex items-center justify-center">
                  <div className="w-full h-full">
                    <PreviewBox
                      type={page.challenge!.visualType}
                      isCompleted={!!completedPages[page.id]}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}

      {/* Optional: Next Chapter Button Page if needed, or just rely on scroll */}
    </div>
  );
};

export default ChapterSection;
