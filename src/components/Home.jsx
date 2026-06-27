import ImageUpload from "./ImageUpload";
import ImagePreview from "./ImagePreview";
import { useState } from "react";
import { enhancedImageAPI } from "../utils/enhanceImageApi";

const Home = () => {
    const [uploadImage, setUploadImage] = useState(null);
    const [enhancedImage, setEnhancedImage] = useState(null);
    const [loading, setloading] = useState(false);
    const [error, setError] = useState(null);

    const UploadImageHandler = async (file) => {
        setUploadImage(URL.createObjectURL(file));
        setEnhancedImage(null);
        setError(null);
        setloading(true);
        try {
            const enhancedURL = await enhancedImageAPI(file);
            setEnhancedImage(enhancedURL);
        } catch (error) {
            console.error("Enhancement error:", error);
            setError(error.message || "Error while enhancing the image. Please try again later.");
        } finally {
            setloading(false);
        }
    };

    return (
        <div className="w-full max-w-4xl flex flex-col items-center">
            {error && (
                <div className="w-full max-w-2xl mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-r-xl text-red-800 text-sm flex items-start justify-between shadow-sm transition-all animate-fadeIn">
                    <div className="flex items-start">
                        <svg className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                        </svg>
                        <div>
                            <span className="font-bold block text-red-950">Enhancement Failed</span>
                            <span className="block mt-1 leading-relaxed">{error}</span>
                        </div>
                    </div>
                    <button 
                        onClick={() => setError(null)} 
                        className="text-red-400 hover:text-red-700 font-bold ml-4 leading-none text-base"
                    >
                        ✕
                    </button>
                </div>
            )}
            <ImageUpload UploadImageHandler={UploadImageHandler} />
            <ImagePreview
                loading={loading}
                uploaded={uploadImage}
                enhanced={enhancedImage?.image}
            />
        </div>
    );
};

export default Home;
