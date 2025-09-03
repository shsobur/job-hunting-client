import { useState } from "react";
import auth from "../Firebase/firebase.config";
import { AuthContext } from "../Context/AuthContext";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import Swal from "sweetalert2";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [firebaseLoading, setFirebaseLoading] = useState(false);

  // Creates a new user with email and password__
  const handleCreateUser = async (email, password) => {
    setFirebaseLoading(true);

    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      return result;
    } catch (error) {
      console.log(error);

      Swal.fire({
        title: "Sign Up Failed",
        text: "There might be some issue, Please try again!",
        icon: "error",
      });

      throw error;
    } finally {
      setFirebaseLoading(false);
    }
  };

  const handleLoginUser = async (email, password) => {
    setFirebaseLoading(true);

    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      return result;
    } catch (error) {
      console.log(error);

      Swal.fire({
        title: "Sign In Failed",
        text: "There might be some issue, Please try again!",
        icon: "error",
      });

      throw error;
    } finally {
      setFirebaseLoading(false);
    }
  };

  const authInfo = {
    user,
    firebaseLoading,
    handleCreateUser,
    handleLoginUser,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;