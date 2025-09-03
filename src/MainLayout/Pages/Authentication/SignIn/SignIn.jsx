import { FcGoogle } from "react-icons/fc";
import "./SignIn.css";
import { Link } from "react-router";

const SignIn = () => {
  return (
    <>
      <section id="main_signIn_container">
        <form className="signIn_inner_container">
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
                  name="email"
                  placeholder="Enter you email"
                />
              </li>
              <li>
                <input
                  id="input-1"
                  type="password"
                  name="password"
                  placeholder="Enter you password"
                />
              </li>

              <li className="signIn_options">
                <label className="remember_me">
                  <input type="checkbox" name="remember" />
                  Remember me
                </label>
                <a href="#" className="forgot_password">
                  Forgot password?
                </a>
              </li>

              <li className="signIn_button">
                <button type="button">Sign in</button>
              </li>

              <li>
                <p>
                  You don't have account?{" "}
                  <Link to="/sign-up">
                  <span className="text-blue-600 cursor-pointer">
                    <u>Sign Up</u>
                  </span>{" "}
                  </Link>
                  for free now
                </p>
              </li>

            </ul>
          </div>
        </form>
      </section>
    </>
  );
};

export default SignIn;
