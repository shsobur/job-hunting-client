import "./SignIn.css";
import { Link, useNavigate } from "react-router";
import { FcGoogle } from "react-icons/fc";
import { useForm } from "react-hook-form";
import { useContext, useState } from "react";
import { AuthContext } from "../../../../Context/AuthContext";
import Swal from "sweetalert2";

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
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

  const handleForgotPassword = () => {};

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
            onClick={handleGoogleSignIn}
            disabled={firebaseLoading}
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
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3C8F63]"
                  />
                  <button
                    type="button"
                    className="w-full bg-[#3C8F63] text-white py-2 rounded-lg hover:bg-[rgb(53,127,88)] transition"
                  >
                    Send Email
                  </button>
                </div>

                <div className="modal-action">
                  <form method="dialog">
                    <button className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300">
                      Close
                    </button>
                  </form>
                </div>
              </div>
            </dialog>
            <dialog id="my_modal_1" className="modal">
              <div className="modal-box w-[800px]">
                <h3 className="font-bold text-2xl">
                  Don't worry we will recover you password!
                </h3>
                <div>
                  <p>Enter you email that you use to create account</p>
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter you email"
                  />
                  <button type="button">Send Email</button>
                </div>
                <div className="modal-action">
                  <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                    <button className="btn">Close</button>
                  </form>
                </div>
              </div>
            </dialog>

            {/* Forgot password modal__END */}

            <li className="signIn_button">
              <button type="submit" disabled={firebaseLoading}>
                {firebaseLoading ? "Working...." : "Sign In"}
              </button>
            </li>

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
