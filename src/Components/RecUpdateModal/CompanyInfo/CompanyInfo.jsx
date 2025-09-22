import { useState, useEffect } from "react";
import useUserData from "../../../Hooks/userData";
import Swal from "sweetalert2";

const CompanyDetailsModal = () => {
  const { profile, updateProfile } = useUserData();
  const [companyData, setCompanyData] = useState({
    companyWebsite: "",
    industry: "",
    companySize: {
      currentEmployees: "",
      sizeRange: "",
    },
    foundedYear: "",
    headquarters: {
      country: "",
      city: "",
      area: "",
    },
    branchLocations: [{ country: "", city: "", area: "" }],
  });

  const [haveBranch, setHaveBranch] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Initialize form data with profile data when component mounts or profile changes
  useEffect(() => {
    if (profile) {
      setCompanyData({
        companyWebsite: profile.companyWebsite || "",
        industry: profile.industry || "",
        companySize: profile.companySize || {
          currentEmployees: "",
          sizeRange: "",
        },
        foundedYear: profile.foundedYear || "",
        headquarters: profile.headquarters || {
          country: "",
          city: "",
          area: "",
        },
        branchLocations:
          profile.branchLocations && profile.branchLocations.length > 0
            ? profile.branchLocations
            : [{ country: "", city: "", area: "" }],
      });
    }
  }, [profile]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCompanyData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCompanySizeChange = (e) => {
    const { name, value } = e.target;
    setCompanyData((prev) => ({
      ...prev,
      companySize: {
        ...prev.companySize,
        [name]: value,
      },
    }));
  };

  const handleHeadquartersChange = (e) => {
    const { name, value } = e.target;
    setCompanyData((prev) => ({
      ...prev,
      headquarters: {
        ...prev.headquarters,
        [name]: value,
      },
    }));
  };

  const handleBranchChange = (index, e) => {
    const { name, value } = e.target;
    const updatedBranches = [...companyData.branchLocations];
    updatedBranches[index] = {
      ...updatedBranches[index],
      [name]: value,
    };
    setCompanyData((prev) => ({
      ...prev,
      branchLocations: updatedBranches,
    }));
  };

  const addBranch = () => {
    setCompanyData((prev) => ({
      ...prev,
      branchLocations: [
        ...prev.branchLocations,
        { country: "", city: "", area: "" },
      ],
    }));
  };

  const removeBranch = (index) => {
    if (companyData.branchLocations.length > 1) {
      const updatedBranches = [...companyData.branchLocations];
      updatedBranches.splice(index, 1);
      setCompanyData((prev) => ({
        ...prev,
        branchLocations: updatedBranches,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Prepare data for submission - exactly matches your structure
      const submissionData = {
        companyWebsite: companyData.companyWebsite,
        industry: companyData.industry,
        companySize: {
          currentEmployees: companyData.companySize.currentEmployees,
          sizeRange: companyData.companySize.sizeRange,
        },
        foundedYear: companyData.foundedYear,
        headquarters: {
          country: companyData.headquarters.country,
          city: companyData.headquarters.city,
          area: companyData.headquarters.area,
        },
        branchLocations: companyData.branchLocations.filter(
          (branch) => branch.country && branch.city
        ),
      };

      // Handle form submission here
      console.log("Submitting company data:", submissionData);

      updateProfile(submissionData, {
        onSuccess: () => {
          Swal.fire({
            title: "Success!",
            text: "Company info updated successfully.",
            icon: "success",
          });
        },
        onError: () => {
          Swal.fire({
            title: "Oops!",
            text: "Something went wrong while updating.",
            icon: "error",
          });
        },
      });

      // document.getElementById('res_company_details_modal').close();
    } catch (error) {
      console.error("Error updating company details:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Get current year for founded year validation
  const currentYear = new Date().getFullYear();

  return (
    <>
      <section>
        <dialog id="res_company_details_modal" className="modal">
          <div className="modal-box max-w-[1024px] max-h-[90vh] overflow-y-auto">
            <form method="dialog" className="mb-5">
              <button
                type="button"
                className="btn btn-sm btn-circle btn-ghost border border-gray-400 absolute right-2 top-2"
                onClick={() =>
                  document.getElementById("res_company_details_modal").close()
                }
              >
                <span className="text-2xl font-semibold text-gray-700">×</span>
              </button>
            </form>

            <div className="contact_update_main_content_container">
              <h1 className="modal_title font-semibold font-[Montserrat] text-3xl">
                {profile?.companyWebsite
                  ? "Update Company Details"
                  : "Add Company Details"}
              </h1>
            </div>

            <div className="mt-6">
              <form className="space-y-6" onSubmit={handleSubmit}>
                {/* Website */}
                <div>
                  <label
                    className="block text-xl font-medium mb-2"
                    htmlFor="companyWebsite"
                  >
                    Website
                  </label>
                  <input
                    disabled={isLoading}
                    type="url"
                    className="w-full p-3 md:p-4 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3C8F63] focus:border-transparent"
                    id="companyWebsite"
                    name="companyWebsite"
                    value={companyData.companyWebsite}
                    onChange={handleChange}
                    placeholder="https://www.example.com"
                    required
                  />
                </div>

                {/* Industry */}
                <div>
                  <label
                    className="block text-xl font-medium mb-2"
                    htmlFor="industry"
                  >
                    Industry
                  </label>
                  <input
                    disabled={isLoading}
                    type="text"
                    className="w-full p-3 md:p-4 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3C8F63] focus:border-transparent"
                    id="industry"
                    name="industry"
                    value={companyData.industry}
                    onChange={handleChange}
                    placeholder="e.g. Technology, Healthcare, Finance"
                    required
                  />
                </div>

                {/* Company Size */}
                <div>
                  <label className="block text-xl font-medium mb-2">
                    Company Size
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Current Employees */}
                    <div>
                      <label
                        className="block text-sm font-medium mb-1 text-gray-600"
                        htmlFor="currentEmployees"
                      >
                        Current Employees
                      </label>
                      <input
                        disabled={isLoading}
                        type="number"
                        min="0"
                        max="1000000"
                        className="w-full p-3 md:p-4 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3C8F63] focus:border-transparent"
                        id="currentEmployees"
                        name="currentEmployees"
                        value={companyData.companySize.currentEmployees}
                        onChange={handleCompanySizeChange}
                        placeholder="e.g. 250"
                      />
                    </div>

                    {/* Size Range */}
                    <div>
                      <label
                        className="block text-sm font-medium mb-1 text-gray-600"
                        htmlFor="sizeRange"
                      >
                        Size Range
                      </label>
                      <input
                        disabled={isLoading}
                        type="text"
                        className="w-full p-3 md:p-4 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3C8F63] focus:border-transparent"
                        id="sizeRange"
                        name="sizeRange"
                        value={companyData.companySize.sizeRange}
                        onChange={handleCompanySizeChange}
                        placeholder="e.g. 201-500 employees"
                      />
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    Enter the current number of employees and the typical size
                    range
                  </p>
                </div>

                {/* Founded Year */}
                <div>
                  <label
                    className="block text-xl font-medium mb-2"
                    htmlFor="foundedYear"
                  >
                    Founded Year
                  </label>
                  <input
                    disabled={isLoading}
                    type="number"
                    min="1800"
                    max={currentYear}
                    className="w-full p-3 md:p-4 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3C8F63] focus:border-transparent"
                    id="foundedYear"
                    name="foundedYear"
                    value={companyData.foundedYear}
                    onChange={handleChange}
                    placeholder="Enter founding year (e.g. 1999)"
                    required
                  />
                </div>

                {/* Headquarters */}
                <div>
                  <label className="block text-xl font-medium mb-2">
                    Headquarters <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
                    {/* Country */}
                    <div>
                      <label
                        className="block text-sm font-medium mb-1 text-gray-600"
                        htmlFor="headquartersCountry"
                      >
                        Country <span className="text-red-500">*</span>
                      </label>
                      <input
                        disabled={isLoading}
                        type="text"
                        className="w-full p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3C8F63] focus:border-transparent"
                        id="headquartersCountry"
                        name="country"
                        value={companyData.headquarters.country}
                        onChange={handleHeadquartersChange}
                        placeholder="Country name"
                        required
                      />
                    </div>

                    {/* City */}
                    <div>
                      <label
                        className="block text-sm font-medium mb-1 text-gray-600"
                        htmlFor="headquartersCity"
                      >
                        City <span className="text-red-500">*</span>
                      </label>
                      <input
                        disabled={isLoading}
                        type="text"
                        className="w-full p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3C8F63] focus:border-transparent"
                        id="headquartersCity"
                        name="city"
                        value={companyData.headquarters.city}
                        onChange={handleHeadquartersChange}
                        placeholder="City name"
                        required
                      />
                    </div>

                    {/* Area Name */}
                    <div>
                      <label
                        className="block text-sm font-medium mb-1 text-gray-600"
                        htmlFor="headquartersArea"
                      >
                        Area Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        disabled={isLoading}
                        type="text"
                        className="w-full p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3C8F63] focus:border-transparent"
                        id="headquartersArea"
                        name="area"
                        value={companyData.headquarters.area}
                        onChange={handleHeadquartersChange}
                        placeholder="Area name"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Branch Locations */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-xl font-medium">
                      Branch Locations
                    </label>
                    <div>
                      <input
                        onClick={() => setHaveBranch(!haveBranch)}
                        type="checkbox"
                        name="branch"
                      />{" "}
                      We have branch
                    </div>
                  </div>

                  {companyData.branchLocations.map((branch, index) => (
                    <div
                      key={index}
                      className="mb-4 p-4 border border-gray-200 rounded-md relative"
                    >
                      {companyData.branchLocations.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeBranch(index)}
                          disabled={isLoading}
                          className="absolute top-2 right-2 text-red-500 hover:text-red-700 text-xl font-bold"
                        >
                          ×
                        </button>
                      )}

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 mt-2">
                        {/* Country */}
                        <div>
                          <label className="block text-sm font-medium mb-1 text-gray-600">
                            Country <span className="text-red-500">*</span>
                          </label>
                          <input
                            disabled={isLoading || !haveBranch}
                            type="text"
                            className="w-full p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3C8F63] focus:border-transparent"
                            value={branch.country}
                            onChange={(e) => handleBranchChange(index, e)}
                            placeholder="Country name"
                            name="country"
                            required={haveBranch}
                          />
                        </div>

                        {/* City */}
                        <div>
                          <label className="block text-sm font-medium mb-1 text-gray-600">
                            City <span className="text-red-500">*</span>
                          </label>
                          <input
                            disabled={isLoading || !haveBranch}
                            type="text"
                            className="w-full p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3C8F63] focus:border-transparent"
                            value={branch.city}
                            onChange={(e) => handleBranchChange(index, e)}
                            placeholder="City name"
                            name="city"
                            required={haveBranch}
                          />
                        </div>

                        {/* Area Name - Optional */}
                        <div>
                          <label className="block text-sm font-medium mb-1 text-gray-600">
                            Area Name (Optional)
                          </label>
                          <input
                            disabled={isLoading || !haveBranch}
                            type="text"
                            className="w-full p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3C8F63] focus:border-transparent"
                            value={branch.area}
                            onChange={(e) => handleBranchChange(index, e)}
                            placeholder="Area name"
                            name="area"
                          />
                        </div>
                      </div>
                    </div>
                  ))}

                  <div className="flex items-center justify-between">
                    <span></span>
                    <button
                      type="button"
                      onClick={addBranch}
                      disabled={isLoading}
                      className="btn bg-[#3C8F63] border-[#3C8F63] hover:bg-[#337954] hover:border-green-700 px-4 py-2 text-white text-sm"
                    >
                      + Add Branch
                    </button>
                  </div>
                </div>

                {/* Action buttons */}
                <div className="modal-action mt-8 flex flex-col-reverse sm:flex-row justify-end gap-3">
                  <button
                    type="button"
                    disabled={isLoading}
                    className="btn btn-outline w-full sm:w-auto px-4 sm:px-8 py-3 text-lg border-2 border-gray-300 hover:bg-gray-100 hover:border-gray-400"
                    onClick={() =>
                      document
                        .getElementById("res_company_details_modal")
                        .close()
                    }
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="btn bg-[#3C8F63] border-[#3C8F63] hover:bg-[#337954] hover:border-green-700 w-full sm:w-auto px-4 sm:px-8 py-3 text-lg text-white"
                  >
                    {isLoading ? "Working..." : "Save Change"}
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

export default CompanyDetailsModal;
