// File  path__
import useUserData from "../../../Hooks/userData";

// From react__
import { useState } from "react";

// Package__
import Swal from "sweetalert2";
import { FaLightbulb } from "react-icons/fa";

const AboutModal = () => {
  const { profile, updateProfile } = useUserData();
  const [aboutUpdateLoading, setAboutUpdateLoading] = useState(false);
  const [headline, setHeadline] = useState(profile?.headline || "");

  const handleSave = () => {
    console.log(headline);
    setAboutUpdateLoading(true);

    updateProfile(
      { headline },
      {
        onSuccess: () => {
          document.getElementById("about_update_modal").close();

          Swal.fire({
            title: "Success!",
            text: "About updated successfully.",
            icon: "success",
          });
          setAboutUpdateLoading(false);
        },
        onError: (error) => {
          console.log(error);
          document.getElementById("about_update_modal").close();

          Swal.fire({
            title: "Update failed",
            text: "There might be some issue. Please try again!",
            icon: "error",
          });

          setAboutUpdateLoading(false);
        },
      }
    );
  };

  return (
    <>
      <section>
        <dialog id="about_update_modal" className="modal">
          <div className="modal-box max-w-[1024px] rounded-lg shadow-xl">
            <div className="px-2 lg:px-6 pb-2 lg:pb-6">
              <h1 className="text-2xl lg:text-3xl font-semibold font-[Montserrat] text-gray-800 mb-2">
                Edit about info
              </h1>

              <h2 className="text-xl font-medium text-gray-800 mb-6">About</h2>

              <div className="mb-6">
                <textarea
                  className="w-full min-h-72 p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3C8F63] focus:border-transparent resize-y"
                  placeholder="Tell us about yourself..."
                  value={profile?.headline || headline}
                  maxLength={650}
                  onChange={(e) => setHeadline(e.target.value)}
                ></textarea>
                <p className="text-sm text-gray-500 mt-1">
                  {headline.length}/650 characters
                </p>
              </div>

              <div className="bg-green-50 border-2 border-[#3C8F63] p-4 rounded-lg mb-6">
                <h3 className="text-lg font-medium text-gray-800 mb-3 flex items-center">
                  <span className="mr-2">
                    <FaLightbulb className="text-green-600 text-xl mt-1" />
                  </span>{" "}
                  Tips for a great bio
                </h3>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  <li>Start with a strong opening that grabs attention.</li>
                  <li>Highlight your key skills and accomplishments.</li>
                  <li>Keep it concise and easy to read.</li>
                  <li>Show your personality!</li>
                </ul>
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  disabled={aboutUpdateLoading}
                  className="btn btn-outline px-8 py-3 text-lg border-2 border-gray-300 hover:bg-gray-100 hover:border-gray-400"
                  onClick={() =>
                    document.getElementById("about_update_modal").close()
                  }
                >
                  Cancel
                </button>
                <button
                  disabled={aboutUpdateLoading}
                  className="btn bg-[#3C8F63] border-[#3C8F63] hover:bg-[#337954] hover:border-green-700 px-8 py-3 text-lg text-white"
                  onClick={handleSave}
                >
                  {aboutUpdateLoading ? "Working...." : "Save changes"}
                </button>
              </div>
            </div>
          </div>
        </dialog>
      </section>
    </>
  );
};

export default AboutModal;