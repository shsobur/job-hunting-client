import React, { useState } from "react";
import useUserData from "../../../Hooks/userData";
import { FaLightbulb } from "react-icons/fa";

const AboutModal = () => {
  const { profile } = useUserData();
  const [aboutText, setAboutText] = useState(profile?.headline || "");

  const handleSave = () => {
    // Handle save logic here
    console.log("Saving about text:", aboutText);
    document.getElementById("about_update_modal").close();
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
                  className="w-full min-h-72 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3C8F63] focus:border-transparent resize-none"
                  placeholder="Tell us about yourself..."
                  value={aboutText}
                  onChange={(e) => setAboutText(e.target.value)}
                ></textarea>
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
                  className="btn btn-outline px-8 py-3 text-lg border-2 border-gray-300 hover:bg-gray-100 hover:border-gray-400"
                  onClick={() =>
                    document.getElementById("about_update_modal").close()
                  }
                >
                  Cancel
                </button>
                <button
                  className="btn bg-[#3C8F63] border-[#3C8F63] hover:bg-[#337954] hover:border-green-700 px-8 py-3 text-lg text-white"
                  onClick={handleSave}
                >
                  Save changes
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
