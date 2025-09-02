import "./SignUp.css";
import logo from "../../../../assets/companyLogo.png";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { HiOutlineInformationCircle } from "react-icons/hi";
import { FcCheckmark } from "react-icons/fc";
import { useForm } from "react-hook-form";
import { PiSmileyXEyesBold } from "react-icons/pi";
import { BsEmojiHeartEyes } from "react-icons/bs";
import ReCAPTCHA from "react-google-recaptcha";

const SignUp = () => {
  const [step, setStep] = useState(1);
  const [passwordOpen, setPasswordOpen] = useState(false);
  const [selected, setSelected] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [captchaValue, setCaptchaValue] = useState(null);

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
  const handlePassword = () => setPasswordOpen(!passwordOpen);

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
    console.log(data);
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
                          type={passwordOpen ? "text" : "password"}
                          name="password"
                          placeholder="Enter you password"
                        />
                        <input
                          type="password"
                          name="confirmPassword"
                          placeholder="Confirm password"
                        />

                        <span
                          onClick={handlePassword}
                          className="pass_show_icons"
                        >
                          {passwordOpen ? (
                            <button>
                              <BsEmojiHeartEyes size={25} />
                            </button>
                          ) : (
                            <button>
                              <PiSmileyXEyesBold size={25} />
                            </button>
                          )}
                        </span>

                        <div className="not_robot_container">
                          <ReCAPTCHA
                            sitekey={import.meta.env.VITE_SITE_KEY}
                            onChange={handleCaptcha}
                          />
                        </div>

                        <div className="check_box">
                          <label className="checkbox_label">
                            <input type="checkbox" />
                            <span className="custom_checkbox"></span>I agree to
                            the <a href="#">Terms & Conditions</a>
                          </label>
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

          <div className="signUp_process_button">
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
