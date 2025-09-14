// File path__
import "./SignIn.css";
import auth from "../../../../Firebase/firebase.config";
import { AuthContext } from "../../../../Context/AuthContext";

// From react__
import { useContext, useState } from "react";

// Package(REACT ICONS, SWEET ALERT)__
import Swal from "sweetalert2";
import { FcGoogle } from "react-icons/fc";
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

      Swal.mixin({
        toast: true,
        position: "bottom",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        },
      }).fire({
        icon: "success",
        title: "Sign In successfully",
      });
    });
  };

  const handleForgotPassword = async () => {
    setPasswordLoading(true);

    try {
      await sendPasswordResetEmail(auth, recoverEmail);

      Swal.fire({
        title: "Check Your Email",
        text: "We sent a reset link to your email inbox. If you don't find it on inbox then check you spam folder",
        icon: "info",
      });
    } catch (error) {
      console.log(error.code, error.message);
      Swal.fire({
        title: "Password Recover Failed",
        text: "There might be some issue. Try again!",
        icon: "error",
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
      <form
        className="signIn_inner_container"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="signIn_content">
          <h1>Sign In with</h1>

          <button
            type="button"
            disabled={googleBtnOff}
            onClick={handleGoogleLogin}
            className="google_signIn_btn"
          >
            <FcGoogle />
            Sign In With Google
          </button>

          <ul className="signIn_input_container">
            <li>
              <input
                id="input-1"
                type="email"
                placeholder="Enter your email"
                {...register("email", { required: true })}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-3">Email is required</p>
              )}
            </li>

            <li>
              <input
                id="input-2"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                {...register("password", { required: true })}
              />
              {errors.password && (
                <p className="text-red-500 text-sm">Password is required</p>
              )}
              <span
                className="show_password_content cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide " : "Show"}
              </span>
            </li>

            <li className="signIn_options">
              <label className="remember_me">
                <input type="checkbox" {...register("remember")} />
                Remember me
              </label>
              <a
                onClick={() =>
                  document.getElementById("my_modal_1").showModal()
                }
                href="#"
                className="forgot_password"
              >
                Forgot password?
              </a>
            </li>

            {/* Forgot password modal__ST */}

            <dialog id="my_modal_1" className="modal">
              <div className="modal-box min-w-[310px] max-w-[500px]">
                <h3 className="font-bold text-2xl mb-4">
                  Don’t worry, we’ll help you recover your password!
                </h3>

                <div className="space-y-4">
                  <p className="text-gray-600">
                    Enter the email you used to create your account
                  </p>
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={recoverEmail}
                    onChange={(e) => setRecoverEmail(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3C8F63]"
                  />
                  <button
                    type="button"
                    disabled={passwordLoading}
                    onClick={handleForgotPassword}
                    className="w-full bg-[#3C8F63] text-white py-2 rounded-lg hover:bg-[rgb(53,127,88)] transition"
                  >
                    {passwordLoading ? "Sending...." : "Send recover email"}
                  </button>
                </div>

                <div className="modal-action">
                  <form method="dialog">
                    <button
                      id="forget_pass_modal_close"
                      className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
                    >
                      Close
                    </button>
                  </form>
                </div>
              </div>
            </dialog>

            {/* Forgot password modal__END */}

            <button
              className="signIn_button"
              type="submit"
              disabled={firebaseLoading}
            >
              {firebaseLoading ? "Working...." : "Sign In"}
            </button>

            <li className="mt-5">
              <p>
                You don't have account?{" "}
                <Link to="/sign-up">
                  <span className="text-blue-600 cursor-pointer">
                    <u>Sign Up</u>
                  </span>
                </Link>{" "}
                for free now
              </p>
            </li>
          </ul>
        </div>
      </form>
    </section>
  );
};

export default SignIn;