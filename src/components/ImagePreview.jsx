import Loading from "./Loading";

const ImagePreview = ({ uploaded, enhanced, loading }) => {
    const handleDownload = async () => {
        if (!enhanced) return;
        try {
            // Attempt to download the file directly via Blob to save it on the user's device
            const response = await fetch(enhanced);
            const blob = await response.blob();
            const blobUrl = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = blobUrl;
            link.download = "enhanced-image.png";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(blobUrl);
        } catch (error) {
            console.error("Direct download failed, opening in new tab:", error);
            // Fallback for CORS or other constraints
            window.open(enhanced, "_blank", "noopener,noreferrer");
        }
    };

    return (
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl px-4">
            {/* Original Image Card */}
            <div className="flex flex-col bg-slate-900/40 backdrop-blur-md border border-slate-800/80 rounded-2xl overflow-hidden shadow-2xl transition-all duration-300 hover:border-slate-700">
                <div className="flex items-center justify-between bg-slate-900 border-b border-slate-800 px-5 py-3">
                    <span className="text-sm font-semibold tracking-wider text-slate-300 uppercase">
                        Original Image
                    </span>
                    {uploaded && (
                        <span className="text-xs text-slate-500 bg-slate-800 px-2.5 py-1 rounded-full border border-slate-700">
                            Source
                        </span>
                    )}
                </div>

                <div className="h-[400px] w-full flex items-center justify-center bg-slate-950 relative">
                    {uploaded ? (
                        <img
                            src={uploaded}
                            alt="Original source"
                            className="max-h-full max-w-full object-contain"
                        />
                    ) : (
                        <div className="flex flex-col items-center justify-center text-slate-500 space-y-2">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-12 w-12 text-slate-600"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={1.5}
                                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                />
                            </svg>
                            <span className="text-sm font-medium">No original image uploaded</span>
                        </div>
                    )}
                </div>
            </div>

            {/* Enhanced Image Card */}
            <div className="flex flex-col bg-slate-900/40 backdrop-blur-md border border-slate-800/80 rounded-2xl overflow-hidden shadow-2xl transition-all duration-300 hover:border-slate-700">
                <div className="flex items-center justify-between bg-slate-900 border-b border-slate-800 px-5 py-3">
                    <span className="text-sm font-semibold tracking-wider text-blue-400 uppercase">
                        Enhanced Image
                    </span>
                    {enhanced && !loading && (
                        <span className="text-xs text-emerald-400 bg-emerald-950/40 px-2.5 py-1 rounded-full border border-emerald-800/50 font-medium">
                            Ready
                        </span>
                    )}
                </div>

                <div className="h-[400px] w-full flex items-center justify-center bg-slate-950 relative">
                    {loading ? (
                        <Loading />
                    ) : enhanced ? (
                        <div className="relative group w-full h-full flex items-center justify-center p-2">
                            <img
                                src={enhanced}
                                alt="AI Enhanced"
                                className="max-h-full max-w-full object-contain rounded-lg"
                            />
                            
                            {/* Overlay Download Panel */}
                            <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                <button
                                    onClick={handleDownload}
                                    className="px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-medium shadow-lg shadow-blue-500/20 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 flex items-center space-x-2"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                                        />
                                    </svg>
                                    <span>Download Image</span>
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center text-slate-500 space-y-2">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-12 w-12 text-slate-600"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={1.5}
                                    d="M13 10V3L4 14h7v7l9-11h-7z"
                                />
                            </svg>
                            <span className="text-sm font-medium">Awaiting enhancement</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ImagePreview;
