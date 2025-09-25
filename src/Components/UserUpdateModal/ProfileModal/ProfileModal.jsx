// File path__
import useAxios from "../../../Hooks/Axios";
import { getCroppedImg } from "../../../utils";
import useUserData from "../../../Hooks/userData";

// From react__
import { useState, useEffect, useCallback } from "react";

// Package__
import Swal from "sweetalert2";
import Cropper from "react-easy-crop";
import { Slider } from "@mui/material";
import { MdUpload } from "react-icons/md";
import { FaTimes, FaEye } from "react-icons/fa";

const ProfileUpdateModal = () => {
  const api = useAxios();
  const { profile, updateProfile } = useUserData();

  // Profile data__
  const [profileData, setProfileData] = useState({
    profilePhoto: "",
    userName: "",
    bio: "",
    openToWork: false,
  });

  // Image cropping states__
  const [imageSrc, setImageSrc] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const [croppedFile, setCroppedFile] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Load initial profile data__
  useEffect(() => {
    if (profile) {
      setProfileData({
        profilePhoto: profile.profilePhoto || "",
        userName: profile.userName || "",
        bio: profile.bio || "",
        openToWork: profile.openToWork || false,
      });
    }
  }, [profile]);

  // Handle text/checkbox change__
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProfileData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Image crop__
  const onCropComplete = useCallback((_, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageSrc(URL.createObjectURL(file));
      setCroppedImage(null);
      setCroppedFile(null);
    }
  };

  const handlePreview = async () => {
    if (!croppedAreaPixels || !imageSrc) return;
    try {
      const { file, url } = await getCroppedImg(imageSrc, croppedAreaPixels);
      setCroppedImage(url);
      setCroppedFile(file);
      setMessage("Image cropped! Click 'Save Cropped Image' to update.");
    } catch {
      setErrorMessage("Error cropping image. Please try again later!.");
    }
  };

  const handleCancelCrop = () => {
    setImageSrc(null);
    setCroppedImage(null);
    setCroppedFile(null);
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setMessage("");
    setErrorMessage("");
  };

  // Upload cropped file to backend Cloudinary__
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
        setProfileData((prev) => ({
          ...prev,
          profilePhoto: res.data.url,
        }));

        // Reset cropping state but keep the preview__
        setImageSrc(null);
        setCrop({ x: 0, y: 0 });
        setZoom(1);
      } else {
        setErrorMessage("Image upload failed! Try again.");
      }
    } catch {
      setErrorMessage("Upload failed! Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  // Final save send profile data to DB__
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const submissionData = {
      userName: profileData.userName.trim(),
      bio: profileData.bio.trim(),
      openToWork: profileData.openToWork,
      profilePhoto: profileData.profilePhoto,
    };

    updateProfile(submissionData, {
      onSuccess: () => {
        document.getElementById("profile_update_modal").close();

        Swal.fire({
          title: "Success!",
          text: "Profile updated successfully.",
          icon: "success",
        });

        setIsLoading(false);
      },
      onError: () => {
        document.getElementById("profile_update_modal").close();

        Swal.fire({
          title: "Oops!",
          text: "Something went wrong while updating.",
          icon: "error",
        });

        handleCancelCrop();
        setIsLoading(false);
      },
    });
  };

  return (
    <section>
      <dialog id="profile_update_modal" className="modal">
        <div className="modal-box max-w-[1024px]">
          {/* Close Button */}
          <form method="dialog" className="mb-5">
            <button
              type="button"
              className="btn btn-sm btn-circle btn-ghost border border-gray-400 absolute right-2 top-2"
              onClick={() =>
                document.getElementById("profile_update_modal").close()
              }
            >
              <span className="text-2xl font-semibold text-gray-700">×</span>
            </button>
          </form>

          <div className="contact_update_main_content_container">
            <h1 className="modal_title font-semibold font-[Montserrat] text-3xl">
              Edit your profile
            </h1>

            {/* Profile Photo Cropper - Now integrated directly */}
            <div className="border-2 border-gray-300 rounded-md my-5 p-4">
              <div className="flex flex-col items-center justify-center w-full my-10">
                {/* Upload Box */}
                {!imageSrc && (
                  <label className="w-full max-w-md h-52 flex flex-col items-center justify-center border-2 border-dashed border-gray-400 rounded-2xl cursor-pointer bg-gray-50 hover:bg-gray-100 transition">
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
                  <div className="flex flex-col items-center gap-4 w-full p-5">
                    <div className="relative w-full max-w-[500px] h-[300px] md:h-[500px] rounded-lg overflow-hidden shadow-md">
                      <Cropper
                        image={imageSrc}
                        crop={crop}
                        zoom={zoom}
                        aspect={1}
                        onCropChange={setCrop}
                        onZoomChange={setZoom}
                        onCropComplete={onCropComplete}
                      />
                    </div>

                    {/* Zoom Control */}
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

                    {/* Action Buttons */}
                    <div className="flex gap-4 flex-wrap justify-center">
                      {/* Cancel */}
                      <button
                        onClick={handleCancelCrop}
                        disabled={isLoading}
                        className="flex items-center gap-2 px-6 py-2 border-2 border-gray-300 rounded-lg hover:bg-gray-100 transition"
                      >
                        <FaTimes /> Cancel
                      </button>

                      {/* Preview */}
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
                          alt="Cropped"
                          className="w-80 h-80 p-1 object-cover rounded-full shadow border-2 border-[#3C8F63]"
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

                    {/* Message Display */}
                    {message && (
                      <div
                        className={
                          "p-3 rounded-md mb-4 bg-green-100 text-green-800"
                        }
                      >
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

                {/* Current Profile Photo */}
                {!imageSrc && profileData.profilePhoto && (
                  <div className="mt-4 text-center">
                    <p className="text-gray-700 font-medium mb-2">
                      Current Profile Photo:
                    </p>
                    <img
                      src={profileData.profilePhoto}
                      alt="Current Profile"
                      className="w-72 h-72 object-cover rounded-full border-2 border-gray-300 mx-auto"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Profile Update Form */}
            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Name Input */}
              <div>
                <label
                  className="block text-xl font-medium mb-2"
                  htmlFor="name"
                >
                  Full Name
                </label>
                <input
                  disabled={isLoading}
                  type="text"
                  className="w-full p-3 md:p-4 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3C8F63] focus:border-transparent"
                  id="name"
                  name="userName"
                  value={profileData.userName}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  maxLength={30}
                />
                <p className="text-sm text-gray-500 mt-1">
                  {profileData?.userName?.length}/30 characters
                </p>
              </div>

              {/* Bio Textarea */}
              <div>
                <label className="block text-xl font-medium mb-2" htmlFor="bio">
                  Bio
                </label>
                <textarea
                  disabled={isLoading}
                  className="w-full p-3 md:p-4 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3C8F63] focus:border-transparent resize-y"
                  id="bio"
                  name="bio"
                  value={profileData.bio}
                  onChange={handleChange}
                  placeholder="Tell us about yourself, your skills, and experience..."
                  rows="4"
                  maxLength={100}
                />
                <p className="text-sm text-gray-500 mt-1">
                  {profileData?.bio?.length}/100 characters
                </p>
              </div>

              {/* Open to Work Switch */}
              <div className="flex items-center justify-between p-4 border-2 border-gray-300 rounded-md">
                <div>
                  <label
                    className="block text-xl font-medium mb-1"
                    htmlFor="openToWork"
                  >
                    Open to Work
                  </label>
                  <p className="text-sm text-gray-600">
                    {profileData.openToWork
                      ? "You're currently open to new opportunities"
                      : "You're not actively looking for new opportunities"}
                  </p>
                </div>

                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    id="openToWork"
                    name="openToWork"
                    checked={profileData.openToWork}
                    onChange={handleChange}
                    disabled={isLoading}
                  />
                  <div className="w-14 h-7 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-7 peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-[#3C8F63]"></div>
                </label>
              </div>

              {/* Action buttons */}
              <div className="modal-action mt-8 flex flex-col-reverse sm:flex-row justify-end gap-3">
                <button
                  type="button"
                  disabled={isLoading}
                  className="btn btn-outline w-full sm:w-auto px-4 sm:px-8 py-3 text-lg border-2 border-gray-300 hover:bg-gray-100 hover:border-gray-400"
                  onClick={() =>
                    document.getElementById("profile_update_modal").close()
                  }
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="btn bg-[#3C8F63] border-[#3C8F63] hover:bg-[#337954] hover:border-green-700 w-full sm:w-auto px-4 sm:px-8 py-3 text-lg text-white"
                >
                  {isLoading ? "Working..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </dialog>
    </section>
  );
};

export default ProfileUpdateModal;
