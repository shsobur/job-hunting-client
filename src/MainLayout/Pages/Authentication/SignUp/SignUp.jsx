// File path__
import "./SignUp.css";
import logo from "../../../../assets/companyLogo.png";

// From react__
import { useState } from "react";

// Package(REACT ICONS, REACT HOOK FROM, GOOGLE RECAPTCHA)__
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { FcCheckmark } from "react-icons/fc";
import ReCAPTCHA from "react-google-recaptcha";
import { HiOutlineInformationCircle } from "react-icons/hi";

const SignUp = () => {
  const [step, setStep] = useState(1);
  const [selected, setSelected] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [captchaValue, setCaptchaValue] = useState(null);
  const [robotError, setRobotError] = useState("");

  // How use know us__
  const options = [
    "Social Media",
    "Friend or Family",
    "Google / Search Engine",
    "Randomly",
  ];

  // User role__
  const roles = [
    {
      name: "Job Seeker",
      tip: "Create your profile, apply for jobs, and track your applications.",
    },
    {
      name: "Recruiter",
      tip: "Post job listings, review applications, and find top talent.",
    },
  ];

  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);

  // Google recaptcha__
  const handleCaptcha = (value) => {
    setCaptchaValue(value);
  };

  const {
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    if (!captchaValue) {
      setRobotError("Confirm you are not robot");
      return;
    }

    // Random name__
    const firstLetter = "user";
    const number = Math.floor(1000 + Math.random() * 9000);

    const userData = {
      hearFrom: selected,
      userRole: selectedRole,
      userEmail: data.email,
      userName: firstLetter + number
    };

    console.log(userData);
    setRobotError("");
  };

  return (
    <>
      <section id="main_signUp_container">
        <div className="signUp_inner_container">
          <div className="signUp_parent_content_container">
            <div className="signUp_content">
              <div
                className="slider"
                style={{
                  transform: `translateX(-${(step - 1) * (100 / 4)}%)`,
                }}
              >
                <div className="step">
                  <div className="step_one_content">
                    <h1>How would you like to sign up?</h1>
                    <button>
                      <FcGoogle /> Sign In With Google
                    </button>
                    <p>
                      <HiOutlineInformationCircle size={22} />{" "}
                      <i>
                        Sign up as a <b>user</b>(Job Seeker)
                      </i>
                    </p>
                    <button onClick={handleNext}>
                      Sign In With Email <p>(Recommended)</p>→
                    </button>
                    <p>
                      <HiOutlineInformationCircle size={22} />{" "}
                      <i>
                        If you want to be a <b>recruiter</b>, <br /> sign up
                        with email and choose your role
                      </i>
                    </p>
                  </div>
                </div>

                <div className="step">
                  <div className="step_two_content">
                    <h1>How do you hear about us?</h1>
                    <div className="hear_options">
                      {options.map((option) => (
                        <div
                          key={option}
                          className={`option ${
                            selected === option ? "selected" : ""
                          }`}
                          onClick={() => setSelected(option)}
                        >
                          <p>{option}</p>
                          {selected === option && (
                            <FcCheckmark className="check_icon" />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="step">
                  <div className="step_three_content">
                    <h1>Choose your role</h1>
                    <div className="user_role_container">
                      {roles.map((role) => (
                        <div key={role.name} className="role_item">
                          <button
                            className={
                              selectedRole === role.name ? "selected" : ""
                            }
                            onClick={() => setSelectedRole(role.name)}
                          >
                            {role.name}
                            {selectedRole === role.name && (
                              <FcCheckmark style={{ marginLeft: "8px" }} />
                            )}
                          </button>
                          <p>
                            <HiOutlineInformationCircle size={20} />{" "}
                            <i>{role.tip}</i>
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="step">
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="step_four_content">
                      <h1>Enter Your Email and Password</h1>

                      <div className="sign_up_input_container">
                        <input
                          type="email"
                          name="email"
                          placeholder="Enter you email"
                          {...register("email", { required: true })}
                        />
                        {errors.email && (
                          <span className="text-red-500 text-sm">
                            This field is required
                          </span>
                        )}
                        <input
                          type="password"
                          name="password"
                          placeholder="Enter you password"
                          {...register("password", {
                            required: true,
                            minLength: 6,
                            pattern: /^(?=.*[a-z])(?=.*[A-Z]).*$/,
                          })}
                        />

                        {/* handling password field error__ST */}
                        <div>
                          {errors.password?.type === "required" && (
                            <span className="text-sm text-red-400">
                              Password is required
                            </span>
                          )}
                        </div>

                        <div>
                          {errors.password?.type === "minLength" && (
                            <span className="text-sm text-red-400">
                              Password should be at least 6 characters
                            </span>
                          )}
                        </div>

                        <div>
                          {errors.password?.type === "pattern" && (
                            <span className="text-sm text-red-400">
                              Use at least one uppercase(A-Z) and lowercase(a-z)
                              character
                            </span>
                          )}
                        </div>
                        {/* handling password field error__END */}
                        <input
                          type="password"
                          name="confirmPassword"
                          placeholder="Confirm password"
                          {...register("confirmPassword", {
                            required: true,
                            validate: (value) => {
                              if (watch("password") !== value) {
                                return "Password do not match";
                              }
                            },
                          })}
                        />
                        <div>
                          {errors.confirmPassword && (
                            <span className="text-sm text-red-400">
                              Password don't match!
                            </span>
                          )}
                        </div>

                        <div className="not_robot_container">
                          <ReCAPTCHA
                            sitekey={import.meta.env.VITE_SITE_KEY}
                            onChange={handleCaptcha}
                          />
                          <span className="text-sm text-red-400">
                            {robotError}
                          </span>
                        </div>

                        <div className="check_box">
                          <label className="checkbox_label">
                            <input
                              name="terms"
                              type="checkbox"
                              {...register("terms", { required: true })}
                            />
                            <span className="custom_checkbox"></span>I agree to
                            the <a href="#">Terms & Conditions</a>
                          </label>
                          {errors.terms && (
                            <span className="text-sm text-red-400">
                              Accept our terms &conditions.
                            </span>
                          )}
                        </div>

                        <button
                          type="submit"
                          className="min-w-[70%] text-lg btn bg-[#3C8F63] text-white mt-5"
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            <div className="company_logo">
              <img src={logo} alt="Company Logo" />
            </div>
          </div>

          <div className="signUp_process_button  mt-3">
            <button
              type="button"
              disabled={step === 1}
              onClick={handleBack}
              className="btn bg-[#3C8F63] text-white"
            >
              Previous
            </button>

            {step !== 4 && step > 1 && (
              <button
                type="button"
                disabled={
                  step === 2 && selected === ""
                    ? true
                    : step === 3 && selectedRole === ""
                    ? true
                    : false
                }
                onClick={handleNext}
                className="btn bg-[#3C8F63] text-white"
              >
                Next
              </button>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default SignUp;
