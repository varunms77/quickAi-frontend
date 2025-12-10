import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const SignUp = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      await createUserWithEmailAndPassword(auth, email, password);

      toast.success("Account created successfully!");
      navigate("/ai"); // redirect to dashboard
    } catch (error) {
      toast.error(error.message.replace("Firebase:", ""));
    }
    setLoading(false);
  };

  return (
    <div className="h-screen flex justify-center items-center bg-gray-100">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-md p-6 bg-white shadow-lg rounded-lg border border-gray-200"
      >
        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-700">
          Create Account
        </h2>

        <label className="text-sm font-medium">Email</label>
        <input
          type="email"
          required
          className="w-full mt-1 mb-4 p-2 border rounded-md outline-none"
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <label className="text-sm font-medium">Password</label>
        <input
          type="password"
          required
          className="w-full mt-1 mb-4 p-2 border rounded-md outline-none"
          placeholder="Enter password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded-md mt-4"
        >
          {loading ? "Creating..." : "Sign Up"}
        </button>

        <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account?{" "}
          <Link to="/signin" className="text-blue-600 font-medium">
            Sign in
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignUp;