import "./ContactModal.css";
import { useEffect, useState } from "react";
import { FaLightbulb } from "react-icons/fa";
import Swal from "sweetalert2";

const ContactModal = () => {
  // Data from inputs__
  const [countriesList, setCountriesList] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [citiesList, setCitiesList] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [phoneCode, setPhoneCode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isPhoneValid, setIsPhoneValid] = useState(false);

  // Load countries.json from public folder__
  useEffect(() => {
    fetch("/countries.json")
      .then((res) => res.json())
      .then((data) => setCountriesList(data))
      .catch((err) => console.error("Error loading countries.json:", err));
  }, []);

  // Handle country change__
  const handleCountryChange = (e) => {
    const country = e.target.value;
    setSelectedCountry(country);

    const countryData = countriesList.find((c) => c.country === country);

    if (countryData) {
      setCitiesList(countryData.cities || []);
      setPhoneCode(countryData.phone || "");
      setSelectedCity("");
    } else {
      setCitiesList([]);
      setPhoneCode("");
      setSelectedCity("");
    }
  };

  // Phone number validation__
  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    setPhoneNumber(value);

    const isValid = /^[0-9]{7,15}$/.test(value);
    setIsPhoneValid(isValid);
  };

  // Merge phone code + number__
  const getFullPhoneNumber = () => {
    if (!phoneCode || !phoneNumber) return "";

    let number = phoneNumber;
    if (number.startsWith("0")) number = number.slice(1);

    return `${phoneCode}${number}`;
  };

  const sendOtp = () => {
    const modal = document.getElementById("contact_update_modal");
    modal.close(); // closes the dialog temporarily

    Swal.fire({
      title: "Money Problem 💸",
      text: "Sending OTP via SMS is expensive 😅 I tried free options, but they all ask for money after the trial. One day I’ll be rich and add this feature! For now, just type anything you want.",
      icon: "info",
    }).then(() => {
      modal.showModal();
    });
  };

  // Submit contact form
  const handleContactSubmit = async (e) => {
    e.preventDefault();

    const data = {
      country: selectedCountry,
      city: selectedCity,
      phone: getFullPhoneNumber(),
      linkedin: e.target.linkedin?.value,
      github: e.target.github?.value,
      portfolio: e.target.portfolio?.value,
    };

    console.log("Final object:", data);
    // TODO: send `data` to your backend
  };

  // Cancel / reset form
  const handleCancel = () => {
    const modal = document.getElementById("contact_update_modal");
    modal.close();

    setSelectedCountry("");
    setSelectedCity("");
    setPhoneCode("");
    setPhoneNumber("");
    setIsPhoneValid(false);
  };

  return (
    <section>
      <dialog id="contact_update_modal" className="modal">
        <div className="modal-box max-w-[1024px] p-8">
          <div className="contact_update_main_content_container">
            {/* Header */}
            <div className="mb-8">
              <h2 className="text-3xl font-semibold text-gray-800 font-[Montserrat]">
                Edit contact info
              </h2>
            </div>

            {/* Form */}
            <form onSubmit={handleContactSubmit} className="space-y-8">
              {/* Country & City */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="form-control">
                  <label className="label p-0 mb-2">
                    <span className="label-text text-gray-700 font-medium text-xl">
                      Country
                    </span>
                  </label>
                  <select
                    value={selectedCountry}
                    onChange={handleCountryChange}
                    className="select select-bordered w-full bg-white text-lg h-[51px] py-1 px-4 border-2 border-gray-300 rounded-lg focus:border-[#3C8F63] focus:ring-[#3C8F63] focus:outline-none transition-colors"
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
                    className="select select-bordered w-full bg-white text-lg h-[51px] py-1 px-4 border-2 border-gray-300 rounded-lg focus:border-[#3C8F63] focus:ring-[#3C8F63] focus:outline-none transition-colors"
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
                      className="input input-bordered w-full text-lg py-6 px-4 border-2 border-gray-300 rounded-lg focus:border-[#3C8F63] focus:ring-[#3C8F63] focus:outline-none transition-colors"
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
                      onChange={handlePhoneChange}
                      placeholder="01787548843"
                      className="input input-bordered w-full bg-white text-lg py-6 px-4 border-2 border-gray-300 rounded-lg focus:border-[#3C8F63] focus:ring-[#3C8F63]  focus:outline-none transition-colors"
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
                      className="input input-bordered w-full bg-white text-lg py-6 px-4 border-2 border-gray-300 rounded-lg focus:border-[#3C8F63] focus:ring-[#3C8F63]  focus:outline-none transition-colors"
                    />
                  </div>

                  <button
                    onClick={sendOtp}
                    type="button"
                    disabled={!isPhoneValid}
                    className={`btn h-[52px] text-lg min-w-[140px] mt-2 md:mt-0 
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

              <div id="recaptcha-container"></div>

              {/* Social Links */}
              <div>
                <h3 className="text-2xl font-semibold text-gray-800 mb-6">
                  Social Links
                </h3>
                <div className="space-y-6">
                  <div className="form-control">
                    <label className="label p-0 mb-2">
                      <span className="label-text text-gray-700 font-medium text-xl">
                        LinkedIn
                      </span>
                    </label>
                    <input
                      type="url"
                      name="linkedin"
                      placeholder="https://linkedin.com/in/yourname"
                      className="input input-bordered w-full bg-white text-lg py-6 px-5 border-2 border-gray-300 rounded-lg focus:border-[#3C8F63] focus:ring-[#3C8F63] focus:outline-none transition-colors"
                    />
                  </div>

                  <div className="form-control">
                    <label className="label p-0 mb-2">
                      <span className="label-text text-gray-700 font-medium text-xl">
                        GitHub
                      </span>
                    </label>
                    <input
                      type="url"
                      name="github"
                      placeholder="https://github.com/yourname"
                      className="input input-bordered w-full bg-white text-lg py-6 px-5 border-2 border-gray-300 rounded-lg focus:border-[#3C8F63] focus:ring-[#3C8F63] focus:outline-none transition-colors"
                    />
                  </div>

                  <div className="form-control">
                    <label className="label p-0 mb-2">
                      <span className="label-text text-gray-700 font-medium text-xl">
                        Personal Portfolio
                      </span>
                    </label>
                    <input
                      type="url"
                      name="portfolio"
                      placeholder="https://yourwebsite.com"
                      className="input input-bordered w-full bg-white text-lg py-6 px-5 border-2 border-gray-300 rounded-lg focus:border-[#3C8F63] focus:ring-[#3C8F63] focus:outline-none transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Tip Box */}
              <div className="alert bg-green-50 border-2 border-[#3C8F63] mt-8 p-5 rounded-lg">
                <div className="flex items-start">
                  <FaLightbulb className="text-green-600 text-xl mt-1 mr-4" />
                  <div>
                    <div className="text-[#3C8F63] text-base">
                      Make sure your contact information is up to date to
                      receive important notifications and for potential
                      employers to reach you.
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-4 pt-8">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="btn btn-outline px-8 py-3 text-lg border-2 border-gray-300 hover:bg-gray-100 hover:border-gray-400"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="btn bg-[#3C8F63] border-[#3C8F63] hover:bg-[#337954] hover:border-green-700 px-8 py-3 text-lg text-white"
                >
                  Save Changes
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
