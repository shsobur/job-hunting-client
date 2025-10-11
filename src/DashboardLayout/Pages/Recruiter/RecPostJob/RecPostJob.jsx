import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  FiBriefcase,
  FiDollarSign,
  FiCalendar,
  FiUser,
  FiPlus,
  FiX,
  FiTag,
} from "react-icons/fi";
import useUserData from "../../../../Hooks/userData";

const RecPostJob = () => {
  const { profile } = useUserData();
  const [currentStep, setCurrentStep] = useState(1);

  // All dynamic fields in one state
  const [dynamicFields, setDynamicFields] = useState({
    responsibilities: [""],
    requirementSkills: [""],
    niceToHave: [""],
    benefits: [""],
    tags: [""],
    whoCanApply: [""],
  });

  const [enableWhoCanApply, setEnableWhoCanApply] = useState(false);

  // React Hook Form
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    trigger,
  } = useForm({
    defaultValues: {
      jobTitle: "",
      jobType: "Full-time",
      workplaceType: "On-site",
      country: "",
      city: "",
      area: "",
      department: "",
      position: "",
      experienceLevel: "Mid",
      salaryRange: {
        min: "",
        max: "",
        currency: "BDT",
        period: "year",
      },
      applicationDeadline: "",
      openPositions: 1,
      jobDescription: "",
    },
  });

  const formValues = watch();

  // Dynamic field functions__
  const addDynamicField = (fieldName) => {
    setDynamicFields((prev) => ({
      ...prev,
      [fieldName]: [...prev[fieldName], ""],
    }));
  };

  const removeDynamicField = (fieldName, index) => {
    if (dynamicFields[fieldName].length > 1) {
      setDynamicFields((prev) => ({
        ...prev,
        [fieldName]: prev[fieldName].filter((_, i) => i !== index),
      }));
    }
  };

  const updateDynamicField = (fieldName, index, value) => {
    const updatedFields = [...dynamicFields[fieldName]];
    updatedFields[index] = value;
    setDynamicFields((prev) => ({
      ...prev,
      [fieldName]: updatedFields,
    }));
  };

  // Simple step validation__
  const validateStep = async (nextStep) => {
    let fieldsToValidate = [];

    // Step 1 validation fields__
    if (currentStep === 1) {
      fieldsToValidate = [
        "jobTitle",
        "jobType",
        "workplaceType",
        "country",
        "city",
        "area",
        "department",
        "position",
      ];
    }
    // Step 2 validation fields
    else if (currentStep === 2) {
      fieldsToValidate = ["experienceLevel", "position"];
    }
    // Step 3 validation fields
    else if (currentStep === 3) {
      fieldsToValidate = ["jobDescription"];
    }

    // Trigger validation for the current step fields
    const isValid = await trigger(fieldsToValidate);

    // If valid, move to next step
    if (isValid) {
      setCurrentStep(nextStep);
    }
  };

  // Form submission__
  const onSubmit = (data) => {
    // Filter out empty strings from dynamic fields
    const filteredDynamicFields = {};
    Object.keys(dynamicFields).forEach((key) => {
      filteredDynamicFields[key] = dynamicFields[key].filter(
        (item) => item.trim() !== ""
      );
    });

    // Complete job data object__
    const completeJobData = {
      ...data,
      ...filteredDynamicFields,
      // Remove whoCanApply if checkbox is not enabled__
      whoCanApply: enableWhoCanApply ? filteredDynamicFields.whoCanApply : [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isActive: true,
      isExpired: false,
      totalApply: 0,
    };

    console.log("Complete Job Data for Backend:", completeJobData);
  };

  const renderDynamicFields = (fieldName, title, placeholder) => (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700 mb-3">
        {title}
      </label>
      <div className="space-y-3">
        {dynamicFields[fieldName].map((item, index) => (
          <div key={index} className="flex gap-3">
            <div className="flex-1">
              <input
                type="text"
                placeholder={`${placeholder} ${index + 1}`}
                value={item}
                onChange={(e) =>
                  updateDynamicField(fieldName, index, e.target.value)
                }
                className="w-full pl-4 pr-4 py-3 border-2 border-gray-200 rounded-xl outline-none focus:border-[#3C8F63] transition-all duration-200 bg-gray-50"
              />
            </div>
            {dynamicFields[fieldName].length > 1 && (
              <button
                type="button"
                onClick={() => removeDynamicField(fieldName, index)}
                className="px-4 py-3 border-2 border-red-200 text-red-600 rounded-xl hover:bg-red-50 transition-all duration-200"
              >
                <FiX size={18} />
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={() => addDynamicField(fieldName)}
          className="flex items-center gap-2 px-4 py-3 border-2 border-dashed border-gray-300 text-gray-600 rounded-xl hover:border-[#3C8F63] hover:text-[#3C8F63] transition-all duration-200"
        >
          <FiPlus size={18} />
          Add {title}
        </button>
      </div>
    </div>
  );

  return (
    <div className="py-2 px-2">
      <div className="w-full mx-auto">
        {/* Header Section */}
        <div className="text-center mb-5">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-[#3C8F63] rounded-2xl shadow-lg mb-4">
            <FiBriefcase className="text-white text-2xl" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Post a New Job
          </h1>
          <p className="text-gray-600">
            Fill in the details below to find the perfect candidate
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex justify-center mb-5">
          <div className="flex items-center space-x-4">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                    step === currentStep
                      ? "bg-[#3C8F63] border-[#3C8F63] text-white shadow-lg shadow-[#3C8F63]/30"
                      : step < currentStep
                      ? "bg-[#3C8F63] border-[#3C8F63] text-white"
                      : "border-gray-300 text-gray-400 bg-white"
                  }`}
                >
                  {step}
                </div>
                {step < 4 && (
                  <div
                    className={`w-8 h-1 mx-2 transition-all duration-300 ${
                      step < currentStep ? "bg-[#3C8F63]" : "bg-gray-300"
                    }`}
                  ></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form Container */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="bg-white rounded-2xl shadow-xl border border-[#3c8f6320] overflow-hidden w-full">
            {/* Step 1: Basic Information */}
            {currentStep === 1 && (
              <div className="p-5">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-[#3C8F63]/10 rounded-xl flex items-center justify-center">
                    <FiBriefcase className="text-[#3C8F63] text-lg" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800">
                    Job Basics
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Job Title */}
                  <div className="md:col-span-2">
                    <label className="block text-xl font-medium text-gray-700 mb-2">
                      Job Title *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Senior Frontend Developer"
                      className={`w-full pl-4 pr-4 py-3 border-2 rounded-xl outline-none transition-all duration-200 bg-gray-50 ${
                        errors.jobTitle
                          ? "border-red-300"
                          : "border-gray-200 focus:border-[#3C8F63]"
                      }`}
                      {...register("jobTitle", {
                        required: "Job title is required",
                        minLength: {
                          value: 3,
                          message: "Job title must be at least 3 characters",
                        },
                      })}
                    />
                    {errors.jobTitle && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.jobTitle.message}
                      </p>
                    )}
                  </div>

                  {/* Job Type */}
                  <div>
                    <label className="block text-xl font-medium text-gray-700 mb-2">
                      Job Type *
                    </label>
                    <select
                      className="w-full pl-4 pr-4 py-3 border-2 border-gray-200 rounded-xl outline-none focus:border-[#3C8F63] transition-all duration-200 bg-gray-50"
                      {...register("jobType", {
                        required: "Job type is required",
                      })}
                    >
                      <option value="Full-time">Full-time</option>
                      <option value="Part-time">Part-time</option>
                      <option value="Contract">Contract</option>
                      <option value="Internship">Internship</option>
                    </select>
                  </div>

                  {/* Workplace Type */}
                  <div>
                    <label className="block text-xl font-medium text-gray-700 mb-2">
                      Workplace Type *
                    </label>
                    <select
                      className="w-full pl-4 pr-4 py-3 border-2 border-gray-200 rounded-xl outline-none focus:border-[#3C8F63] transition-all duration-200 bg-gray-50"
                      {...register("workplaceType", {
                        required: "Workplace type is required",
                      })}
                    >
                      <option value="On-site">On-site</option>
                      <option value="Remote">Remote</option>
                      <option value="Hybrid">Hybrid</option>
                    </select>
                  </div>

                  {/* Location - Three Parts */}
                  <div className="md:col-span-2">
                    <label className="block text-xl font-medium text-gray-700 mb-2">
                      Location *
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="Country"
                          className={`w-full pl-4 pr-4 py-3 border-2 rounded-xl outline-none transition-all duration-200 bg-gray-50 ${
                            errors.country
                              ? "border-red-300"
                              : "border-gray-200 focus:border-[#3C8F63]"
                          }`}
                          {...register("country", {
                            required: "Country is required",
                          })}
                        />
                        {errors.country && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.country.message}
                          </p>
                        )}
                      </div>
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="City"
                          className={`w-full pl-4 pr-4 py-3 border-2 rounded-xl outline-none transition-all duration-200 bg-gray-50 ${
                            errors.city
                              ? "border-red-300"
                              : "border-gray-200 focus:border-[#3C8F63]"
                          }`}
                          {...register("city", {
                            required: "City is required",
                          })}
                        />
                        {errors.city && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.city.message}
                          </p>
                        )}
                      </div>
                      <div>
                        <input
                          type="text"
                          name="area"
                          placeholder="Area"
                          className={`w-full pl-4 pr-4 py-3 border-2 rounded-xl outline-none transition-all duration-200 bg-gray-50 ${
                            errors.area
                              ? "border-red-300"
                              : "border-gray-200 focus:border-[#3C8F63]"
                          }`}
                          {...register("area", {
                            required: "Area is required",
                          })}
                        />
                        {errors.area && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.area.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Department */}
                  <div>
                    <label className="block text-xl font-medium text-gray-700 mb-2">
                      Department *
                    </label>
                    <select
                      className={`w-full pl-4 pr-4 py-3 border-2 rounded-xl outline-none transition-all duration-200 bg-gray-50 ${
                        errors.department
                          ? "border-red-300"
                          : "border-gray-200 focus:border-[#3C8F63]"
                      }`}
                      {...register("department", {
                        required: "Department is required",
                      })}
                    >
                      <option value="">Select Department</option>
                      {profile?.departments?.map((dept, index) => (
                        <option key={index} value={dept}>
                          {dept}
                        </option>
                      ))}
                    </select>
                    {errors.department && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.department.message}
                      </p>
                    )}
                  </div>

                  {/* Position */}
                  <div>
                    <label className="block text-xl font-medium text-gray-700 mb-2">
                      Position *
                    </label>
                    <input
                      type="text"
                      name="position"
                      placeholder="e.g. Senior Developer"
                      className={`w-full pl-4 pr-4 py-3 border-2 rounded-xl outline-none transition-all duration-200 bg-gray-50 ${
                        errors.position
                          ? "border-red-300"
                          : "border-gray-200 focus:border-[#3C8F63]"
                      }`}
                      {...register("position", {
                        required: "Position is required",
                      })}
                    />
                    {errors.position && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.position.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Navigation */}
                <div className="flex justify-end mt-8 pt-6 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={() => validateStep(2)}
                    className="px-8 py-3 bg-[#3C8F63] text-white rounded-xl font-medium hover:bg-[#2a6b4a] transition-all duration-200 shadow-lg shadow-[#3C8F63]/30 hover:shadow-xl hover:shadow-[#3C8F63]/40"
                  >
                    Next: Details
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Job Details */}
            {currentStep === 2 && (
              <div className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-[#3C8F63]/10 rounded-xl flex items-center justify-center">
                    <FiUser className="text-[#3C8F63] text-lg" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800">
                    Job Details
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Experience Level */}
                  <div>
                    <label className="block text-xl font-medium text-gray-700 mb-2">
                      Experience Level *
                    </label>
                    <select
                      className="w-full pl-4 pr-4 py-3 border-2 border-gray-200 rounded-xl outline-none focus:border-[#3C8F63] transition-all duration-200 bg-gray-50"
                      {...register("experienceLevel", {
                        required: "Experience level is required",
                      })}
                    >
                      <option value="Entry Level">Entry Level</option>
                      <option value="Mid Level">Mid Level</option>
                      <option value="Senior Level">Senior Level</option>
                      <option value="Executive">Executive</option>
                    </select>
                  </div>

                  {/* Open Positions */}
                  <div>
                    <label className="block text-xl font-medium text-gray-700 mb-2">
                      Open Positions
                    </label>
                    <input
                      type="number"
                      min="1"
                      placeholder="1"
                      className="w-full pl-4 pr-4 py-3 border-2 border-gray-200 rounded-xl outline-none focus:border-[#3C8F63] transition-all duration-200 bg-gray-50"
                      {...register("openPositions", {
                        min: { value: 1, message: "Must be at least 1" },
                        valueAsNumber: true,
                      })}
                    />
                    {errors.openPositions && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.openPositions.message}
                      </p>
                    )}
                  </div>

                  {/* Salary Range */}
                  <div className="md:col-span-2">
                    <label className="block text-xl font-medium text-gray-700 mb-2">
                      Salary Range
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="relative">
                        <FiDollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                          type="number"
                          placeholder="Min"
                          className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl outline-none focus:border-[#3C8F63] transition-all duration-200 bg-gray-50"
                          {...register("salaryRange.min", {
                            valueAsNumber: true,
                          })}
                        />
                      </div>
                      <div className="relative">
                        <FiDollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                          type="number"
                          placeholder="Max"
                          className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl outline-none focus:border-[#3C8F63] transition-all duration-200 bg-gray-50"
                          {...register("salaryRange.max", {
                            valueAsNumber: true,
                          })}
                        />
                      </div>
                      <select
                        className="px-4 py-3 border-2 border-gray-200 rounded-xl outline-none focus:border-[#3C8F63] transition-all duration-200 bg-gray-50"
                        {...register("salaryRange.currency")}
                      >
                        <option value="USD">USD</option>
                        <option value="EUR">EUR</option>
                        <option value="GBP">GBP</option>
                      </select>
                      <select
                        className="px-4 py-3 border-2 border-gray-200 rounded-xl outline-none focus:border-[#3C8F63] transition-all duration-200 bg-gray-50"
                        {...register("salaryRange.period")}
                      >
                        <option value="year">per year</option>
                        <option value="month">per month</option>
                        <option value="hour">per hour</option>
                      </select>
                    </div>
                  </div>

                  {/* Application Deadline */}
                  <div className="md:col-span-2">
                    <label className="block text-xl font-medium text-gray-700 mb-2">
                      Application Deadline
                    </label>
                    <div className="relative">
                      <FiCalendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="date"
                        className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl outline-none focus:border-[#3C8F63] transition-all duration-200 bg-gray-50"
                        {...register("applicationDeadline")}
                      />
                    </div>
                  </div>
                </div>

                {/* Navigation */}
                <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(1)}
                    className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-all duration-200"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={() => validateStep(3)}
                    className="px-8 py-3 bg-[#3C8F63] text-white rounded-xl font-medium hover:bg-[#2a6b4a] transition-all duration-200 shadow-lg shadow-[#3C8F63]/30 hover:shadow-xl hover:shadow-[#3C8F63]/40"
                  >
                    Next: Description
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Job Description */}
            {currentStep === 3 && (
              <div className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-[#3C8F63]/10 rounded-xl flex items-center justify-center">
                    <FiBriefcase className="text-[#3C8F63] text-lg" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800">
                    Job Description
                  </h2>
                </div>

                {/* Job Description */}
                <div className="mb-6">
                  <label className="block text-xl font-medium text-gray-700 mb-2">
                    Job Description *
                  </label>
                  <textarea
                    rows="6"
                    placeholder="Describe the role, expectations, and what makes this position exciting..."
                    className={`w-full pl-4 pr-4 py-3 border-2 rounded-xl outline-none transition-all duration-200 bg-gray-50 resize-none ${
                      errors.jobDescription
                        ? "border-red-300"
                        : "border-gray-200 focus:border-[#3C8F63]"
                    }`}
                    {...register("jobDescription", {
                      required: "Job description is required",
                      minLength: {
                        value: 50,
                        message:
                          "Job description must be at least 50 characters",
                      },
                    })}
                  ></textarea>
                  {errors.jobDescription && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.jobDescription.message}
                    </p>
                  )}
                </div>

                {/* All Dynamic Fields */}
                {renderDynamicFields(
                  "responsibilities",
                  "Responsibility",
                  "Responsibility"
                )}
                {renderDynamicFields(
                  "requirementSkills",
                  "Required Skills",
                  "Required Skill"
                )}
                {renderDynamicFields(
                  "niceToHave",
                  "Nice to Have",
                  "Nice to Have"
                )}
                {renderDynamicFields("benefits", "Benefit", "Benefit")}

                {/* Tags - Special for searching */}
                <div className="mb-6">
                  <label className="block text-xl font-medium text-gray-700 mb-3">
                    <FiTag className="inline mr-2" />
                    Search Tags (Like YouTube)
                  </label>
                  <div className="space-y-3">
                    {dynamicFields.tags.map((tag, index) => (
                      <div key={index} className="flex gap-3">
                        <div className="flex-1">
                          <input
                            type="text"
                            placeholder={`Tag ${
                              index + 1
                            } (e.g. React, Remote, Senior)`}
                            value={tag}
                            onChange={(e) =>
                              updateDynamicField("tags", index, e.target.value)
                            }
                            className="w-full pl-4 pr-4 py-3 border-2 border-gray-200 rounded-xl outline-none focus:border-[#3C8F63] transition-all duration-200 bg-gray-50"
                          />
                        </div>
                        {dynamicFields.tags.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeDynamicField("tags", index)}
                            className="px-4 py-3 border-2 border-red-200 text-red-600 rounded-xl hover:bg-red-50 transition-all duration-200"
                          >
                            <FiX size={18} />
                          </button>
                        )}
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => addDynamicField("tags")}
                      className="flex items-center gap-2 px-4 py-3 border-2 border-dashed border-gray-300 text-gray-600 rounded-xl hover:border-[#3C8F63] hover:text-[#3C8F63] transition-all duration-200"
                    >
                      <FiPlus size={18} />
                      Add Tag
                    </button>
                  </div>
                </div>

                {/* Who Can Apply - Optional with checkbox */}
                <div className="mb-6">
                  <div className="flex items-center gap-3 mb-3">
                    <input
                      type="checkbox"
                      checked={enableWhoCanApply}
                      onChange={(e) => setEnableWhoCanApply(e.target.checked)}
                      className="w-4 h-4 text-[#3C8F63] border-gray-300 rounded focus:ring-[#3C8F63]"
                    />
                    <label className="block text-xl font-medium text-gray-700">
                      Add "Who Can Apply" Requirements (Optional)
                    </label>
                  </div>

                  {enableWhoCanApply && (
                    <div className="space-y-3">
                      {dynamicFields.whoCanApply.map((item, index) => (
                        <div key={index} className="flex gap-3">
                          <div className="flex-1">
                            <input
                              type="text"
                              placeholder={`Requirement ${index + 1}`}
                              value={item}
                              onChange={(e) =>
                                updateDynamicField(
                                  "whoCanApply",
                                  index,
                                  e.target.value
                                )
                              }
                              className="w-full pl-4 pr-4 py-3 border-2 border-gray-200 rounded-xl outline-none focus:border-[#3C8F63] transition-all duration-200 bg-gray-50"
                            />
                          </div>
                          {dynamicFields.whoCanApply.length > 1 && (
                            <button
                              type="button"
                              onClick={() =>
                                removeDynamicField("whoCanApply", index)
                              }
                              className="px-4 py-3 border-2 border-red-200 text-red-600 rounded-xl hover:bg-red-50 transition-all duration-200"
                            >
                              <FiX size={18} />
                            </button>
                          )}
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() => addDynamicField("whoCanApply")}
                        className="flex items-center gap-2 px-4 py-3 border-2 border-dashed border-gray-300 text-gray-600 rounded-xl hover:border-[#3C8F63] hover:text-[#3C8F63] transition-all duration-200"
                      >
                        <FiPlus size={18} />
                        Add Requirement
                      </button>
                    </div>
                  )}
                </div>

                {/* Navigation */}
                <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(2)}
                    className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-all duration-200"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={() => validateStep(4)}
                    className="px-8 py-3 bg-[#3C8F63] text-white rounded-xl font-medium hover:bg-[#2a6b4a] transition-all duration-200 shadow-lg shadow-[#3C8F63]/30 hover:shadow-xl hover:shadow-[#3C8F63]/40"
                  >
                    Next: Review
                  </button>
                </div>
              </div>
            )}

            {/* Step 4: Review & Submit */}
            {currentStep === 4 && (
              <div className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-[#3C8F63]/10 rounded-xl flex items-center justify-center">
                    <FiBriefcase className="text-[#3C8F63] text-lg" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800">
                    Review & Post
                  </h2>
                </div>

                {/* Preview Card */}
                <div className="bg-gradient-to-r from-[#3C8F63]/5 to-[#3C8F63]/10 border-2 border-[#3C8F63]/20 rounded-2xl p-6 mb-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-800 mb-1">
                        {formValues.jobTitle || "Job Title"}
                      </h3>
                      <p className="text-gray-600">
                        {formValues.country && formValues.city
                          ? `${formValues.city}, ${formValues.country}`
                          : "Location"}{" "}
                        • {formValues.department || "Department"}
                      </p>
                    </div>
                    <span className="px-3 py-1 bg-[#3C8F63] text-white text-sm rounded-full font-medium">
                      {formValues.jobType}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500">Experience</p>
                      <p className="font-medium">
                        {formValues.experienceLevel}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-500">Salary</p>
                      <p className="font-medium">
                        {formValues.salaryRange.min &&
                        formValues.salaryRange.max
                          ? `$${formValues.salaryRange.min} - $${formValues.salaryRange.max}`
                          : "Not specified"}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-500">Applications</p>
                      <p className="font-medium">0</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Deadline</p>
                      <p className="font-medium">
                        {formValues.applicationDeadline
                          ? new Date(
                              formValues.applicationDeadline
                            ).toLocaleDateString()
                          : "Not specified"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Final Actions */}
                <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(3)}
                    className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-all duration-200"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="px-8 py-3 bg-[#3C8F63] text-white rounded-xl font-medium hover:bg-[#2a6b4a] transition-all duration-200 shadow-lg shadow-[#3C8F63]/30 hover:shadow-xl hover:shadow-[#3C8F63]/40"
                  >
                    Post Job
                  </button>
                </div>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default RecPostJob;
