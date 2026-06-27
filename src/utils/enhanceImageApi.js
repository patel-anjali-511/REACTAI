import axios from "axios";

const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = "https://techhk.aoscdn.com";
const MAXIMUM_RETRIES = 20;

export const enhancedImageAPI = async (file) => {
  if (!API_KEY || API_KEY === "YOUR_API_KEY_HERE" || API_KEY === "wxzte7zpndnhayhss") {
    console.warn("API Key is missing or invalid. Falling back to local client-side image upscaling.");
    return await enhanceImageClientSide(file);
  }
  try {
    const taskId = await uploadImage(file);
    console.log("Image Uploaded Successfully, Task ID:", taskId);

    const enhancedImageData = await PollForEnhancedImage(taskId);
    console.log("Enhanced Image Data:", enhancedImageData);

    return enhancedImageData;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 401) {
        throw new Error(
          "Invalid or Expired API Key (Error 401). Please verify your VITE_API_KEY configuration."
        );
      }
      if (error.response.status === 429) {
        throw new Error(
          "API Rate Limit Exceeded / Out of Credits (Error 429). Please check your account quota or try again later."
        );
      }
      throw new Error(
        `Server Error (${error.response.status}): ${error.response.data?.message || error.message}`
      );
    }
    throw error;
  }
};

const enhanceImageClientSide = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        
        // Upscale by 2x
        const scale = 2;
        canvas.width = img.width * scale;
        canvas.height = img.height * scale;
        
        // Enable high-quality image smoothing
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";
        
        // Apply hardware-accelerated CSS filters to enhance contrast, color vibrance, and clarity
        ctx.filter = "contrast(1.12) saturate(1.05) brightness(1.01)";
        
        // Draw the upscaled image
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        
        try {
          const enhancedUrl = canvas.toDataURL("image/png");
          resolve({ image: enhancedUrl });
        } catch (err) {
          reject(err);
        }
      };
      img.onerror = () => reject(new Error("Failed to load image for client-side enhancement."));
      img.src = event.target.result;
    };
    reader.onerror = () => reject(new Error("Failed to read image file."));
    reader.readAsDataURL(file);
  });
};

const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append("image_file", file);

  const { data } = await axios.post(
    `${BASE_URL}/api/tasks/visual/scale`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        "X-API-KEY": API_KEY,
      },
    }
  );

  if (!data?.data?.task_id) {
    throw new Error("Failed to upload image! Task ID not found.");
  }
  return data.data.task_id;
};

const PollForEnhancedImage = async (taskId, retries = 0) => {
  const result = await fetchEnhancedImage(taskId);

  if (result.state === 1) {
    console.log("Enhanced Image URL:", result);
    return result;
  }

  if (result.state < 0) {
    throw new Error("Image enhancement task failed.");
  }

  // If state > 1, it is processing
  console.log(`Processing...(${retries}/${MAXIMUM_RETRIES})`);

  if (retries >= MAXIMUM_RETRIES) {
    throw new Error("Max retries reached. Please try again later.");
  }

  // wait for 2 seconds
  await new Promise((resolve) => setTimeout(resolve, 2000));

  return PollForEnhancedImage(taskId, retries + 1);
};

const fetchEnhancedImage = async (taskId) => {
  const { data } = await axios.get(
    `${BASE_URL}/api/tasks/visual/scale/${taskId}`,
    {
      headers: {
        "X-API-KEY": API_KEY,
      },
    }
  );
  if (!data?.data) {
    throw new Error("Failed to fetch enhanced image! Image not found.");
  }

  return data.data;
};

// {status: 200, message: "success", data: {task_id: "187b1adc-b35f-46d7-8670-47f88f89fd73"}}

// {status: 200, message: "success", data: {task_id: "187b1adc-b35f-46d7-8670-47f88f89fd73"}}
