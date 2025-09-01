import "./SignUp.css";
import logo from "../../../../assets/companyLogo.png";
import { useState } from "react";

const SignUp = () => {
  const [step, setStep] = useState(1);

  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);

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
                <div className="step">This is content 1</div>
                <div className="step">This is content 2</div>
                <div className="step">This is content 3</div>
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
              <button
                disabled={step === 4}
                onClick={handleNext}
                className="btn btn-accent"
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