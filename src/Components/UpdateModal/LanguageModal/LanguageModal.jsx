import "./LanguageModal.css";
import { useState } from "react";
import { FaLightbulb } from "react-icons/fa";
import { FiX, FiPlus, FiTrash2 } from "react-icons/fi";

const LanguageModal = () => {
  const [languages, setLanguages] = useState([
    { id: 1, name: "English", proficiency: "Native or bilingual proficiency" },
    { id: 2, name: "French", proficiency: "Professional working proficiency" },
  ]);
  const [newLanguage, setNewLanguage] = useState("");
  const [proficiency, setProficiency] = useState("");

  const handleAddLanguage = () => {
    if (newLanguage && proficiency) {
      const newLang = {
        id: languages.length + 1,
        name: newLanguage,
        proficiency,
      };
      setLanguages([...languages, newLang]);
      setNewLanguage("");
      setProficiency("");
    }
  };

  const handleDeleteLanguage = (id) => {
    setLanguages(languages.filter((lang) => lang.id !== id));
  };

  return (
    <>
      <section>
        <dialog id="language_update_modal" className="modal">
          <div className="modal-box max-w-[1024px] w-full p-6">
            <div className="contact_update_main_content_container">
              <div className="flex justify-between items-center mb-6">
                <h1 className="modal_title font-semibold font-[Montserrat] text-3xl text-[#333]">
                  Edit Language Info
                </h1>
                <form method="dialog">
                  <button className="text-gray-500 hover:text-gray-700">
                    <FiX size={24} />
                  </button>
                </form>
              </div>

              <div className="mb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-xl font-medium text-gray-700 mb-1">
                      Language
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., Spanish"
                      className="w-full px-4 py-[15px] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3C8F63]"
                      value={newLanguage}
                      onChange={(e) => setNewLanguage(e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="block text-xl font-medium text-gray-700 mb-1">
                      Proficiency
                    </label>
                    <select
                      className="w-full px-4 py-[18px] bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3C8F63]"
                      value={proficiency}
                      onChange={(e) => setProficiency(e.target.value)}
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

                <div className="flex items-center mb-6">
                  <button
                    onClick={handleAddLanguage}
                    className="btn text-base flex items-center border border-[#3C8F63] text-[#3C8F63] bg-[#F0FDF4] hover:bg-[#e0efe5] font-semibold"
                  >
                    <FiPlus className="mr-1" />
                    Add Language
                  </button>
                </div>

                <div className="bg-green-50 border-2 border-[#3C8F63] p-4 rounded-md mb-6">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1 mr-2">
                      <FaLightbulb className="text-[#3C8F63] text-xl mr-4" />
                    </div>
                    <p className="text-lg text-[#3C8F63]">
                      Tip: You can add multiple languages and indicate your
                      proficiency level for each to showcase your linguistic
                      skills to potential employers.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-medium text-gray-800 mb-4">
                  Your Languages
                </h2>

                {languages.length > 0 ? (
                  <div className="space-y-4">
                    {languages.map((language) => (
                      <div
                        key={language.id}
                        className="flex justify-between items-start p-4 border border-[#3C8F63] rounded-md"
                      >
                        <div>
                          <h3 className="font-medium text-gray-800">
                            {language.name}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {language.proficiency}
                          </p>
                        </div>
                        <button
                          onClick={() => handleDeleteLanguage(language.id)}
                          className="text-gray-400 hover:text-red-500"
                        >
                          <FiTrash2 size={20} />
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-4">
                    No languages added yet.
                  </p>
                )}
              </div>

              <div className="modal-action mt-8 flex justify-end space-x-3">
                <form method="dialog">
                  <button className="btn btn-outline px-8 py-3 text-lg border-2 border-gray-300 hover:bg-gray-100 hover:border-gray-400">
                    Cancel
                  </button>
                </form>
                <button className="btn bg-[#3C8F63] border-[#3C8F63] hover:bg-[#337954] hover:border-green-700 px-8 py-3 text-lg text-white">
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </dialog>
      </section>
    </>
  );
};

export default LanguageModal;
