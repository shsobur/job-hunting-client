// File path__
import "./ContactModal.css";
import useUserData from "../../../Hooks/userData";
import SeekerModalHeader from "../../../MainLayout/Shared/SeekerModalHeader/SeekerModalHeader";

// From react__
import { useEffect, useState, useRef } from "react";

// Package__
import Swal from "sweetalert2";
import { FaLightbulb } from "react-icons/fa";

const ContactModal = () => {
  const { profile, updateProfile } = useUserData();
  const [updateLoading, setUpdateLoading] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  // Form state__
  const [countriesList, setCountriesList] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [citiesList, setCitiesList] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [phoneCode, setPhoneCode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isPhoneValid, setIsPhoneValid] = useState(false);
  const [linkedin, setLinkedin] = useState("");
  const [github, setGithub] = useState("");
  const [portfolio, setPortfolio] = useState("");

  // Store original data__
  const originalDataRef = useRef({});

  // Load countries.json__
  useEffect(() => {
    fetch("/countries.json")
      .then((res) => res.json())
      .then((data) => setCountriesList(data))
      .catch((err) => console.error("Error loading countries.json:", err));
  }, []);

  // Pre-fill form with profile data and store original values__
  useEffect(() => {
    if (profile && countriesList.length) {
      const country = profile.location?.country || "";
      const city = profile.location?.city || "";

      setSelectedCountry(country);

      const countryData = countriesList.find((c) => c.country === country);
      if (countryData) {
        setCitiesList(countryData.cities || []);
        setSelectedCity(city);
        setPhoneCode(countryData.phone || "");
      } else {
        setCitiesList([]);
        setSelectedCity("");
        setPhoneCode("");
      }

      // Phone number__
      let currentPhoneCode = phoneCode;
      let currentPhoneNumber = "";

      if (profile.number) {
        if (profile.number.startsWith("+")) {
          const codeLength = profile.number.length - 10;
          currentPhoneCode = profile.number.slice(0, codeLength);
          currentPhoneNumber = profile.number.slice(codeLength);
        } else {
          currentPhoneCode = "";
          currentPhoneNumber = profile.number;
        }
      }

      setPhoneCode(currentPhoneCode);
      setPhoneNumber(currentPhoneNumber || "");
      setLinkedin(profile.social?.linkedin || "");
      setGithub(profile.social?.github || "");
      setPortfolio(profile.social?.portfolio || "");

      // Store original data for comparison__
      originalDataRef.current = {
        country,
        city,
        phoneCode: currentPhoneCode,
        phoneNumber: currentPhoneNumber || "",
        linkedin: profile.social?.linkedin || "",
        github: profile.social?.github || "",
        portfolio: profile.social?.portfolio || "",
      };

      setHasChanges(false);
    }
  }, [profile, countriesList, phoneCode]);

  // Check if form has changes__
  const checkForChanges = () => {
    const original = originalDataRef.current;

    return (
      selectedCountry !== original.country ||
      selectedCity !== original.city ||
      phoneCode !== original.phoneCode ||
      phoneNumber !== original.phoneNumber ||
      linkedin !== original.linkedin ||
      github !== original.github ||
      portfolio !== original.portfolio
    );
  };

  // Update hasChanges when any field changes__
  useEffect(() => {
    setHasChanges(checkForChanges());
  }, [
    selectedCountry,
    selectedCity,
    phoneCode,
    phoneNumber,
    linkedin,
    github,
    portfolio,
  ]);

  // Handle country change__
  const handleCountryChange = (e) => {
    const country = e.target.value;
    setSelectedCountry(country);

    const countryData = countriesList.find((c) => c.country === country);
    if (countryData) {
      setCitiesList(countryData.cities || []);
      setPhoneCode(countryData.phone || "");
      setSelectedCity(countryData.cities?.[0] || "");
    } else {
      setCitiesList([]);
      setPhoneCode("");
      setSelectedCity("");
    }
  };

  // Handle social links change
  const handleLinkedinChange = (e) => {
    setLinkedin(e.target.value);
  };

  const handleGithubChange = (e) => {
    setGithub(e.target.value);
  };

  const handlePortfolioChange = (e) => {
    setPortfolio(e.target.value);
  };

  const getFullPhoneNumber = () => {
    if (!phoneCode || !phoneNumber) return "";
    let number = phoneNumber.startsWith("0")
      ? phoneNumber.slice(1)
      : phoneNumber;
    return `${phoneCode}${number}`;
  };

  const sendOtp = () => {
    const modal = document.getElementById("contact_update_modal");
    modal.close();

    Swal.fire({
      title: "Money Problem 💸",
      text: "Sending OTP via SMS is expensive 😅 and I am poor. Just type anything for now or leave it empty.",
      icon: "info",
    }).then(() => modal.showModal());
  };

  // Submit contact form__
  const handleContactSubmit = async (e) => {
    e.preventDefault();

    const data = {
      number: getFullPhoneNumber() || profile.number,
      location: {
        city: selectedCity || profile.location?.city,
        country: selectedCountry || profile.location?.country,
      },
      social: {
        linkedin: linkedin || profile.social?.linkedin,
        github: github || profile.social?.github,
        portfolio: portfolio || profile.social?.portfolio,
      },
    };

    setUpdateLoading(true);
    updateProfile(data, {
      onSuccess: () => {
        handleCloseModal();

        Swal.fire({
          title: "Success!",
          text: "Contacts updated successfully.",
          icon: "success",
        });

        // Update original data after successful save
        originalDataRef.current = {
          country: selectedCountry,
          city: selectedCity,
          phoneCode: phoneCode,
          phoneNumber: phoneNumber,
          linkedin: linkedin,
          github: github,
          portfolio: portfolio,
        };

        setHasChanges(false);
        setUpdateLoading(false);
      },
      onError: () => {
        handleCloseModal();

        Swal.fire({
          title: "Oops!",
          text: "Something went wrong while updating.",
          icon: "error",
        });

        setUpdateLoading(false);
      },
    });
  };

  // Cancel / reset form__
  const handleCancel = () => {
    handleCloseModal();

    const original = originalDataRef.current;

    setSelectedCountry(original.country);
    setSelectedCity(original.city);
    setPhoneCode(original.phoneCode);
    setPhoneNumber(original.phoneNumber);
    setLinkedin(original.linkedin);
    setGithub(original.github);
    setPortfolio(original.portfolio);

    setIsPhoneValid(false);
    setHasChanges(false);
  };

  const handleCloseModal = () => {
    const modal = document.getElementById("contact_update_modal");
    modal.close();
  };

  return (
    <section>
      <dialog id="contact_update_modal" className="modal">
        <div className="modal-box max-w-[1024px] max-h-[95vh] lg:p-0 p-0">
          <div className="contact_update_main_content_container">
            {/* Header */}
            <SeekerModalHeader
              title={"Edit contact info"}
              handleCloseModal={handleCloseModal}
            ></SeekerModalHeader>

            {/* Form */}
            <form onSubmit={handleContactSubmit} className="space-y-8 px-5">
              {/* Country & City */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="form-control">
                  <label className="label mb-2">
                    <span className="label-text text-gray-700 font-medium text-xl">
                      Country
                    </span>
                  </label>

                  <select
                    value={selectedCountry}
                    onChange={handleCountryChange}
                    className="select select-bordered cursor-pointer w-full text-lg h-[45px] px-4 border-2 border-gray-300 rounded-lg focus:border-[#3C8F63] focus:outline-none transition-colors"
                  >
                    <option value="">Select Country</option>
                    {countriesList.map((c) => (
                      <option key={c.country} value={c.country}>
                        {c.country}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-control">
                  <label className="label p-0 mb-2">
                    <span className="label-text text-gray-700 font-medium text-xl">
                      City
                    </span>
                  </label>

                  <select
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    className="select select-bordered cursor-pointer w-full text-lg h-[45px] px-4 border-2 border-gray-300 rounded-lg focus:border-[#3C8F63] focus:outline-none transition-colors"
                  >
                    <option value="">Select City</option>
                    {citiesList.map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Phone & OTP */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-end">
                <div className="grid grid-cols-2 gap-4">
                  <div className="form-control">
                    <label className="label p-0 mb-2">
                      <span className="label-text text-gray-700 font-medium text-xl">
                        Code
                      </span>
                    </label>

                    <input
                      type="text"
                      value={phoneCode}
                      onChange={(e) => setPhoneCode(e.target.value)}
                      className="input input-bordered w-full text-lg h-[45px] px-4 border-2 border-gray-300 rounded-lg focus:border-[#3C8F63] focus:outline-none transition-colors"
                    />
                  </div>

                  <div className="form-control">
                    <label className="label p-0 mb-2">
                      <span className="label-text text-gray-700 font-medium text-xl">
                        Mobile number
                      </span>
                    </label>

                    <input
                      type="tel"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder="01787548843"
                      className="input input-bordered w-full text-lg h-[45px] px-4 border-2 border-gray-300 rounded-lg focus:border-[#3C8F63] focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="flex flex-col md:flex-row gap-4 items-end">
                  <div className="form-control flex-grow">
                    <label className="label p-0 mb-2">
                      <span className="label-text text-gray-700 font-medium text-xl">
                        Verification code
                      </span>
                    </label>

                    <input
                      type="text"
                      placeholder="Enter 6-digit code"
                      className="input input-bordered w-full text-lg h-[45px] px-4 border-2 border-gray-300 rounded-lg focus:border-[#3C8F63] focus:outline-none transition-colors"
                    />
                  </div>

                  <button
                    onClick={sendOtp}
                    type="button"
                    disabled={!isPhoneValid}
                    className={`btn h-[45px] text-lg min-w-[140px] 
                      ${
                        isPhoneValid
                          ? "bg-[#3C8F63] text-white hover:bg-[#337954]"
                          : "bg-gray-300 text-gray-500 cursor-not-allowed"
                      }`}
                  >
                    Send Code
                  </button>
                </div>
              </div>

              {/* Social Links */}
              <div>
                <h3 className="text-2xl font-semibold text-gray-800 mb-6">
                  Social Links
                </h3>

                <div className="space-y-6">
                  <div className="form-control">
                    <label className="label mb-2">
                      <span className="label-text text-gray-700 font-medium text-xl">
                        LinkedIn
                      </span>
                    </label>

                    <input
                      type="url"
                      value={linkedin}
                      onChange={handleLinkedinChange}
                      placeholder="https://linkedin.com/in/yourname"
                      className="input input-bordered w-full text-lg h-[45px] px-4 border-2 border-gray-300 rounded-lg focus:border-[#3C8F63] focus:outline-none transition-colors"
                    />
                  </div>

                  <div className="form-control">
                    <label className="label mb-2">
                      <span className="label-text text-gray-700 font-medium text-xl">
                        GitHub
                      </span>
                    </label>

                    <input
                      type="url"
                      value={github}
                      onChange={handleGithubChange}
                      placeholder="https://github.com/yourname"
                      className="input input-bordered w-full text-lg h-[45px] px-4 border-2 border-gray-300 rounded-lg focus:border-[#3C8F63] focus:outline-none transition-colors"
                    />
                  </div>

                  <div className="form-control">
                    <label className="label mb-2">
                      <span className="label-text text-gray-700 font-medium text-xl">
                        Personal Portfolio
                      </span>
                    </label>

                    <input
                      type="url"
                      value={portfolio}
                      onChange={handlePortfolioChange}
                      placeholder="https://yourwebsite.com"
                      className="input input-bordered w-full text-lg h-[45px] px-4 border-2 border-gray-300 rounded-lg focus:border-[#3C8F63] focus:outline-none transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Tip Box */}
              <div className="bg-[#F0FDF4] border border-[#3C8F63] mt-8 p-5 rounded-lg">
                <div className="flex items-start">
                  <FaLightbulb className="text-green-600 text-xl mr-4" />

                  <div>
                    <div className="text-[#276043] text-base">
                      <b>
                        <i>Tip:</i>
                      </b>{" "}
                      Keep your <b>phone</b>, <b>location</b>, and professional
                      links <b>(LinkedIn, GitHub, portfolio)</b> up-to-date.
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons - Now with enable/disable feature */}
              <div className="flex justify-end gap-4 bg-[#eef1f4] px-5 py-6 mt-6">
                <button
                  type="button"
                  disabled={updateLoading || !hasChanges}
                  onClick={handleCancel}
                  className={`btn btn-outline px-8 py-3 text-lg border-2 ${
                    updateLoading || !hasChanges
                      ? "border-gray-200 text-gray-400 cursor-not-allowed"
                      : "border-gray-300 hover:bg-gray-100 hover:border-gray-400"
                  }`}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={updateLoading || !hasChanges}
                  className={`btn px-8 py-3 text-lg ${
                    updateLoading || !hasChanges
                      ? "bg-gray-300 border-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-[#3C8F63] border-[#3C8F63] hover:bg-[#337954] text-white"
                  }`}
                >
                  {updateLoading ? "Working...." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </dialog>
    </section>
  );
};

export default ContactModal;
