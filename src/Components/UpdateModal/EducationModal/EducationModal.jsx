import { FaSchool, FaLightbulb, FaTimes } from "react-icons/fa";

const EducationModal = () => {
  return (
    <>
      <section>
        <dialog id="education_update_modal" className="modal">
          <div className="modal-box max-w-[1024px] p-5 rounded-xl">
            <div className="education_content_container">
              <div className="px-3 py-5">
                <h1 className="text-2xl lg:text-3xl font-bold font-[Montserrat] text-gray-800">
                  Update Education Info
                </h1>
              </div>

              <div className="p-5">
                <form className="space-y-8">
                  {/* School Section */}
                  <div>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b-2 border-[#3C8F63] pb-3 mb-4">
                      <h3 className="text-2xl font-semibold text-gray-700 mb-2 sm:mb-0">
                        School
                      </h3>

                      <div className="flex items-center">
                        <input
                          className="h-4 w-4 cursor-pointer rounded border-gray-300 text-green-600 focus:ring-green-500"
                          id="school-checkbox"
                          type="checkbox"
                        />
                        <label
                          className="ml-2 text-base font-medium text-gray-600"
                          htmlFor="school-checkbox"
                        >
                          I have attended school
                        </label>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <label
                          className="block text-lg font-medium text-gray-600 mb-1"
                          htmlFor="school-name"
                        >
                          School Name
                        </label>
                        <div className="flex rounded-md shadow-sm">
                          <span className="inline-flex items-center rounded-l-md border-2 border-r-0 border-gray-300 bg-[#F0FDF4] px-3 text-[#3C8F63]">
                            <FaSchool className="text-sm" />
                          </span>
                          <input
                            className="flex-1 min-w-0 block w-full px-3 py-2 outline-none rounded-none rounded-r-md border-2 border-gray-300 focus:border-[#3C8F63]"
                            id="school-name"
                            placeholder="Ex: Springfield High School"
                            type="text"
                          />
                        </div>
                      </div>

                      <div>
                        <label
                          className="block text-lg font-medium text-gray-600 mb-1"
                          htmlFor="school-group"
                        >
                          Group
                        </label>
                        <input
                          className="block w-full px-3 py-2 outline-none border-2 border-gray-300 rounded-md focus:border-[#3C8F63]"
                          id="school-group"
                          placeholder="Ex: Science"
                          type="text"
                        />
                      </div>

                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div>
                          <label
                            className="block text-lg font-medium text-gray-600 mb-1"
                            htmlFor="school-start"
                          >
                            Start Year
                          </label>
                          <input
                            className="block w-full px-3 py-2 outline-none border-2 border-gray-300 rounded-md focus:border-[#3C8F63]"
                            id="school-start"
                            placeholder="YYYY"
                            type="text"
                          />
                        </div>

                        <div>
                          <label
                            className="block text-lg font-medium text-gray-600 mb-1"
                            htmlFor="school-end"
                          >
                            End Year
                          </label>
                          <input
                            className="block w-full px-3 py-2 outline-none border-2 border-gray-300 rounded-md focus:border-[#3C8F63]"
                            id="school-end"
                            placeholder="YYYY"
                            type="text"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* College Section */}
                  <div>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b-2 border-[#3C8F63] pb-3 mb-4">
                      <h3 className="text-2xl font-semibold text-gray-700 mb-2 sm:mb-0">
                        College
                      </h3>
                      <div className="flex items-center">
                        <input
                          className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
                          id="college-checkbox"
                          type="checkbox"
                        />
                        <label
                          className="ml-2 text-base font-medium text-gray-600"
                          htmlFor="college-checkbox"
                        >
                          I have attended college
                        </label>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label
                          className="block text-lg font-medium text-gray-600 mb-1"
                          htmlFor="college-name"
                        >
                          Institute Name
                        </label>
                        <div className="flex rounded-md shadow-sm">
                          <span className="inline-flex items-center rounded-l-md border-2 border-r-0 border-gray-300 bg-[#F0FDF4] px-3 text-[#3C8F63]">
                            <FaSchool className="text-sm" />
                          </span>
                          <input
                            className="flex-1 min-w-0 block w-full px-3 py-2 outline-none rounded-none rounded-r-md border-2 border-gray-300 focus:border-[#3C8F63]"
                            id="college-name"
                            placeholder="Ex: Crestwood Community College"
                            type="text"
                          />
                        </div>
                      </div>

                      <div>
                        <label
                          className="block text-lg font-medium text-gray-600 mb-1"
                          htmlFor="college-dept"
                        >
                          Degree
                        </label>
                        <input
                          className="block w-full px-3 py-2 outline-none border-2 border-gray-300 rounded-md focus:border-[#3C8F63]"
                          id="college-dept"
                          placeholder="Ex: Associate of Arts"
                          type="text"
                        />
                      </div>

                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div>
                          <label
                            className="block text-lg font-medium text-gray-600 mb-1"
                            htmlFor="college-start"
                          >
                            Start Year/Month
                          </label>
                          <input
                            className="block w-full px-3 py-2 outline-none border-2 border-gray-300 rounded-md focus:border-[#3C8F63]"
                            id="college-start"
                            placeholder="YYYY/MM"
                            type="text"
                          />
                        </div>

                        <div>
                          <label
                            className="block text-lg font-medium text-gray-600 mb-1"
                            htmlFor="college-end"
                          >
                            End Year/Month
                          </label>
                          <input
                            className="block w-full px-3 py-2 outline-none border-2 border-gray-300 rounded-md focus:border-[#3C8F63]"
                            id="college-end"
                            placeholder="YYYY/MM"
                            type="text"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* University Section */}
                  <div>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b-2 border-[#3C8F63] pb-3 mb-4">
                      <h3 className="text-2xl font-semibold text-gray-700 mb-2 sm:mb-0">
                        University
                      </h3>
                      <div className="flex items-center">
                        <input
                          className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
                          id="university-checkbox"
                          type="checkbox"
                        />
                        <label
                          className="ml-2 text-base font-medium text-gray-600"
                          htmlFor="university-checkbox"
                        >
                          I have attended university
                        </label>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <label
                          className="block text-lg font-medium text-gray-600 mb-1"
                          htmlFor="uni-name"
                        >
                          Institute Name
                        </label>
                        <div className="flex rounded-md shadow-sm">
                          <span className="inline-flex items-center rounded-l-md border-2 border-r-0 border-gray-300 bg-[#F0FDF4] px-3 text-[#3C8F63]">
                            <FaSchool className="text-sm" />
                          </span>
                          <input
                            className="flex-1 min-w-0 block w-full px-3 py-2 outline-none rounded-none rounded-r-md border-2 border-gray-300 focus:border-[#3C8F63]"
                            id="uni-name"
                            placeholder="Ex: Stanford University"
                            type="text"
                          />
                        </div>
                      </div>
                      <div>
                        <label
                          className="block text-lg font-medium text-gray-600 mb-1"
                          htmlFor="uni-dept"
                        >
                          Department
                        </label>
                        <input
                          className="block w-full px-3 py-2 outline-none border-2 border-gray-300 rounded-md focus:border-[#3C8F63]"
                          id="uni-dept"
                          placeholder="Ex: Computer Science"
                          type="text"
                        />
                      </div>
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div>
                          <label
                            className="block text-lg font-medium text-gray-600 mb-1"
                            htmlFor="uni-start"
                          >
                            Start Year/Month
                          </label>
                          <input
                            className="block w-full px-3 py-2 outline-none border-2 border-gray-300 rounded-md focus:border-[#3C8F63]"
                            id="uni-start"
                            placeholder="YYYY/MM"
                            type="text"
                          />
                        </div>
                        <div>
                          <label
                            className="block text-lg font-medium text-gray-600 mb-1"
                            htmlFor="uni-end"
                          >
                            End Year/Month
                          </label>
                          <input
                            className="block w-full px-3 py-2 outline-none border-2 border-gray-300 rounded-md focus:border-[#3C8F63]"
                            id="uni-end"
                            placeholder="YYYY/MM"
                            type="text"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </form>

                {/* Tips Section - Moved to bottom */}
                <div className="alert bg-green-50 border-2 border-[#3C8F63] mt-8 p-5 rounded-lg">
                  <div className="flex items-start">
                    <FaLightbulb className="text-green-600 text-xl mt-1 mr-4" />
                    <div>
                      <div className="text-[#3C8F63] text-base">
                        <b>
                          <i>Tip:</i>
                        </b>{" "}
                        Provide accurate details about your educational
                        background. This helps potential employers and
                        connections understand your qualifications.
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end space-x-4 px-6 py-5 border-t border-gray-200 bg-gray-50 rounded-b-xl">
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

export default EducationModal;
