import React, { useState } from "react";
import { auth } from "../firebase";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

const SignIn = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const loginHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Signed in successfully!");
      navigate("/ai");
    } catch (error) {
      toast.error(error.message.replace("Firebase:", ""));
    }
    setLoading(false);
  };

  const googleHandler = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      toast.success("Signed in with Google!");
      navigate("/ai");
    } catch (error) {
      toast.error(error.message.replace("Firebase:", ""));
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white p-8 shadow-lg rounded-xl">

        <h1 className="text-2xl font-semibold text-center mb-4">
          Welcome Back 👋
        </h1>
        <p className="text-gray-500 text-center mb-6">
          Sign in to continue
        </p>

        <form onSubmit={loginHandler}>

          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 border rounded-lg mb-3 outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 border rounded-lg mb-3 outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg mt-3 hover:bg-blue-700 transition"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>

        </form>

        <div className="text-center mt-4">
          <button
            onClick={googleHandler}
            className="w-full border py-3 rounded-lg flex items-center justify-center gap-3 hover:bg-gray-100 transition"
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              className="w-5"
              alt="Google logo"
            />
            Sign in with Google
          </button>
        </div>

        {/* 🔹 Sign Up Link */}
        <p className="text-center mt-5 text-sm text-gray-600">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-blue-600 font-medium hover:underline">
            Create one
          </Link>
        </p>

      </div>
    </div>
  );
};

export default SignIn;