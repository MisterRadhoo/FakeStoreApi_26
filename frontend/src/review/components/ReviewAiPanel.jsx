const formatPercent = (value) => {
    const numericValue = Number(value) || 0;
    return `${(numericValue * 100).toFixed(1)}%`;
};

const ReviewAiPanel = ({ analysisResult, analysisError, isAnalyzing }) => {
    if (isAnalyzing) {
        return (
            <div className="border-4 border-[#030712] bg-[#d9f99d] p-4 text-xs text-[#030712] shadow-[6px_6px_0_#030712] dark:border-white dark:bg-slate-900 dark:text-white dark:shadow-[6px_6px_0_#ffffff]">
                ANALYZING REVIEW...
            </div>
        );
    }

    if (analysisError) {
        return (
            <div className="border-4 border-[#030712] bg-[#ff9aa2] px-4 py-3 text-xs text-[#030712] shadow-[4px_4px_0_#030712] dark:border-white dark:bg-red-700 dark:text-white dark:shadow-[4px_4px_0_#ffffff]">
                {analysisError}
            </div>
        );
    }

    if (!analysisResult) {
        return null;
    }

    const isFake = analysisResult.aiAnalysis.label === "Fake";

    return (
        <div
            className={
                isFake
                    ? "border-4 border-[#030712] bg-red-100 p-4 text-xs text-[#030712] shadow-[6px_6px_0_#030712] dark:border-white dark:bg-red-950 dark:text-white dark:shadow-[6px_6px_0_#ffffff]"
                    : "border-4 border-[#030712] bg-green-100 p-4 text-xs text-[#030712] shadow-[6px_6px_0_#030712] dark:border-white dark:bg-green-950 dark:text-white dark:shadow-[6px_6px_0_#ffffff]"
            }
        >
            <p className="mb-4 font-black uppercase">
                AI ANALYSIS
            </p>

            <div className="border-2 border-[#030712] bg-[#fff7d6] p-3 dark:border-white dark:bg-slate-900">
                <p className="mb-2 font-black uppercase">
                    REVIEW DATA
                </p>

                <p>TEXT: {analysisResult.reviewData.text}</p>
                <p>RATING: {analysisResult.reviewData.rating}</p>
                <p>REVIEW LENGTH: {analysisResult.reviewData.reviewLength}</p>
                <p>WORD COUNT: {analysisResult.reviewData.wordCount}</p>
            </div>

            <div className="mt-4 border-2 border-[#030712] bg-[#fff7d6] p-3 dark:border-white dark:bg-slate-900">
                <p className="mb-2 font-black uppercase">
                    MODEL RESULT
                </p>

                <p
                    className={
                        isFake
                            ? "inline-block border-2 border-red-700 bg-red-200 px-2 py-1 font-black uppercase text-red-700 dark:border-red-400 dark:bg-red-900 dark:text-red-300"
                            : "inline-block border-2 border-green-700 bg-green-200 px-2 py-1 font-black uppercase text-green-700 dark:border-green-400 dark:bg-green-900 dark:text-green-300"
                    }
                >
                    LABEL: {isFake ? "FAKE" : "REAL"}
                </p>

                <p className="mt-2">
                    CONFIDENCE: {formatPercent(analysisResult.aiAnalysis.confidence)}
                </p>

                <p>
                    PROCESSING TIME: {analysisResult.aiAnalysis.processingTimeMs} ms
                </p>

                <p>
                    MODEL: {analysisResult.aiAnalysis.modelName}
                </p>
            </div>

            {analysisResult.aiAnalysis.scores && analysisResult.aiAnalysis.scores.length ? (
                <div className="mt-4 border-2 border-[#030712] bg-[#fff7d6] p-3 dark:border-white dark:bg-slate-900">
                    <p className="mb-3 font-black uppercase">
                        SCORES
                    </p>

                    <div className="space-y-4">
                        {analysisResult.aiAnalysis.scores.map((scoreItem) => (
                            <div key={scoreItem.label}>
                                <div className="mb-1 flex justify-between">
                                    <span>{scoreItem.label.toUpperCase()}</span>
                                    <span>{formatPercent(scoreItem.score)}</span>
                                </div>

                                <div className="h-4 border-2 border-[#030712] bg-white dark:border-white dark:bg-slate-950">
                                    <div
                                        className={
                                            scoreItem.label === "Fake"
                                                ? "h-full bg-red-500"
                                                : "h-full bg-green-500"
                                        }
                                        style={{
                                            width: formatPercent(scoreItem.score)
                                        }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : null}
        </div>
    );
};

export default ReviewAiPanel;