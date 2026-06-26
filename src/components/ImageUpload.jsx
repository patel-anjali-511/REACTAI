import { useState } from "react";

const ImageUpload = (props) => {
    const [isDragOver, setIsDragOver] = useState(false);

    const handleFile = (file) => {
        if (file) {
            props.UploadImageHandler(file);
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
        <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-2xl">
            <label
                htmlFor="fileInput"
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`block w-full cursor-pointer border-2 border-dashed rounded-lg p-6 text-center transition-all ${
                    isDragOver 
                        ? "border-blue-500 bg-blue-50" 
                        : "border-gray-300 hover:border-blue-500"
                }`}
            >
                <input
                    type="file"
                    id="fileInput"
                    className="hidden"
                    onChange={ShowImageHandler}
                    accept="image/*"
                />
                <span className="text-lg font-medium text-gray-600">
                    {isDragOver ? "Drop image here" : "Click and drag to upload your image"}
                </span>
            </label>
        </div>
    );
};

export default ImageUpload;
