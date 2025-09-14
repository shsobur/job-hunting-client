import { useState, useEffect } from "react";
import { FaSchool, FaLightbulb } from "react-icons/fa";
import { FiLock, FiUnlock } from "react-icons/fi";
import useUserData from "../../../Hooks/userData";
import Swal from "sweetalert2";

const EducationModal = () => {
  const { profile, updateProfile } = useUserData();
  const [eduUpdateLoading, setEduUpdateLoading] = useState(false);

  // Extract education data from profile
  const schoolData = profile?.education?.find((edu) => edu.level === "School");
  const collegeData = profile?.education?.find(
    (edu) => edu.level === "College"
  );
  const universityData = profile?.education?.find(
    (edu) => edu.level === "University"
  );

  // Initialize lock states based on whether data exists
  const [schoolLock, setSchoolLock] = useState(!schoolData);
  const [collegeLock, setCollegeLock] = useState(!collegeData);
  const [universityLock, setUniversityLock] = useState(!universityData);

  // Track inputs with existing data pre-filled
  const [school, setSchool] = useState({
    name: schoolData?.institute || "",
    group: schoolData?.department || "",
    start: schoolData?.startYear || "",
    end: schoolData?.endYear || "",
  });

  const [college, setCollege] = useState({
    name: collegeData?.institute || "",
    degree: collegeData?.department || "",
    start: collegeData?.startYear || "",
    end: collegeData?.endYear || "",
  });

  const [university, setUni] = useState({
    name: universityData?.institute || "",
    dept: universityData?.department || "",
    start: universityData?.startYear || "",
    end: universityData?.endYear || "",
  });

  // Update form fields when profile data changes__
  useEffect(() => {
    if (schoolData) {
      setSchool({
        name: schoolData.institute || "",
        group: schoolData.department || "",
        start: schoolData.startYear || "",
        end: schoolData.endYear || "",
      });
      setSchoolLock(false);
    }

    if (collegeData) {
      setCollege({
        name: collegeData.institute || "",
        degree: collegeData.department || "",
        start: collegeData.startYear || "",
        end: collegeData.endYear || "",
      });
      setCollegeLock(false);
    }

    if (universityData) {
      setUni({
        name: universityData.institute || "",
        dept: universityData.department || "",
        start: universityData.startYear || "",
        end: universityData.endYear || "",
      });
      setUniversityLock(false);
    }
  }, [profile, schoolData, collegeData, universityData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const education = [];

    // School validation and data push__
    if (!schoolLock) {
      if (!school.name || !school.group || !school.start || !school.end) {
        Swal.fire({
          text: "Please fill all school fields",
          icon: "warning",
        });
        return;
      }
      education.push({
        institute: school.name,
        department: school.group,
        startYear: school.start,
        endYear: school.end,
        level: "School",
      });
    }

    // College validation and data push__
    if (!collegeLock) {
      if (!college.name || !college.degree || !college.start || !college.end) {
        Swal.fire({
          text: "Please fill all college fields",
          icon: "warning",
        });
        return;
      }
      education.push({
        institute: college.name,
        department: college.degree,
        startYear: college.start,
        endYear: college.end,
        level: "College",
      });
    }

    // University validation and data push__
    if (!universityLock) {
      if (
        !university.name ||
        !university.dept ||
        !university.start ||
        !university.end
      ) {
        Swal.fire({
          text: "Please fill all university fields",
          icon: "warning",
        });
        return;
      }
      education.push({
        institute: university.name,
        department: university.dept,
        startYear: university.start,
        endYear: university.end,
        level: "University",
      });
    }

    const finalData = { education };

    setEduUpdateLoading(true);
    updateProfile(finalData, {
      onSuccess: () => {
        document.getElementById("education_update_modal").close();
        Swal.fire({
          title: "Success",
          text: "Education information updated successfully",
          icon: "success",
        });
        setEduUpdateLoading(false);
      },
      onError: (err) => {
        console.log(err);
        document.getElementById("education_update_modal").close();
        Swal.fire({
          title: "Update Failed",
          text: "There might be some issue. Please try again!",
          icon: "error",
        });
        setEduUpdateLoading(false);
      },
    });
  };

  // Helper function to handle checkbox changes
  const handleLockChange = (setLock, lockState, sectionData) => {
    if (lockState && sectionData) {
      Swal.fire({
        title: "Keep existing data?",
        text: "You already have data for this section. Do you want to keep it?",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3C8F63",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, keep it",
        cancelButtonText: "No, start fresh",
      }).then((result) => {
        if (result.isConfirmed) {
          setLock(false);
        } else {
          // Clear the data__
          if (setLock === setSchoolLock) {
            setSchool({ name: "", group: "", start: "", end: "" });
          } else if (setLock === setCollegeLock) {
            setCollege({ name: "", degree: "", start: "", end: "" });
          } else if (setLock === setUniversityLock) {
            setUni({ name: "", dept: "", start: "", end: "" });
          }
          setLock(false);
        }
      });
    } else {
      setLock(!lockState);
    }
  };

  return (
    <>
      <section>
        <dialog id="education_update_modal" className="modal">
          <div className="modal-box max-w-[1024px] p-5 rounded-md">
            <div className="education_content_container">
              <div className="px-3 py-5">
                <h1 className="text-2xl lg:text-3xl font-bold font-[Montserrat] text-gray-800">
                  Update Education Info
                </h1>
              </div>

              <div className="p-5">
                <form className="space-y-8" onSubmit={handleSubmit}>
                  {/* School Section */}
                  <div>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b-2 border-[#3C8F63] pb-3 mb-4">
                      <h3 className="flex items-center gap-2 text-2xl font-semibold text-gray-700 mb-2 sm:mb-0">
                        School
                        {schoolLock ? (
                          <FiLock color="red" size={20} />
                        ) : (
                          <FiUnlock color="green" size={20} />
                        )}
                      </h3>

                      <div className="flex items-center">
                        <input
                          checked={!schoolLock}
                          onChange={() =>
                            handleLockChange(
                              setSchoolLock,
                              schoolLock,
                              schoolData
                            )
                          }
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
                            disabled={schoolLock}
                            value={school.name}
                            onChange={(e) =>
                              setSchool({ ...school, name: e.target.value })
                            }
                            className="flex-1 min-w-0 block w-full px-3 py-2 outline-none rounded-none rounded-r-md border-2 border-gray-300 focus:border-[#3C8F63]"
                            id="school-name"
                            placeholder="Ex: Springfield High School"
                            type="text"
                            required={!schoolLock}
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
                          disabled={schoolLock}
                          value={school.group}
                          onChange={(e) =>
                            setSchool({ ...school, group: e.target.value })
                          }
                          className="block w-full px-3 py-2 outline-none border-2 border-gray-300 rounded-md focus:border-[#3C8F63]"
                          id="school-group"
                          placeholder="Ex: Science"
                          type="text"
                          required={!schoolLock}
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
                            disabled={schoolLock}
                            value={school.start}
                            onChange={(e) =>
                              setSchool({ ...school, start: e.target.value })
                            }
                            className="block w-full px-3 py-2 outline-none border-2 border-gray-300 rounded-md focus:border-[#3C8F63]"
                            id="school-start"
                            placeholder="YYYY"
                            type="text"
                            required={!schoolLock}
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
                            disabled={schoolLock}
                            value={school.end}
                            onChange={(e) =>
                              setSchool({ ...school, end: e.target.value })
                            }
                            className="block w-full px-3 py-2 outline-none border-2 border-gray-300 rounded-md focus:border-[#3C8F63]"
                            id="school-end"
                            placeholder="YYYY"
                            type="text"
                            required={!schoolLock}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* College Section */}
                  <div>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b-2 border-[#3C8F63] pb-3 mb-4">
                      <h3 className="flex items-center gap-2 text-2xl font-semibold text-gray-700 mb-2 sm:mb-0">
                        College
                        {collegeLock ? (
                          <FiLock color="red" size={20} />
                        ) : (
                          <FiUnlock color="green" size={20} />
                        )}
                      </h3>
                      <div className="flex items-center">
                        <input
                          checked={!collegeLock}
                          onChange={() =>
                            handleLockChange(
                              setCollegeLock,
                              collegeLock,
                              collegeData
                            )
                          }
                          className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500 cursor-pointer"
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
                            disabled={collegeLock}
                            value={college.name}
                            onChange={(e) =>
                              setCollege({ ...college, name: e.target.value })
                            }
                            className="flex-1 min-w-0 block w-full px-3 py-2 outline-none rounded-none rounded-r-md border-2 border-gray-300 focus:border-[#3C8F63]"
                            id="college-name"
                            placeholder="Ex: Crestwood Community College"
                            type="text"
                            required={!collegeLock}
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
                          disabled={collegeLock}
                          value={college.degree}
                          onChange={(e) =>
                            setCollege({ ...college, degree: e.target.value })
                          }
                          className="block w-full px-3 py-2 outline-none border-2 border-gray-300 rounded-md focus:border-[#3C8F63]"
                          id="college-dept"
                          placeholder="Ex: Associate of Arts"
                          type="text"
                          required={!collegeLock}
                        />
                      </div>

                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div>
                          <label
                            className="block text-lg font-medium text-gray-600 mb-1"
                            htmlFor="college-start"
                          >
                            Start Year
                          </label>
                          <input
                            disabled={collegeLock}
                            value={college.start}
                            onChange={(e) =>
                              setCollege({ ...college, start: e.target.value })
                            }
                            className="block w-full px-3 py-2 outline-none border-2 border-gray-300 rounded-md focus:border-[#3C8F63]"
                            id="college-start"
                            placeholder="YYYY"
                            type="text"
                            required={!collegeLock}
                          />
                        </div>

                        <div>
                          <label
                            className="block text-lg font-medium text-gray-600 mb-1"
                            htmlFor="college-end"
                          >
                            End Year
                          </label>
                          <input
                            disabled={collegeLock}
                            value={college.end}
                            onChange={(e) =>
                              setCollege({ ...college, end: e.target.value })
                            }
                            className="block w-full px-3 py-2 outline-none border-2 border-gray-300 rounded-md focus:border-[#3C8F63]"
                            id="college-end"
                            placeholder="YYYY"
                            type="text"
                            required={!collegeLock}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* University Section */}
                  <div>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b-2 border-[#3C8F63] pb-3 mb-4">
                      <h3 className="flex items-center gap-2 text-2xl font-semibold text-gray-700 mb-2 sm:mb-0">
                        University
                        {universityLock ? (
                          <FiLock color="red" size={20} />
                        ) : (
                          <FiUnlock color="green" size={20} />
                        )}
                      </h3>
                      <div className="flex items-center">
                        <input
                          checked={!universityLock}
                          onChange={() =>
                            handleLockChange(
                              setUniversityLock,
                              universityLock,
                              universityData
                            )
                          }
                          className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500 cursor-pointer"
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
                            disabled={universityLock}
                            value={university.name}
                            onChange={(e) =>
                              setUni({ ...university, name: e.target.value })
                            }
                            className="flex-1 min-w-0 block w-full px-3 py-2 outline-none rounded-none rounded-r-md border-2 border-gray-300 focus:border-[#3C8F63]"
                            id="uni-name"
                            placeholder="Ex: Stanford University"
                            type="text"
                            required={!universityLock}
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
                          disabled={universityLock}
                          value={university.dept}
                          onChange={(e) =>
                            setUni({ ...university, dept: e.target.value })
                          }
                          className="block w-full px-3 py-2 outline-none border-2 border-gray-300 rounded-md focus:border-[#3C8F63]"
                          id="uni-dept"
                          placeholder="Ex: Computer Science"
                          type="text"
                          required={!universityLock}
                        />
                      </div>
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div>
                          <label
                            className="block text-lg font-medium text-gray-600 mb-1"
                            htmlFor="uni-start"
                          >
                            Start Year
                          </label>
                          <input
                            disabled={universityLock}
                            value={university.start}
                            onChange={(e) =>
                              setUni({ ...university, start: e.target.value })
                            }
                            className="block w-full px-3 py-2 outline-none border-2 border-gray-300 rounded-md focus:border-[#3C8F63]"
                            id="uni-start"
                            placeholder="YYYY"
                            type="text"
                            required={!universityLock}
                          />
                        </div>
                        <div>
                          <label
                            className="block text-lg font-medium text-gray-600 mb-1"
                            htmlFor="uni-end"
                          >
                            End Year
                          </label>
                          <input
                            disabled={universityLock}
                            value={university.end}
                            onChange={(e) =>
                              setUni({ ...university, end: e.target.value })
                            }
                            className="block w-full px-3 py-2 outline-none border-2 border-gray-300 rounded-md focus:border-[#3C8F63]"
                            id="uni-end"
                            placeholder="YYYY"
                            type="text"
                            required={!universityLock}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Tips Section */}
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

                  {/* Action Buttons */}
                  <div className="flex justify-end space-x-4 px-6 py-5 rounded-b-xl">
                    <button
                      type="button"
                      disabled={eduUpdateLoading}
                      onClick={() =>
                        document
                          .getElementById("education_update_modal")
                          .close()
                      }
                      className="btn btn-outline px-8 py-3 text-lg border-2 border-gray-300 hover:bg-gray-100 hover:border-gray-400"
                    >
                      Cancel
                    </button>

                    <button
                      disabled={eduUpdateLoading}
                      type="submit"
                      className="btn bg-[#3C8F63] border-[#3C8F63] hover:bg-[#337954] hover:border-green-700 px-8 py-3 text-lg text-white"
                    >
                      {eduUpdateLoading ? "Working...." : "Save Changes"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </dialog>
      </section>
    </>
  );
};

export default EducationModal;