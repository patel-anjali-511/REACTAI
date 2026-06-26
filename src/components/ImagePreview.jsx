import Loading from "./Loading";

const ImagePreview = (props) => {
    const handleDownload = async () => {
        if (!props.enhanced) return;
        try {
            const response = await fetch(props.enhanced);
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
            window.open(props.enhanced, "_blank", "noopener,noreferrer");
        }
    };

    return (
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
            {/* Original Image */}
            <div className="bg-white shadow-lg rounded-xl overflow-hidden flex flex-col">
                <h2 className="text-xl font-semibold text-center bg-gray-800 text-white py-2">
                    Original Image
                </h2>

                <div className="flex-grow flex items-center justify-center min-h-[320px] bg-gray-200">
                    {props.uploaded ? (
                        <img
                            src={props.uploaded}
                            alt=""
                            className="max-h-96 max-w-full object-contain"
                        />
                    ) : (
                        <span className="text-gray-500 font-medium">No Image Selected</span>
                    )}
                </div>
            </div>

            {/* Enhanced Image */}
            <div className="bg-white shadow-lg rounded-xl overflow-hidden flex flex-col">
                <h2 className="text-xl font-semibold text-center bg-blue-800 text-white py-2">
                    Enhanced Image
                </h2>

                <div className="flex-grow flex flex-col items-center justify-center min-h-[320px] bg-gray-200 relative p-4">
                    {props.loading ? (
                        <Loading />
                    ) : props.enhanced ? (
                        <div className="flex flex-col items-center w-full h-full space-y-4">
                            <img
                                src={props.enhanced}
                                alt="Enhanced Preview"
                                className="max-h-80 max-w-full object-contain rounded-lg shadow-sm"
                            />
                            <button
                                onClick={handleDownload}
                                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg text-sm transition-colors shadow-sm flex items-center space-x-1.5"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4"
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
                                <span>Download</span>
                            </button>
                        </div>
                    ) : (
                        <span className="text-gray-500 font-medium">No Enhanced Image</span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ImagePreview;
