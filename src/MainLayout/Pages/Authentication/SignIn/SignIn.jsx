// File path__
import "./SignIn.css";
import auth from "../../../../Firebase/firebase.config";
import { AuthContext } from "../../../../Context/AuthContext";
import { jhError, jhInfo, jhToastSuccess } from "../../../../utils";

// From react__
import { useContext, useState } from "react";

// Package(REACT ICONS, SWEET ALERT)__
import { FcGoogle } from "react-icons/fc";
import {
  FaEye,
  FaEyeSlash,
  FaLock,
  FaEnvelope,
  FaUserShield,
} from "react-icons/fa";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { sendPasswordResetEmail } from "firebase/auth";

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [googleBtnOff, setGoogleBtnOff] = useState(false);
  const [recoverEmail, setRecoverEmail] = useState("");
  const [passwordLoading, setPasswordLoading] = useState(false);
  const { handleLoginUser, handleGoogleSignIn, firebaseLoading } =
    useContext(AuthContext);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const email = data.email;
    const password = data.password;

    await handleLoginUser(email, password).then(() => {
      navigate("/");
      jhToastSuccess("Sign In successfully");
    });
  };

  const handleForgotPassword = async () => {
    setPasswordLoading(true);

    try {
      await sendPasswordResetEmail(auth, recoverEmail);
      jhInfo({
        title: "Check Your Email",
        text: "We sent a reset link to your email inbox. If you don't find it on inbox then check you spam folder",
      });
    } catch {
      jhError({
        title: "Password Recover Failed",
        text: "There might be some issue. Try again!",
      });
    } finally {
      setPasswordLoading(false);
      document.getElementById("forget_pass_modal_close").click();
    }
  };

  const handleGoogleLogin = async () => {
    setGoogleBtnOff(true);
    await handleGoogleSignIn()
      .then((res) => {
        if (res) {
          setGoogleBtnOff(false);
          navigate("/");
        }
      })
      .catch(() => {
        setGoogleBtnOff(false);
      });
  };

  return (
    <section id="main_signIn_container">
      <div className="signIn_background">
        <form
          className="signIn_form_container"
          onSubmit={handleSubmit(onSubmit)}
        >
          {/* Header Section */}
          <div className="form_header">
            <div className="form_logo">
              <h1 className="form_title">Welcome Back</h1>
            </div>
            <p className="form_subtitle">Sign in to your JobHunting account</p>
          </div>

          {/* Google Sign In */}
          <button
            type="button"
            disabled={googleBtnOff}
            onClick={handleGoogleLogin}
            className="google_signIn_btn"
          >
            <FcGoogle className="google_icon" />
            <span className="google_text">
              {googleBtnOff ? "Signing in..." : "Continue with Google"}
            </span>
          </button>

          {/* Divider */}
          <div className="form_divider">
            <span className="divider_text">or continue with email</span>
          </div>

          {/* Form Inputs */}
          <div className="form_inputs_container">
            {/* Email Input */}
            <div className="input_group">
              <div className="input_container">
                <FaEnvelope className="input_icon" />
                <input
                  id="email-input"
                  type="email"
                  placeholder="Enter your email address"
                  className="form_input"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                />
              </div>
              {errors.email && (
                <p className="error_message">{errors.email.message}</p>
              )}
            </div>

            {/* Password Input */}
            <div className="input_group">
              <div className="input_container">
                <FaLock className="input_icon" />
                <input
                  id="password-input"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="form_input"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                />
                <button
                  type="button"
                  className="password_toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {errors.password && (
                <p className="error_message">{errors.password.message}</p>
              )}
            </div>

            {/* Options Row */}
            <div className="form_options">
              <label className="remember_me">
                <input
                  type="checkbox"
                  {...register("remember")}
                  className="checkbox_input"
                />
                <span className="checkbox_custom"></span>
                Remember me
              </label>
              <button
                type="button"
                onClick={() =>
                  document.getElementById("forgot_password_modal").showModal()
                }
                className="forgot_password"
              >
                Forgot password?
              </button>
            </div>

            {/* Submit Button */}
            <button
              className="signIn_button"
              type="submit"
              disabled={firebaseLoading}
            >
              {firebaseLoading ? (
                <div className="loading_spinner"></div>
              ) : (
                "Sign In"
              )}
            </button>

            {/* Sign Up Link */}
            <div className="signup_link_container">
              <p className="signup_text">
                Don't have an account?{" "}
                <Link to="/sign-up" className="signup_link">
                  Sign up for free
                </Link>
              </p>
            </div>
          </div>
        </form>
      </div>

      {/* Forgot Password Modal */}
      <dialog id="forgot_password_modal" className="jh_modal">
        <div className="modal_content">
          <div className="modal_header">
            <FaUserShield className="modal_icon" />
            <h3 className="modal_title">Recover Your Password</h3>
          </div>

          <div className="modal_body">
            <p className="modal_description">
              Enter the email address associated with your account and we'll
              send you a link to reset your password.
            </p>

            <div className="modal_input_group">
              <div className="modal_input_container">
                <FaEnvelope className="modal_input_icon" />
                <input
                  type="email"
                  placeholder="Enter your email address"
                  value={recoverEmail}
                  onChange={(e) => setRecoverEmail(e.target.value)}
                  className="modal_input"
                />
              </div>
            </div>

            <button
              type="button"
              disabled={passwordLoading}
              onClick={handleForgotPassword}
              className="modal_submit_btn"
            >
              {passwordLoading ? (
                <div className="loading_spinner small"></div>
              ) : (
                "Send Recovery Email"
              )}
            </button>
          </div>

          <div className="modal_actions">
            <button id="forget_pass_modal_close" className="modal_cancel_btn">
              Cancel
            </button>
          </div>
        </div>
      </dialog>
    </section>
  );
};

export default SignIn;