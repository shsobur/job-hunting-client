import { useEffect, useState } from "react";
import useUserData from "../../../Hooks/userData";
import { FiTrash2 } from "react-icons/fi";
import { FaLightbulb } from "react-icons/fa";
import Swal from "sweetalert2";

const SkillModal = () => {
  const { profile, updateProfile } = useUserData();
  const [skills, setSkills] = useState(profile?.skills || []);
  const [newSkill, setNewSkill] = useState("");
  const [skillUpdateLoading, setSkillUpdateLoading] = useState(false);

  useEffect(() => {
    setSkills(profile?.skills);
  }, [profile]);

  const handleAddSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill("");
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove));
  };

  const handleSaveChanges = () => {
    // Here you would typically save the skills to your backend
    console.log("Skills to save:", skills);

    setSkillUpdateLoading(true);
    updateProfile(
      { skills },
      {
        onSuccess: () => {
          document.getElementById("skill_update_modal").close();

          Swal.fire({
            title: "Success!",
            text: "Skills updated successfully.",
            icon: "success",
          });

          setSkillUpdateLoading(false);
        },
        onError: () => {
          document.getElementById("skill_update_modal").close();

          Swal.fire({
            title: "Oops!",
            text: "Something went wrong while updating.",
            icon: "error",
          });

          setSkillUpdateLoading(false);
        },
      }
    );

    document.getElementById("skill_update_modal").close();
  };

  return (
    <>
      <section>
        <dialog id="skill_update_modal" className="modal">
          <div className="modal-box max-w-[1024px] max-h-[95vh] p-6">
            <div className="contact_update_main_content_container">
              <h1 className="modal_title font-semibold font-[Montserrat] text-3xl text-slate-900 mb-8">
                Edit Your Skills
              </h1>
            </div>

            <div className="">
              <div className="max-w-2xl">
                <label
                  className="block text-lg font-medium text-slate-700 mb-2"
                  htmlFor="skill-input"
                >
                  Skill name
                </label>
                <div className="flex items-center gap-4">
                  <input
                    disabled={skillUpdateLoading}
                    className="flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-md text-slate-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3C8F63] border border-slate-300 bg-white h-12 placeholder:text-slate-400 px-3 text-sm font-normal leading-normal"
                    id="skill-input"
                    placeholder="e.g., Project Management"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                  />
                  <button
                    type="button"
                    disabled={skillUpdateLoading}
                    onClick={handleAddSkill}
                    className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-md h-12 px-4 bg-[#3C8F63] text-white text-sm font-semibold leading-normal tracking-wide hover:bg-[#327a55] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3C8F63]"
                  >
                    <span className="truncate">Add Skill</span>
                  </button>
                </div>
              </div>

              <div className="mt-8">
                <h2 className="text-2xl font-semibold leading-tight text-slate-900">
                  Your Skills
                </h2>
                <div className="mt-4 flex flex-col gap-3">
                  {skills.length > 0 ? (
                    skills.map((skill, index) => (
                      <div
                        key={index}
                        className="flex h-14 w-full items-center justify-between rounded-md bg-slate-100 px-3 text-slate-700"
                      >
                        <p className="text-xl font-semibold">{skill}</p>
                        <button
                          disabled={skillUpdateLoading}
                          type="button"
                          onClick={() => handleRemoveSkill(skill)}
                          className="material-symbols-outlined !text-base !leading-none"
                        >
                          <FiTrash2 size={20} color="red"></FiTrash2>
                        </button>
                      </div>
                    ))
                  ) : (
                    <p className="text-base text-slate-500 py-2">
                      No skills added yet
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-10 p-4 rounded-lg bg-[#F0FDF4] border-2 border-[#3C8F63]">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <span className="material-symbols-outlined text-[#3C8F63]">
                      <FaLightbulb className="text-[#3C8F63] text-xl" />
                    </span>
                  </div>
                  <div className="ml-3">
                    <div className="text-base text-[#386a51]">
                      <p>
                        Adding at least <b>5 relevant skills</b> can
                        significantly increase your visibility to recruiters and
                        potential collaborators.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="modal-action mt-8 flex justify-end space-x-3">
              <form method="dialog">
                <button
                  disabled={skillUpdateLoading}
                  className="btn btn-outline px-8 py-3 text-lg border-2 border-gray-300 hover:bg-gray-100 hover:border-gray-400"
                >
                  Cancel
                </button>
              </form>
              <button
                disabled={skillUpdateLoading}
                onClick={handleSaveChanges}
                className="btn bg-[#3C8F63] border-[#3C8F63] hover:bg-[#337954] hover:border-green-700 px-8 py-3 text-lg text-white"
              >
                {skillUpdateLoading ? "Working...." : "Save Changes"}
              </button>
            </div>
          </div>
        </dialog>
      </section>
    </>
  );
};

export default SkillModal;
