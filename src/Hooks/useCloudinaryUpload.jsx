import { useState } from "react";

const useCloudinaryUpload = () => {
  const [isUploading, setIsUploading] = useState(false);

  const uploadImage = async (file) => {
    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "image_upload");
      formData.append("folder", "Job Hunting");

      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dmfsmcy2y/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();
      setIsUploading(false);

      if (data.secure_url) {
        return data.secure_url;
      } else {
        throw new Error("Upload failed");
      }
    } catch (error) {
      setIsUploading(false);
      console.error("Cloudinary upload error:", error);
      throw error;
    }
  };

  return { uploadImage, isUploading };
};

export default useCloudinaryUpload;
