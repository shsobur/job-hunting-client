import "./SignIn.css";
import { Link, useNavigate } from "react-router";
import { FcGoogle } from "react-icons/fc";
import { useForm } from "react-hook-form";
import { useContext, useState } from "react";
import { AuthContext } from "../../../../Context/AuthContext";
import Swal from "sweetalert2";

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { handleLoginUser, firebaseLoading } = useContext(AuthContext);
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

  return (
    <section id="main_signIn_container">
      <form
        className="signIn_inner_container"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="signIn_content">
          <h1>Sign In with</h1>

          <button type="button" className="google_signIn_btn">
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
              <a href="#" className="forgot_password">
                Forgot password?
              </a>
            </li>

            <li className="signIn_button">
              <button type="submit">
                {firebaseLoading ? "Working...." : "Sign In"}
              </button>
            </li>

            <li>
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
