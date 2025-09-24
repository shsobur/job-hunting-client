import { useState, useEffect } from "react";
import PPModal from "../PPModal/PPModal";
import useUserData from "../../../Hooks/userData";

const ProfileUpdateModal = () => {
  const { profile } = useUserData();
  const [profileData, setProfileData] = useState({
    profilePhoto: "",
    userName: "",
    bio: "",
    openToWork: false,
  });
  const [isLoading, setIsLoading] = useState(false);

  // Load initial profile data
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

  // Handle text/checkbox change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProfileData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // ✅ This gets called when child cropper returns final image
  const handleImageCropped = (croppedFile, previewUrl) => {
    // previewUrl → show in UI
    // croppedFile → later upload to Cloudinary
    setProfileData((prev) => ({
      ...prev,
      profilePhoto: previewUrl,
    }));

    console.log("Got cropped file in parent:", croppedFile);
  };

  // Submit form data
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const submissionData = {
        name: profileData.userName.trim(),
        bio: profileData.bio.trim(),
        openToWork: profileData.openToWork,
        profilePhoto: profileData.profilePhoto, // ✅ include cropped image
      };

      console.log("Submitting profile data:", submissionData);
      // Later: upload croppedFile → Cloudinary → replace profilePhoto with cloud URL
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setIsLoading(false);
    }
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

            {/* Profile Photo Cropper */}
            <div className="border-2 border-gray-300 rounded-md my-5">
              <PPModal onImageCropped={handleImageCropped} />
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
