import { useState } from "react";

const ImageUpload = ({ UploadImageHandler }) => {
    const [isDragOver, setIsDragOver] = useState(false);

    const handleFile = (file) => {
        if (file && file.type.startsWith("image/")) {
            UploadImageHandler(file);
        } else {
            alert("Please upload a valid image file (PNG/JPEG/WebP).");
        }
    };

    const ShowImageHandler = (e) => {
        const file = e.target.files[0];
        handleFile(file);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragOver(true);
    };

    const handleDragLeave = () => {
        setIsDragOver(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragOver(false);
        const file = e.dataTransfer.files[0];
        handleFile(file);
    };

    return (
        <div className="w-full max-w-2xl mx-auto p-1 rounded-2xl bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 shadow-xl">
            <div className="bg-slate-900/90 backdrop-blur-xl rounded-[14px] p-8 text-center transition-all duration-300">
                <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    className={`border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 ${
                        isDragOver
                            ? "border-blue-400 bg-blue-500/10 scale-[1.02]"
                            : "border-slate-700 hover:border-indigo-500 hover:bg-slate-800/40"
                    }`}
                >
                    <label htmlFor="fileInput" className="w-full h-full cursor-pointer flex flex-col items-center justify-center">
                        <input
                            type="file"
                            id="fileInput"
                            className="hidden"
                            onChange={ShowImageHandler}
                            accept="image/*"
                        />
                        
                        {/* Upload SVG Icon */}
                        <div className={`p-4 rounded-full bg-slate-800 border mb-4 transition-all duration-300 ${
                            isDragOver ? "border-blue-400 bg-blue-500/20 text-blue-400 animate-bounce" : "border-slate-700 text-slate-400"
                        }`}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-10 w-10"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                                />
                            </svg>
                        </div>
                        
                        <h3 className="text-xl font-semibold text-slate-200 mb-2">
                            {isDragOver ? "Drop your image here!" : "Drag & drop your image"}
                        </h3>
                        <p className="text-slate-400 text-sm mb-4">
                            Or <span className="text-blue-400 font-medium underline">browse files</span> from your computer
                        </p>
                        <div className="text-xs text-slate-500">
                            Supports PNG, JPG, JPEG, WebP up to 10MB
                        </div>
                    </label>
                </div>
            </div>
        </div>
    );
};

export default ImageUpload;
