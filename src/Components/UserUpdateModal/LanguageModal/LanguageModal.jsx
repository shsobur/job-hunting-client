// File path__
import "./LanguageModal.css";
import useUserData from "../../../Hooks/userData";
import SeekerModalHeader from "../../../MainLayout/Shared/SeekerModalHeader/SeekerModalHeader";

// From react__
import { useState, useEffect, useRef } from "react";

// Package__
import Swal from "sweetalert2";
import { FaLightbulb } from "react-icons/fa";
import { FiPlus, FiTrash2 } from "react-icons/fi";

const LanguageModal = () => {
  const { profile, updateProfile } = useUserData();
  const [languages, setLanguages] = useState([]);
  const [newLanguage, setNewLanguage] = useState("");
  const [proficiency, setProficiency] = useState("");
  const [languageLoading, setLanguageLoading] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  // Store original data to compare changes__
  const originalLanguagesRef = useRef([]);

  // Initialize languages from profile data__
  useEffect(() => {
    if (profile?.languages && Array.isArray(profile.languages)) {
      const languagesWithIds = profile.languages.map((lang, index) => ({
        ...lang,
        id: index + 1,
      }));
      setLanguages(languagesWithIds);
      originalLanguagesRef.current = languagesWithIds;
    } else {
      setLanguages([]);
      originalLanguagesRef.current = [];
    }
    setHasChanges(false);
  }, [profile]);

  // Check if current languages are different from original__
  const checkForChanges = (currentLangs) => {
    const original = originalLanguagesRef.current;

    if (currentLangs.length !== original.length) return true;

    // Check if any language is different
    for (let i = 0; i < currentLangs.length; i++) {
      const current = currentLangs[i];
      const originalLang = original[i];

      if (
        !originalLang ||
        current.name !== originalLang.name ||
        current.proficiency !== originalLang.proficiency
      ) {
        return true;
      }
    }

    return false;
  };

  const handleAddLanguage = () => {
    if (newLanguage && proficiency) {
      const exists = languages.some(
        (lang) =>
          lang.name.toLowerCase().trim() === newLanguage.toLowerCase().trim()
      );
      if (exists) {
        const modal = document.getElementById("language_update_modal");
        modal.close();

        Swal.fire({
          title: "Duplicate!",
          text: `${newLanguage} is already added.`,
          icon: "warning",
        }).then(() => modal.showModal());
        return;
      }

      const newLang = {
        id: Date.now(),
        name: newLanguage,
        proficiency,
      };

      const updatedLanguages = [...languages, newLang];
      setLanguages(updatedLanguages);
      setHasChanges(checkForChanges(updatedLanguages));
      setNewLanguage("");
      setProficiency("");
    }
  };

  const handleDeleteLanguage = (id) => {
    const updatedLanguages = languages.filter((lang) => lang.id !== id);
    setLanguages(updatedLanguages);
    setHasChanges(checkForChanges(updatedLanguages));
  };

  // Handle input changes for new language__
  const handleNewLanguageChange = (e) => {
    setNewLanguage(e.target.value);
  };

  // Handle proficiency changes__
  const handleProficiencyChange = (e) => {
    setProficiency(e.target.value);
  };

  const handleSubmit = () => {
    const languagesForBackend = languages.map(({ ...rest }) => rest);

    const languageData = {
      languages: languagesForBackend,
    };

    setLanguageLoading(true);
    updateProfile(languageData, {
      onSuccess: () => {
        document.getElementById("language_update_modal").close();

        // Update original reference after successful save__
        originalLanguagesRef.current = languages;

        Swal.fire({
          title: "Success!",
          text: "Language updated successfully.",
          icon: "success",
        });

        setLanguageLoading(false);
        setHasChanges(false);
      },
      onError: () => {
        document.getElementById("language_update_modal").close();

        Swal.fire({
          title: "Oops!",
          text: "Something went wrong while updating.",
          icon: "error",
        });

        setLanguageLoading(false);
      },
    });
  };

  const handleCancel = () => {
    const modal = document.getElementById("language_update_modal");
    modal.close();

    // Reset form to original data__
    if (profile?.languages && Array.isArray(profile.languages)) {
      const languagesWithIds = profile.languages.map((lang, index) => ({
        ...lang,
        id: index + 1,
      }));
      setLanguages(languagesWithIds);
    } else {
      setLanguages([]);
    }
    setNewLanguage("");
    setProficiency("");
    setHasChanges(false);
  };

  const handleCloseModal = () => {
    const modal = document.getElementById("language_update_modal");
    modal.close();
  };

  return (
    <section>
      <dialog id="language_update_modal" className="modal">
        <div className="modal-box max-w-[1024px] max-h-[95vh] lg:p-0 p-0">
          <div className="language_update_main_content_container">
            {/* Header - Same as ContactModal */}
            <SeekerModalHeader
              title={"Edit language info"}
              handleCloseModal={handleCloseModal}
            ></SeekerModalHeader>

            {/* Form - Using same structure as ContactModal */}
            <div className="space-y-8 px-5">
              {/* Add Language Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="form-control">
                  <label className="label mb-2">
                    <span className="label-text text-gray-700 font-medium text-xl">
                      Language
                    </span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Spanish"
                    className="input input-bordered w-full text-lg h-[45px] px-4 border-2 border-gray-300 rounded-lg focus:border-[#3C8F63] focus:outline-none transition-colors"
                    value={newLanguage}
                    onChange={handleNewLanguageChange}
                  />
                </div>

                <div className="form-control">
                  <label className="label mb-2">
                    <span className="label-text text-gray-700 font-medium text-xl">
                      Proficiency
                    </span>
                  </label>
                  <select
                    className="select select-bordered cursor-pointer w-full text-lg h-[45px] px-4 border-2 border-gray-300 rounded-lg focus:border-[#3C8F63] focus:outline-none transition-colors"
                    value={proficiency}
                    onChange={handleProficiencyChange}
                  >
                    <option value="">Select proficiency</option>
                    <option value="Elementary proficiency">
                      Elementary proficiency
                    </option>
                    <option value="Limited working proficiency">
                      Limited working proficiency
                    </option>
                    <option value="Professional working proficiency">
                      Professional working proficiency
                    </option>
                    <option value="Full professional proficiency">
                      Full professional proficiency
                    </option>
                    <option value="Native or bilingual proficiency">
                      Native or bilingual proficiency
                    </option>
                  </select>
                </div>
              </div>

              {/* Add Button - Same style as ContactModal buttons */}
              <div className="flex items-center">
                <button
                  onClick={handleAddLanguage}
                  disabled={!newLanguage || !proficiency}
                  className={`btn h-[45px] text-lg px-6
                    ${
                      newLanguage && proficiency
                        ? "bg-[#3C8F63] text-white hover:bg-[#337954]"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
                >
                  <FiPlus className="mr-2" />
                  Add Language
                </button>
              </div>

              {/* Tip Box - Same as ContactModal */}
              <div className="bg-[#F0FDF4] border border-[#3C8F63] p-5 rounded-lg">
                <div className="flex items-start">
                  <FaLightbulb className="text-green-600 text-xl mr-4" />
                  <div>
                    <div className="text-[#276043] text-base">
                      <b>
                        <i>Tip:</i>
                      </b>{" "}
                      You can add multiple languages and indicate your{" "}
                      <b>proficiency</b> level for each to showcase your
                      linguistic skills to potential employers.
                    </div>
                  </div>
                </div>
              </div>

              {/* Your Languages List */}
              <div>
                <h3 className="text-2xl font-semibold text-gray-800 mb-6">
                  Your Languages
                </h3>

                {languages.length > 0 ? (
                  <div className="space-y-4">
                    {languages.map((language) => (
                      <div
                        key={language.id}
                        className="flex justify-between items-center p-4 border-2 border-gray-300 rounded-lg"
                      >
                        <div>
                          <h3 className="font-medium text-gray-800 text-lg">
                            {language.name}
                          </h3>
                          <p className="text-gray-600">
                            {language.proficiency}
                          </p>
                        </div>
                        <button
                          onClick={() => handleDeleteLanguage(language.id)}
                          className="text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <FiTrash2 size={20} />
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-8 text-lg">
                    No languages added yet.
                  </p>
                )}
              </div>
            </div>

            {/* Action Buttons - Now with proper disable logic */}
            <div className="flex justify-end gap-4 bg-[#eef1f4] px-5 py-6 mt-6">
              <button
                type="button"
                disabled={languageLoading || !hasChanges}
                onClick={handleCancel}
                className={`btn btn-outline px-8 py-3 text-lg border-2 ${
                  languageLoading || !hasChanges
                    ? "border-gray-200 text-gray-400 cursor-not-allowed"
                    : "border-gray-300 hover:bg-gray-100 hover:border-gray-400"
                }`}
              >
                Cancel
              </button>

              <button
                onClick={handleSubmit}
                disabled={languageLoading || !hasChanges}
                className={`btn px-8 py-3 text-lg ${
                  languageLoading || !hasChanges
                    ? "bg-gray-300 border-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-[#3C8F63] border-[#3C8F63] hover:bg-[#337954] text-white"
                }`}
              >
                {languageLoading ? "Working...." : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      </dialog>
    </section>
  );
};

export default LanguageModal;