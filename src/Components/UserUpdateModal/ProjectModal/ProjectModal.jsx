import { useState, useEffect } from "react";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import useUserData from "../../../Hooks/userData";
import Swal from "sweetalert2";

const ProjectUpdateModal = () => {
  const { profile, updateProfile } = useUserData();
  const [projects, setProjects] = useState([]);
  const [currentProject, setCurrentProject] = useState({
    title: "",
    projectLink: "",
    description: "",
    skills: [],
    currentlyWorking: false,
    startMonth: "",
    startYear: "",
    endMonth: "",
    endYear: "",
  });

  const [newSkill, setNewSkill] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Months for dropdown
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Years for dropdown (2001 to current year)
  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - 2000 },
    (_, i) => currentYear - i
  );

  // Initialize with profile data
  useEffect(() => {
    if (profile?.projects) {
      setProjects(profile.projects);
    }
  }, [profile]);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCurrentProject((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Add new skill
  const handleAddSkill = () => {
    if (newSkill.trim() && currentProject.skills.length < 6) {
      setCurrentProject((prev) => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()],
      }));
      setNewSkill("");
    }
  };

  // Remove skill
  const handleRemoveSkill = (index) => {
    setCurrentProject((prev) => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index),
    }));
  };

  // Add or update project
  const handleAddProject = () => {
    if (!currentProject.title.trim() || !currentProject.description.trim()) {
      alert("Please fill in title and description");
      return;
    }

    const projectData = {
      ...currentProject,
      id:
        editingIndex !== null
          ? projects[editingIndex].id
          : Date.now().toString(),
    };

    if (editingIndex !== null) {
      // Update existing project
      const updatedProjects = [...projects];
      updatedProjects[editingIndex] = projectData;
      setProjects(updatedProjects);
    } else {
      // Add new project at the top
      setProjects((prev) => [projectData, ...prev]);
    }

    // Reset form
    resetForm();
  };

  // Edit project
  const handleEditProject = (index) => {
    const projectToEdit = projects[index];
    setCurrentProject(projectToEdit);
    setEditingIndex(index);
  };

  // Delete project
  const handleDeleteProject = (index) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      const updatedProjects = projects.filter((_, i) => i !== index);
      setProjects(updatedProjects);
      if (editingIndex === index) {
        resetForm();
      }
    }
  };

  // Reset form
  const resetForm = () => {
    setCurrentProject({
      title: "",
      projectLink: "",
      description: "",
      skills: [],
      currentlyWorking: false,
      startMonth: "",
      startYear: "",
      endMonth: "",
      endYear: "",
    });
    setNewSkill("");
    setEditingIndex(null);
  };

  // Handle final submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Prepare data for submission
    const submissionData = {
      projects: projects.map((project) => ({
        id: project.id,
        title: project.title.trim(),
        projectLink: project.projectLink.trim(),
        description: project.description.trim(),
        skills: project.skills,
        currentlyWorking: project.currentlyWorking,
        startDate:
          project.startYear && project.startMonth
            ? `${project.startMonth} ${project.startYear}`
            : "",
        endDate: project.currentlyWorking
          ? "Present"
          : project.endYear && project.endMonth
          ? `${project.endMonth} ${project.endYear}`
          : "",
      })),
    };

    updateProfile(submissionData, {
      onSuccess: () => {
        document.getElementById("project_update_modal").close();

        Swal.fire({
          title: "Success!",
          text: "Project updated successfully.",
          icon: "success",
        });

        setIsSubmitting(false);
      },

      onError: () => {
        document.getElementById("project_update_modal").close();

        Swal.fire({
          title: "Oops!",
          text: "Something went wrong while updating.",
          icon: "error",
        });

        setIsSubmitting(false);
      },
    });
  };

  // Check if form has required fields for adding project
  const canAddProject =
    currentProject.title.trim() && currentProject.description.trim();

  return (
    <>
      <section>
        <dialog id="project_update_modal" className="modal">
          <div className="modal-box max-w-[1024px] max-h-[95vh] overflow-y-auto">
            <form method="dialog" className="mb-5">
              <button
                type="button"
                className="btn btn-sm btn-circle btn-ghost border border-gray-400 absolute right-2 top-2"
                onClick={() =>
                  document.getElementById("project_update_modal").close()
                }
              >
                <span className="text-2xl font-semibold text-gray-700">×</span>
              </button>
            </form>

            <div className="contact_update_main_content_container">
              <h1 className="modal_title font-semibold font-[Montserrat] text-3xl">
                {profile?.projects?.length ? "Update Projects" : "Add Projects"}
              </h1>
            </div>

            <div className="mt-6">
              <form>
                {/* Projects List at the Top */}
                {projects.length > 0 && (
                  <div className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">
                      Your Projects ({projects.length})
                    </h2>
                    <div className="space-y-4">
                      {projects.map((project, index) => (
                        <div
                          key={project.id}
                          className="border border-gray-300 rounded-lg p-4 bg-gray-50"
                        >
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h3 className="text-xl font-semibold text-gray-800">
                                {project.title}
                              </h3>
                              {project.projectLink && (
                                <a
                                  href={project.projectLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-blue-600 hover:text-blue-800 text-sm"
                                >
                                  {project.projectLink}
                                </a>
                              )}
                            </div>
                            <div className="flex space-x-3">
                              <button
                                type="button"
                                onClick={() => handleEditProject(index)}
                                disabled={isSubmitting}
                                className="text-[#3C8F63] hover:text-[#337954] p-1 rounded"
                                title="Edit project"
                              >
                                <FaEdit size={16} />
                              </button>
                              <button
                                type="button"
                                onClick={() => handleDeleteProject(index)}
                                disabled={isSubmitting}
                                className="text-red-600 hover:text-red-800 p-1 rounded"
                                title="Delete project"
                              >
                                <FaTrash size={16} />
                              </button>
                            </div>
                          </div>
                          <p className="text-gray-600 mb-2">
                            {project.description}
                          </p>
                          {project.skills.length > 0 && (
                            <div className="flex flex-wrap gap-2 mb-2">
                              {project.skills.map((skill, skillIndex) => (
                                <span
                                  key={skillIndex}
                                  className="bg-[#3C8F63] text-white px-2 py-1 rounded-full text-sm"
                                >
                                  {skill}
                                </span>
                              ))}
                            </div>
                          )}
                          <p className="text-sm text-gray-500">
                            {project.currentlyWorking && " • Currently working"}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Project Form */}
                <div className="space-y-6">
                  <div>
                    <label
                      className="block text-xl font-medium mb-2"
                      htmlFor="title"
                    >
                      Project Title *
                    </label>
                    <input
                      disabled={isSubmitting}
                      type="text"
                      className="w-full p-3 md:p-4 border-2 border-gray-300 rounded-md focus:outline-none focus:border-[#3C8F63] transition-colors"
                      id="title"
                      name="title"
                      value={currentProject.title}
                      onChange={handleChange}
                      placeholder="Enter project title"
                      maxLength={100}
                      required
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      {currentProject.title.length}/100 characters
                    </p>
                  </div>

                  <div>
                    <label
                      className="block text-xl font-medium mb-2"
                      htmlFor="projectLink"
                    >
                      Project Link
                    </label>
                    <input
                      disabled={isSubmitting}
                      type="url"
                      className="w-full p-3 md:p-4 border-2 border-gray-300 rounded-md focus:outline-none focus:border-[#3C8F63] transition-colors"
                      id="projectLink"
                      name="projectLink"
                      value={currentProject.projectLink}
                      onChange={handleChange}
                      placeholder="https://example.com/project"
                    />
                  </div>

                  <div>
                    <label
                      className="block text-xl font-medium mb-2"
                      htmlFor="description"
                    >
                      Project Description *
                    </label>
                    <textarea
                      disabled={isSubmitting}
                      className="w-full p-3 md:p-4 border-2 border-gray-300 rounded-md focus:outline-none focus:border-[#3C8F63] transition-colors resize-y"
                      id="description"
                      name="description"
                      value={currentProject.description}
                      onChange={handleChange}
                      placeholder="Describe your project, your role, and key achievements..."
                      rows="4"
                      maxLength={600}
                      required
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      {currentProject.description.length}/600 characters
                    </p>
                  </div>

                  {/* Skills Section */}
                  <div>
                    <label className="block text-xl font-medium mb-2">
                      Skills Used{" "}
                      {currentProject.skills.length > 0 &&
                        `(${currentProject.skills.length}/6)`}
                    </label>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {currentProject.skills.map((skill, index) => (
                        <span
                          key={index}
                          className="bg-[#3C8F63] text-white px-3 py-1 rounded-full flex items-center"
                        >
                          {skill}
                          <button
                            type="button"
                            onClick={() => handleRemoveSkill(index)}
                            disabled={isSubmitting}
                            className="ml-2 text-white hover:text-gray-200"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                    {currentProject.skills.length < 6 && (
                      <div className="flex gap-2">
                        <input
                          disabled={isSubmitting}
                          type="text"
                          className="flex-1 p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:border-[#3C8F63] transition-colors"
                          value={newSkill}
                          onChange={(e) => setNewSkill(e.target.value)}
                          placeholder="Add a skill (max 6)"
                          onKeyPress={(e) =>
                            e.key === "Enter" &&
                            (e.preventDefault(), handleAddSkill())
                          }
                        />
                        <button
                          type="button"
                          onClick={handleAddSkill}
                          disabled={isSubmitting || !newSkill.trim()}
                          className="btn bg-[#3C8F63] border-[#3C8F63] hover:bg-[#337954] hover:border-green-700 px-4 py-6 text-white disabled:bg-gray-400 disabled:border-gray-400"
                        >
                          <FaPlus className="inline" /> Add Skill
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Additional Details */}
                  <div className="border-t pt-6">
                    <h3 className="text-xl font-medium mb-4">
                      Additional Details
                    </h3>

                    <div className="flex items-center mb-4">
                      <input
                        type="checkbox"
                        id="currentlyWorking"
                        name="currentlyWorking"
                        checked={currentProject.currentlyWorking}
                        onChange={handleChange}
                        disabled={isSubmitting}
                        className="w-4 h-4 text-[#3C8F63] bg-gray-100 border-gray-300 rounded focus:ring-[#3C8F63]"
                      />
                      <label
                        htmlFor="currentlyWorking"
                        className="ml-2 text-lg font-medium"
                      >
                        I am currently working on this project
                      </label>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-lg font-medium mb-2">
                          Start Date
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                          <select
                            disabled={isSubmitting}
                            className="p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:border-[#3C8F63] transition-colors"
                            name="startMonth"
                            value={currentProject.startMonth}
                            onChange={handleChange}
                          >
                            <option value="">Month</option>
                            {months.map((month) => (
                              <option key={month} value={month}>
                                {month}
                              </option>
                            ))}
                          </select>
                          <select
                            disabled={isSubmitting}
                            className="p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:border-[#3C8F63] transition-colors"
                            name="startYear"
                            value={currentProject.startYear}
                            onChange={handleChange}
                          >
                            <option value="">Year</option>
                            {years.map((year) => (
                              <option key={year} value={year}>
                                {year}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-lg font-medium mb-2">
                          End Date
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                          <select
                            disabled={
                              isSubmitting || currentProject.currentlyWorking
                            }
                            className="p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:border-[#3C8F63] transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed"
                            name="endMonth"
                            value={currentProject.endMonth}
                            onChange={handleChange}
                          >
                            <option value="">Month</option>
                            {months.map((month) => (
                              <option key={month} value={month}>
                                {month}
                              </option>
                            ))}
                          </select>
                          <select
                            disabled={
                              isSubmitting || currentProject.currentlyWorking
                            }
                            className="p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:border-[#3C8F63] transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed"
                            name="endYear"
                            value={currentProject.endYear}
                            onChange={handleChange}
                          >
                            <option value="">Year</option>
                            {years.map((year) => (
                              <option key={year} value={year}>
                                {year}
                              </option>
                            ))}
                          </select>
                        </div>
                        {currentProject.currentlyWorking && (
                          <p className="text-sm text-gray-500 mt-1">
                            End date is disabled for current projects
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Add/Update Project Button */}
                  <div className="flex justify-center">
                    <button
                      type="button"
                      onClick={handleAddProject}
                      disabled={isSubmitting || !canAddProject}
                      className="btn bg-[#3C8F63] border-[#3C8F63] hover:bg-[#337954] hover:border-green-700 px-8 py-3 text-lg text-white disabled:bg-gray-400 disabled:border-gray-400"
                    >
                      {editingIndex !== null ? "Update Project" : "Add Project"}
                    </button>
                  </div>
                </div>

                {/* Final Save Changes Button */}
                <div className="modal-action mt-8 flex flex-col-reverse sm:flex-row justify-end gap-3">
                  <button
                    type="button"
                    disabled={isSubmitting}
                    className="btn btn-outline w-full sm:w-auto px-4 sm:px-8 py-3 text-lg border-2 border-gray-300 hover:bg-gray-100 hover:border-gray-400 disabled:bg-gray-100 disabled:cursor-not-allowed"
                    onClick={() =>
                      document.getElementById("project_update_modal").close()
                    }
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    onClick={handleSubmit}
                    className="btn bg-[#3C8F63] border-[#3C8F63] hover:bg-[#337954] hover:border-green-700 w-full sm:w-auto px-4 sm:px-8 py-3 text-lg text-white disabled:bg-gray-400 disabled:border-gray-400"
                  >
                    {isSubmitting ? "Saving..." : "Save Changes"}
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

export default ProjectUpdateModal;
