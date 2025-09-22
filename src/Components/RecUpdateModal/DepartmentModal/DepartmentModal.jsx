import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import useUserData from "../../../Hooks/userData";

const DepartmentModal = () => {
  const { profile, updateProfile } = useUserData();
  const [selectedDepartments, setSelectedDepartments] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [dpUpdateLoading, setDpUpdateLoading] = useState(false);

  // Sorted departments A-Z
  const departments = [
    "Administration",
    "Business Development",
    "Content / Editorial",
    "Customer Support / Service",
    "Data & Analytics",
    "Design / Creative",
    "Digital Strategy / Innovation",
    "Engineering / Development",
    "Facilities / Maintenance",
    "Finance / Accounting",
    "Human Resources (HR)",
    "IT / Information Technology",
    "Legal / Compliance",
    "Marketing",
    "Media & Communications",
    "Operations",
    "Procurement / Purchasing",
    "Product Management",
    "Production / Manufacturing",
    "Project Management",
    "Public Relations (PR)",
    "Quality Assurance (QA)",
    "Research & Development (R&D)",
    "Sales",
    "Security / Risk Management",
    "Social Media / Community Management",
    "Supply Chain / Logistics",
    "Training / Learning & Development",
    "UX / UI Design",
  ].sort();

  useEffect(() => {
    setSelectedDepartments(profile?.departments);
  }, [profile]);

  const filteredDepartments = departments.filter((dept) =>
    dept.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddDepartment = (department) => {
    if (!selectedDepartments.includes(department)) {
      setSelectedDepartments([...selectedDepartments, department]);
    }
    setSearchTerm("");
    setIsDropdownOpen(false);
  };

  const handleRemoveDepartment = (departmentToRemove) => {
    setSelectedDepartments(
      selectedDepartments.filter((dept) => dept !== departmentToRemove)
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const department = {
      departments: selectedDepartments,
    };

    setDpUpdateLoading(true);
    updateProfile(department, {
      onSuccess: () => {
        document.getElementById("rec_department_update_modal").close();

        Swal.fire({
          title: "Success!",
          text: "Department updated successfully.",
          icon: "success",
        });

        setDpUpdateLoading(false);
      },

      onError: () => {
        document.getElementById("rec_department_update_modal").close();

        Swal.fire({
          title: "Oops!",
          text: "Something went wrong while updating.",
          icon: "error",
        });

        setDpUpdateLoading(false);
      },
    });
  };

  return (
    <>
      <section>
        <dialog id="rec_department_update_modal" className="modal">
          <div className="modal-box max-w-[1024px]">
            <form method="dialog" className="mb-5">
              <button className="btn btn-sm btn-circle btn-ghost border border-gray-400 absolute right-2 top-2">
                <span className="text-2xl font-semibold text-gray-700">×</span>
              </button>
            </form>

            <div className="contact_update_main_content_container">
              <h1 className="modal_title font-semibold font-[Montserrat] text-3xl">
                Edit Department Info
              </h1>
            </div>

            <div className="mt-6">
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="h-[40vh]">
                  <label className="block text-xl font-medium mb-2">
                    Departments
                  </label>

                  {/* Department selection interface */}
                  <div className="relative">
                    <div className="flex items-center border-2 border-gray-300 rounded-md p-2 focus-within:ring-2 focus-within:ring-[#3C8F63] focus-within:border-transparent">
                      <input
                        disabled={dpUpdateLoading}
                        type="text"
                        placeholder="Search departments..."
                        className="flex-grow p-2 focus:outline-none"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onFocus={() => setIsDropdownOpen(true)}
                      />
                      <button
                        type="button"
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="p-2 text-gray-500 hover:text-gray-700"
                      >
                        {isDropdownOpen ? "▲" : "▼"}
                      </button>
                    </div>

                    {/* Dropdown menu */}
                    {isDropdownOpen && (
                      <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
                        {filteredDepartments.length > 0 ? (
                          filteredDepartments.map((department) => (
                            <div
                              key={department}
                              className="p-3 hover:bg-gray-100 cursor-pointer"
                              onClick={() => handleAddDepartment(department)}
                            >
                              {department}
                            </div>
                          ))
                        ) : (
                          <div className="p-3 text-gray-500">
                            No departments found
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Selected departments */}
                  <div className="mt-4">
                    {selectedDepartments?.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {selectedDepartments.map((department) => (
                          <div
                            key={department}
                            className="bg-[#3C8F63] text-white px-3 py-1 rounded-full flex items-center"
                          >
                            {department}
                            <button
                              type="button"
                              onClick={() => handleRemoveDepartment(department)}
                              className="ml-2 text-white hover:text-gray-200"
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500 mt-2">
                        No departments selected yet
                      </p>
                    )}
                  </div>
                </div>

                {/* Action buttons */}
                <div className="modal-action mt-8 flex justify-end space-x-3">
                  <form method="dialog">
                    <button
                      disabled={dpUpdateLoading}
                      className="btn btn-outline px-8 py-3 text-lg border-2 border-gray-300 hover:bg-gray-100 hover:border-gray-400"
                    >
                      Cancel
                    </button>
                  </form>
                  <button
                    type="submit"
                    disabled={dpUpdateLoading}
                    className="btn bg-[#3C8F63] border-[#3C8F63] hover:bg-[#337954] hover:border-green-700 px-8 py-3 text-lg text-white"
                  >
                    {dpUpdateLoading ? "Working..." : "Save Changes"}
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

export default DepartmentModal;
