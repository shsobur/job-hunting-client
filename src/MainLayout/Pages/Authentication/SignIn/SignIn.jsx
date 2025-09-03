import "./SignIn.css";
import { Link } from "react-router";
import { FcGoogle } from "react-icons/fc";
import { useForm } from "react-hook-form";

const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Form Data:", data);
    // You can send this to your backend or handle login logic
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
                id="input-1"
                type="password"
                placeholder="Enter your password"
                {...register("password", { required: true })}
              />
              {errors.password && (
                <p className="text-red-500 text-sm">Password is required</p>
              )}
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
              <button type="submit">Sign in</button>
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
