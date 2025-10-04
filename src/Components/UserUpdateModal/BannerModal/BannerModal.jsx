// File path__
import useAxios from "../../../Hooks/Axios";
import { getCroppedImg } from "../../../utils";
import SeekerModalHeader from "../../../MainLayout/Shared/SeekerModalHeader/SeekerModalHeader";

// From react__
import { useState, useCallback, useRef, useEffect } from "react";

// Package__
import Swal from "sweetalert2";
import Cropper from "react-easy-crop";
import { Slider } from "@mui/material";
import { MdUpload } from "react-icons/md";
import { FaTimes, FaEye } from "react-icons/fa";
import useUserData from "../../../Hooks/userData";

const BannerModal = () => {
  const api = useAxios();
  const { profile, updateProfile } = useUserData();

  // States__
  const [bannerUrl, setBannerUrl] = useState(profile?.profileBanner || "");
  const [imageSrc, setImageSrc] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const [croppedFile, setCroppedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [hasChanges, setHasChanges] = useState(false);

  // Store original data
  const originalBannerUrlRef = useRef("");

  // Initialize data
  useEffect(() => {
    if (profile) {
      const currentBanner = profile?.profileBanner || "";
      setBannerUrl(currentBanner);
      originalBannerUrlRef.current = currentBanner;
      setHasChanges(false);
    }
  }, [profile]);

  // Check for changes
  useEffect(() => {
    setHasChanges(bannerUrl !== originalBannerUrlRef.current);
  }, [bannerUrl]);

  // Crop complete__
  const onCropComplete = useCallback((_, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  // Handle file input__
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageSrc(URL.createObjectURL(file));
      setCroppedImage(null);
      setCroppedFile(null);
      setMessage("");
      setErrorMessage("");
    }
  };

  // Cancel cropping__
  const handleCancelCrop = () => {
    setImageSrc(null);
    setCroppedImage(null);
    setCroppedFile(null);
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setMessage("");
    setErrorMessage("");
  };

  // Preview cropped image__
  const handlePreview = async () => {
    if (!croppedAreaPixels || !imageSrc) return;
    try {
      const { file, url } = await getCroppedImg(imageSrc, croppedAreaPixels);
      setCroppedImage(url);
      setCroppedFile(file);
      setMessage("Image cropped! Click 'Save Cropped Image' to upload.");
    } catch {
      setErrorMessage("Error cropping image. Please try again later.");
    }
  };

  // Upload cropped image to backend (Cloudinary)__
  const handleUploadToBackend = async () => {
    if (!croppedFile) {
      setErrorMessage("Please crop an image first.");
      return;
    }
    const formData = new FormData();
    formData.append("file", croppedFile);

    try {
      setIsLoading(true);
      const res = await api.post("/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (res.data?.url) {
        setBannerUrl(res.data.url);
        setImageSrc(null);
        setCrop({ x: 0, y: 0 });
        setZoom(1);
        setMessage("Banner uploaded successfully!");
      } else {
        setErrorMessage("Image upload failed! Try again.");
      }
    } catch {
      setErrorMessage("Upload failed! Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  // Final save changes (you handle DB update outside)__
  const handleSaveChanges = () => {
    const submissionData = {
      profileBanner: bannerUrl,
    };

    setIsLoading(true);
    updateProfile(submissionData, {
      onSuccess: () => {
        // Update original data after successful save
        originalBannerUrlRef.current = bannerUrl;

        handleCloseModal();

        Swal.fire({
          title: "Success!",
          text: "Banner updated successfully.",
          icon: "success",
        });

        setIsLoading(false);
        setHasChanges(false);
      },
      onError: () => {
        handleCloseModal();

        Swal.fire({
          title: "Oops!",
          text: "Something went wrong while updating.",
          icon: "error",
        });

        setIsLoading(false);
      },
    });
  };

  const handleCancel = () => {
    // Reset to original data
    setBannerUrl(originalBannerUrlRef.current);
    setImageSrc(null);
    setCroppedImage(null);
    setCroppedFile(null);
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setMessage("");
    setErrorMessage("");
    setHasChanges(false);
  };

  const handleCloseModal = () => {
    const modal = document.getElementById("banner_update_modal");
    modal.close();
  };

  return (
    <section>
      <dialog id="banner_update_modal" className="modal">
        <div className="modal-box max-w-[1024px] max-h-[95vh] lg:p-0 p-0">
          <div className="banner_update_main_content_container">
            {/* Header */}
            <SeekerModalHeader
              title="Let's update your banner"
              handleCloseModal={handleCloseModal}
            />

            <div className="px-5 py-6">
              {/* Show current banner */}
              {bannerUrl && !imageSrc && (
                <div className="mb-6">
                  <p className="text-gray-800 font-semibold mb-2 text-lg">
                    Current Banner:
                  </p>
                  <img
                    src={bannerUrl}
                    alt="Current Banner"
                    className="w-full max-h-[250px] object-cover rounded-lg border"
                  />
                  {bannerUrl !== profile?.profileBanner && (
                    <p className="mt-5 p-3 rounded-md bg-green-100 text-green-800">
                      <b>"Save changes"</b> to update your banner, or changes
                      will be{" "}
                      <span className="text-orange-700 font-semibold">
                        lost.
                      </span>
                    </p>
                  )}
                </div>
              )}

              {/* Upload file box */}
              {!imageSrc && (
                <label className="w-full h-40 flex flex-col items-center justify-center border-2 border-dashed border-gray-400 rounded-2xl cursor-pointer bg-gray-50 hover:bg-gray-100 transition mb-6">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                    disabled={isLoading}
                  />
                  <MdUpload className="text-5xl text-gray-500 mb-3" />
                  <p className="text-gray-600 font-medium">
                    Click to upload or drag & drop
                  </p>
                  <p className="text-sm text-gray-400">PNG, JPG (max 5MB)</p>
                </label>
              )}

              {/* Cropper */}
              {imageSrc && (
                <div className="flex flex-col items-center gap-4 w-full">
                  <div className="relative w-full h-[300px] rounded-lg overflow-hidden shadow-md">
                    <Cropper
                      image={imageSrc}
                      crop={crop}
                      zoom={zoom}
                      aspect={1200 / 300} // ✅ Banner aspect ratio
                      onCropChange={setCrop}
                      onZoomChange={setZoom}
                      onCropComplete={onCropComplete}
                    />
                  </div>

                  {/* Zoom slider */}
                  <div className="w-72">
                    <Slider
                      value={zoom}
                      min={1}
                      max={3}
                      step={0.1}
                      onChange={(e, newZoom) => setZoom(newZoom)}
                      disabled={isLoading}
                    />
                  </div>

                  {/* Crop action buttons */}
                  <div className="flex gap-4 flex-wrap justify-center">
                    <button
                      onClick={handleCancelCrop}
                      disabled={isLoading}
                      className="flex items-center gap-2 px-6 py-2 border-2 border-gray-300 rounded-lg hover:bg-gray-100 transition"
                    >
                      <FaTimes /> Cancel
                    </button>
                    <button
                      type="button"
                      onClick={handlePreview}
                      disabled={isLoading || !croppedAreaPixels}
                      className="flex items-center gap-2 px-6 py-2 border-2 border-[#3C8F63] text-[#3C8F63] rounded-lg hover:bg-green-50 transition"
                    >
                      <FaEye /> Preview
                    </button>
                  </div>

                  {/* Cropped preview */}
                  {croppedImage && (
                    <div className="flex flex-col items-center border-2 border-[#3C8F63] rounded-lg py-5 w-full mt-4">
                      <p className="text-gray-700 font-medium mb-2">
                        Cropped Preview:
                      </p>
                      <img
                        src={croppedImage}
                        alt="Cropped Banner"
                        className="w-full max-h-[250px] object-cover rounded-lg border"
                      />
                      <button
                        type="button"
                        onClick={handleUploadToBackend}
                        disabled={isLoading}
                        className="btn mt-3 bg-[#3C8F63] text-white px-4 py-2 rounded-md hover:bg-[#368058]"
                      >
                        {isLoading ? "Updating..." : "Save Cropped Image"}
                      </button>
                    </div>
                  )}

                  {/* Message area */}
                  {message && (
                    <div className="p-3 rounded-md mb-4 bg-green-100 text-green-800">
                      {message}
                    </div>
                  )}
                  {errorMessage && (
                    <div className="p-3 rounded-md mb-4 bg-red-100 text-red-800">
                      {errorMessage}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Footer action buttons */}
            <div className="flex justify-end gap-4 bg-[#eef1f4] px-5 py-6 mt-6">
              <button
                type="button"
                disabled={isLoading || !hasChanges}
                onClick={handleCancel}
                className={`btn btn-outline px-8 py-3 text-lg border-2 ${
                  isLoading || !hasChanges
                    ? "border-gray-200 text-gray-400 cursor-not-allowed"
                    : "border-gray-300 hover:bg-gray-100 hover:border-gray-400"
                }`}
              >
                Cancel
              </button>
              <button
                onClick={handleSaveChanges}
                disabled={isLoading || !hasChanges}
                className={`btn px-8 py-3 text-lg ${
                  isLoading || !hasChanges
                    ? "bg-gray-300 border-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-[#3C8F63] border-[#3C8F63] hover:bg-[#337954] text-white"
                }`}
              >
                {isLoading ? "Working..." : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      </dialog>
    </section>
  );
};
export default BannerModal;