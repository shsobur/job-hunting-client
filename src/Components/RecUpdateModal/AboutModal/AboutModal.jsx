import { useEffect, useState } from "react";
import useUserData from "../../../Hooks/userData";
import Swal from "sweetalert2";

const AboutModal = () => {
  const { profile, updateProfile } = useUserData();
  const [aboutUpdateLoading, setAboutUpdateLoading] = useState(false);
  const [aboutInfo, setAboutInfo] = useState({
    description: "",
    mission: "",
    vision: "",
  });

  useEffect(() => {
    setAboutInfo({
      description: profile?.description || "",
      mission: profile?.mission || "",
      vision: profile?.vision || "",
    });
  }, [profile]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAboutInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setAboutUpdateLoading(true);
    updateProfile(aboutInfo, {
      onSuccess: () => {
        document.getElementById("rec_about_update_modal").close();

        Swal.fire({
          title: "Success!",
          text: "About us updated successfully.",
          icon: "success",
        });

        setAboutUpdateLoading(false);
      },
      onError: (err) => {
        console.log(err);
        document.getElementById("rec_about_update_modal").close();

        Swal.fire({
          title: "Oops!",
          text: "Something went wrong while updating.",
          icon: "error",
        });

        setAboutUpdateLoading(false);
      },
    });
  };

  return (
    <>
      <section>
        <dialog id="rec_about_update_modal" className="modal">
          <div className="modal-box max-w-[1024px]">
            <form method="dialog" className="mb-5">
              <button className="btn btn-sm btn-circle btn-ghost border border-gray-400 absolute right-2 top-2">
                <span className="text-2xl font-semibold text-gray-700">×</span>
              </button>
            </form>

            <div className="contact_update_main_content_container">
              <h1 className="modal_title font-semibold font-[Montserrat] text-3xl">
                Edit about info
              </h1>
            </div>

            {/* Added form content */}
            <div className="mt-6">
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label
                    className="block text-xl font-medium mb-2"
                    htmlFor="about-us"
                  >
                    About Us
                  </label>
                  <textarea
                    disabled={aboutUpdateLoading}
                    className="w-full p-4 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3C8F63] focus:border-transparent resize-y"
                    id="about-us"
                    name="description"
                    value={aboutInfo.description}
                    onChange={handleChange}
                    placeholder="Describe your company's history, values, and what makes it unique..."
                    rows="6"
                    maxLength={650}
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    {aboutInfo.description?.length}/650 characters
                  </p>
                </div>

                <div>
                  <label
                    className="block text-xl  font-medium mb-2"
                    htmlFor="mission"
                  >
                    Mission
                  </label>
                  <textarea
                    disabled={aboutUpdateLoading}
                    className="w-full p-4 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3C8F63] focus:border-transparent resize-y"
                    id="mission"
                    name="mission"
                    value={aboutInfo.mission}
                    onChange={handleChange}
                    placeholder="State your company's core purpose and what it aims to achieve..."
                    rows="2"
                  />
                </div>

                <div>
                  <label
                    className="block text-xl font-medium mb-2"
                    htmlFor="vision"
                  >
                    Vision
                  </label>
                  <textarea
                    disabled={aboutUpdateLoading}
                    className="w-full p-4 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3C8F63] focus:border-transparent resize-y"
                    id="vision"
                    name="vision"
                    value={aboutInfo.vision}
                    onChange={handleChange}
                    placeholder="Describe the future your company aspires to create..."
                    rows="2"
                  />
                </div>

                {/* Action buttons - moved inside form for proper submission */}
                <div className="modal-action mt-8 flex justify-end space-x-3">
                  <form method="dialog">
                    <button
                      disabled={aboutUpdateLoading}
                      className="btn btn-outline px-8 py-3 text-lg border-2 border-gray-300 hover:bg-gray-100 hover:border-gray-400"
                    >
                      Cancel
                    </button>
                  </form>
                  <button
                    type="submit"
                    disabled={aboutUpdateLoading}
                    className="btn bg-[#3C8F63] border-[#3C8F63] hover:bg-[#337954] hover:border-green-700 px-8 py-3 text-lg text-white"
                  >
                    {aboutUpdateLoading ? "Working...." : "Save Changes"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </dialog>
      </section>
    </>
  );
};

export default AboutModal;
