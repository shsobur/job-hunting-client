import "./SignUp.css";
import logo from "../../../../assets/companyLogo.png";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { HiOutlineInformationCircle } from "react-icons/hi";
import { FcCheckmark } from "react-icons/fc";

const SignUp = () => {
  const [step, setStep] = useState(1);
  const [selected, setSelected] = useState("");

  // Handle Slide__
  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);

  const options = [
    "Social Media",
    "Friend or Family",
    "Google / Search Engine",
    "Randomly",
  ];

  return (
    <>
      <section id="main_signUp_container">
        <div className="signUp_inner_container">
          <div className="signUp_parent_content_container">
            <div className="signUp_content">
              <div
                className="slider"
                style={{ transform: `translateX(-${(step - 1) * (100 / 4)}%)` }}
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
                  <div >

                  </div>
                </div>
                <div className="step">This is content 4</div>
              </div>
            </div>

            <div className="company_logo">
              <img src={logo} alt="Company Logo" />
            </div>
          </div>

          <div className="signUp_process_button">
            <button
              disabled={step === 1}
              onClick={handleBack}
              className="btn btn-accent"
            >
              Previous
            </button>

            {step === 4 ? (
              <button className="btn btn-accent">Submit</button>
            ) : (
              step > 1 && (
                <button
                  disabled={step === 4}
                  onClick={handleNext}
                  className="btn btn-accent"
                >
                  Next
                </button>
              )
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default SignUp;
