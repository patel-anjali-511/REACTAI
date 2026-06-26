import ImageUpload from "./ImageUpload";
import ImagePreview from "./ImagePreview";
import { useState } from "react";
import { enhancedImageAPI } from "../utils/enhanceImageApi";

const Home = () => {
    const [uploadImage, setUploadImage] = useState(null);
    const [enhancedImage, setEnhancedImage] = useState(null);
    const [loading, setloading] = useState(false);

    const UploadImageHandler = async (file) => {
        setUploadImage(URL.createObjectURL(file));
        setEnhancedImage(null);
        setloading(true);
        try {
            const enhancedURL = await enhancedImageAPI(file);
            setEnhancedImage(enhancedURL);
        } catch (error) {
            console.error("Enhancement error:", error);
            alert("Error while enhancing the image. Please try again later.");
        } finally {
            setloading(false);
        }
    };

    return (
        <>
            <ImageUpload UploadImageHandler={UploadImageHandler} />
            <ImagePreview
                loading={loading}
                uploaded={uploadImage}
                enhanced={enhancedImage?.image}
            />
        </>
    );
};

export default Home;
