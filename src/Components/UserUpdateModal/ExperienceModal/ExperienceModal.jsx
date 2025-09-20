import { useState, useEffect } from "react";
import { FaLightbulb } from "react-icons/fa";
import { FiTrash2 } from "react-icons/fi";
import { PiBagBold } from "react-icons/pi";
import { RiEditLine } from "react-icons/ri";
import useUserData from "../../../Hooks/userData";
import Swal from "sweetalert2";

const ExperienceModal = () => {
  const { profile, updateProfile } = useUserData();
  const [expUpdateLoading, setExpUpdateLoading] = useState(false);
  // State for form fields
  const [formData, setFormData] = useState({
    position: "",
    company: "",
    startDate: "",
    endDate: "",
    location: "",
    description: "",
    isCurrent: false,
  });

  // State for experiences and editing
  const [experiences, setExperiences] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);

  // Initial data__
  useEffect(() => {
    setExperiences(profile?.experience);
  }, [profile]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Handle adding/updating experience
  const handleAddExperience = () => {
    if (!formData.position || !formData.company || !formData.startDate) {
      return;
    }

    const newExperience = {
      position: formData.position,
      company: formData.company,
      startDate: formData.startDate,
      endDate: formData.isCurrent ? "Present" : formData.endDate,
      location: formData.location,
      description: formData.description,
      isCurrent: formData.isCurrent,
      // Add a field to identify current company
      status: formData.isCurrent ? "Current company" : "Previous company",
    };

    if (editingIndex !== null) {
      // Update existing experience
      const updatedExperiences = [...experiences];
      updatedExperiences[editingIndex] = newExperience;
      setExperiences(updatedExperiences);
      setEditingIndex(null);
    } else {
      // Add new experience
      setExperiences([...experiences, newExperience]);
    }

    // Reset form
    resetForm();
  };

  // Handle editing an experience
  const handleEditExperience = (index) => {
    const experience = experiences[index];
    setFormData({
      position: experience.position,
      company: experience.company,
      startDate: experience.startDate,
      endDate: experience.endDate === "Present" ? "" : experience.endDate,
      location: experience.location,
      description: experience.description,
      isCurrent: experience.isCurrent,
    });
    setEditingIndex(index);
  };

  // Handle deleting an experience
  const handleDeleteExperience = (index) => {
    const updatedExperiences = [...experiences];
    updatedExperiences.splice(index, 1);
    setExperiences(updatedExperiences);
  };

  // Reset form fields
  const resetForm = () => {
    setFormData({
      position: "",
      company: "",
      startDate: "",
      endDate: "",
      location: "",
      description: "",
      isCurrent: false,
    });
    setEditingIndex(null);
  };

  // Prepare the final object for database (as you requested)
  const prepareExperiencesForDB = () => {
    return experiences.map((exp) => ({
      ...exp,
      // You can add any additional formatting here
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const expData = {
      experience: prepareExperiencesForDB(),
    };

    setExpUpdateLoading(true);
    updateProfile(expData, {
      onSuccess: () => {
        document.getElementById("experience_update_modal").close();

        Swal.fire({
          title: "Success!",
          text: "Experience updated successfully.",
          icon: "success",
        });
        setExpUpdateLoading(false);
      },

      onError: () => {
        document.getElementById("experience_update_modal").close();

        Swal.fire({
          title: "Oops!",
          text: "Something went wrong while updating.",
          icon: "error",
        });

        setExpUpdateLoading(false);
      },
    });
  };

  return (
    <>
      <section>
        <dialog id="experience_update_modal" className="modal">
          <div className="modal-box max-w-[1024px] max-h-[95vh] overflow-y-auto">
            <div className="contact_update_main_content_container px-5 pt-5">
              <h1 className="modal_title font-semibold font-[Montserrat] text-3xl">
                Edit your experience
              </h1>
            </div>

            <div className="lg:p-5 sm:p-4">
              <div className="space-y-8">
                {/* Existing Experience Items */}
                {experiences?.map((experience, index) => (
                  <div
                    key={index}
                    className="border-2 border-[#3C8F63] rounded-lg p-6"
                  >
                    <div className="flex flex-col sm:flex-row items-start justify-between">
                      <div className="flex-1">
                        <h3 className="flex items-center gap-2 text-xl mb-2 font-semibold text-gray-900">
                          <PiBagBold />
                          {experience.position}
                        </h3>
                        <p className="text-gray-500">
                          {experience.company} · {experience.startDate} -{" "}
                          {experience.endDate}
                        </p>
                        <p className="text-gray-500">{experience.location}</p>
                        <p className="mt-4 text-gray-600">
                          {experience.description}
                        </p>
                        {experience.status && (
                          <span className="inline-block mt-2 px-2 py-1 bg-[#eef5f1] text-[#3C8F63] text-sm rounded">
                            {experience.status}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-2 mt-4 sm:mt-0 sm:ml-4">
                        <button
                          onClick={() => handleEditExperience(index)}
                          className="flex items-center justify-center p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
                        >
                          <RiEditLine
                            size={22}
                            className="hover:text-green-600"
                            title="Edit"
                          />
                        </button>

                        <button
                          onClick={() => handleDeleteExperience(index)}
                          className="flex items-center justify-center p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
                        >
                          <FiTrash2
                            size={22}
                            className="hover:text-red-500"
                            title="Delete"
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Add/Edit Experience Form */}
                <form
                  className="space-y-6 pt-8 border-t-2 border-[#3C8F63]"
                  onSubmit={handleSubmit}
                >
                  <h2 className="text-2xl font-bold text-gray-900">
                    {editingIndex !== null
                      ? "Edit Experience"
                      : "Add New Experience"}
                  </h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label
                        className="block text-lg font-medium text-gray-700 pb-2"
                        htmlFor="position-name"
                      >
                        Position name
                      </label>
                      <input
                        required
                        name="position"
                        className="w-full min-w-0 flex-1 resize-none overflow-hidden rounded-md text-gray-900 focus:outline-none border-2 border-gray-300 bg-white h-12 placeholder:text-gray-400 px-4 text-base font-normal leading-normal transition-colors duration-200 focus:border-[#3C8F63]"
                        id="position-name"
                        placeholder="e.g., Senior Product Designer"
                        type="text"
                        value={formData.position}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div>
                      <label
                        className="block text-lg font-medium text-gray-700 pb-2"
                        htmlFor="company"
                      >
                        Company
                      </label>
                      <input
                        required
                        name="company"
                        className="w-full min-w-0 flex-1 resize-none overflow-hidden rounded-md text-gray-900 focus:outline-none border-2 border-gray-300 bg-white h-12 placeholder:text-gray-400 px-4 text-base font-normal leading-normal transition-colors duration-200 focus:border-[#3C8F63]"
                        id="company"
                        placeholder="e.g., Slack"
                        type="text"
                        value={formData.company}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label
                        className="block text-lg font-medium text-gray-700 pb-2"
                        htmlFor="start-date"
                      >
                        Start date
                      </label>
                      <input
                        required
                        name="startDate"
                        className="w-full min-w-0 flex-1 resize-none overflow-hidden rounded-md text-gray-900 focus:outline-none border-2 border-gray-300 bg-white h-12 placeholder:text-gray-400 px-4 text-base font-normal leading-normal transition-colors duration-200 focus:border-[#3C8F63]"
                        id="start-date"
                        placeholder="e.g., 2020"
                        type="text"
                        value={formData.startDate}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div>
                      <label
                        className="block text-lg font-medium text-gray-700 pb-2"
                        htmlFor="end-date"
                      >
                        End date
                      </label>
                      <input
                        name="endDate"
                        disabled={formData.isCurrent}
                        className="w-full min-w-0 flex-1 resize-none overflow-hidden rounded-md text-gray-900 focus:outline-none border-2 border-gray-300 bg-white h-12 placeholder:text-gray-400 px-4 text-base font-normal leading-normal transition-colors duration-200 focus:border-[#3C8F63] disabled:bg-gray-100 disabled:text-gray-400"
                        id="end-date"
                        placeholder={
                          formData.isCurrent ? "Present" : "e.g., 2023"
                        }
                        type="text"
                        value={
                          formData.isCurrent ? "Present" : formData.endDate
                        }
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  <div className="flex items-center">
                    <input
                      name="isCurrent"
                      className="h-4 w-4 cursor-pointer rounded border-gray-300 text-[#3C8F63] focus:ring-[#3C8F63] transition-colors duration-200"
                      id="current-role"
                      type="checkbox"
                      checked={formData.isCurrent}
                      onChange={handleInputChange}
                    />
                    <label
                      className="ml-2 block text-sm text-gray-900"
                      htmlFor="current-role"
                    >
                      I'm currently working in this role
                    </label>
                  </div>

                  <div>
                    <label
                      className="block text-lg font-medium text-gray-700 pb-2"
                      htmlFor="location"
                    >
                      Location
                    </label>
                    <input
                      required
                      name="location"
                      className="w-full min-w-0 flex-1 resize-none overflow-hidden rounded-md text-gray-900 focus:outline-none border-2 border-gray-300 bg-white h-12 placeholder:text-gray-400 px-4 text-base font-normal leading-normal transition-colors duration-200 focus:border-[#3C8F63]"
                      id="location"
                      placeholder="e.g., San Francisco, CA"
                      type="text"
                      value={formData.location}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="flex flex-col items-end">
                    <div className="w-full">
                      <label
                        className="block text-lg font-medium text-gray-700 pb-2"
                        htmlFor="description"
                      >
                        Description
                      </label>
                      <textarea
                        name="description"
                        disabled={formData.isCurrent}
                        className="w-full min-w-0 flex-1 resize-y overflow-hidden rounded-md text-gray-900 focus:outline-none border-2 border-gray-300 bg-white min-h-32 placeholder:text-gray-400 p-4 text-base font-normal leading-normal transition-colors duration-200 focus:border-[#3C8F63] disabled:bg-gray-100 disabled:text-gray-400"
                        maxLength={200}
                        id="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        placeholder={
                          formData.isCurrent
                            ? "Description hidden for current role"
                            : "Describe your role and accomplishments."
                        }
                      ></textarea>
                      <p className="text-sm text-gray-500 mt-1">
                        {formData.description.length}/200 characters
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={handleAddExperience}
                      className="flex mt-4 min-w-[120px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-md h-12 px-6 bg-[#3C8F63] text-white text-base font-semibold leading-normal tracking-wide shadow-sm hover:bg-[#327a55] transition-colors duration-200"
                    >
                      <button disabled={expUpdateLoading} className="truncate">
                        {editingIndex !== null
                          ? "Update Experience"
                          : "Add Experience"}
                      </button>
                    </button>
                  </div>

                  {formData.isCurrent && (
                    <div className="bg-[#eef5f1] text-[#3C8F63] rounded-lg p-4 flex items-start gap-3 text-sm w-full">
                      <FaLightbulb className="text-[#3C8F63] text-xl mt-0.5" />
                      <p>
                        Your description will be hidden for your current role to
                        maintain privacy.
                      </p>
                    </div>
                  )}
                </form>
              </div>
            </div>

            <div className="flex justify-end space-x-4 px-6 py-5 rounded-b-xl">
              <button
                disabled={expUpdateLoading}
                type="button"
                onClick={() => {
                  resetForm();
                  document.getElementById("experience_update_modal").close();
                }}
                className="btn btn-outline px-8 py-3 text-lg border-2 border-gray-300 hover:bg-gray-100 hover:border-gray-400"
              >
                Cancel
              </button>

              <button
                disabled={expUpdateLoading}
                type="button"
                onClick={handleSubmit}
                className="btn bg-[#3C8F63] border-[#3C8F63] hover:bg-[#337954] hover:border-green-700 px-8 py-3 text-lg text-white"
              >
                {expUpdateLoading ? "Working...." : "Save Changes"}
              </button>
            </div>
          </div>
        </dialog>
      </section>
    </>
  );
};

export default ExperienceModal;
