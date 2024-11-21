import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithPopup,
  GoogleAuthProvider,
  auth,
} from "../services/firebase"; 

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignup, setIsSignup] = useState(false); 
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please fill in both email and password.");
      return;
    }
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Logged in successfully");
      navigate("/products"); 
    } catch (error: any) {
      console.error(error);
      alert("Login failed: " + error.message);
    }
  };

  const handleSignup = async () => {
    if (!email || !password) {
      alert("Please fill in both email and password.");
      return;
    }
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Account created successfully");
      navigate("/products"); 
    } catch (error: any) {
      console.error(error);
      alert("Signup failed: " + error.message); 
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      alert("Please enter your email to reset your password.");
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      alert("Password reset email sent. Please check your inbox.");
    } catch (error: any) {
      console.error(error);
      alert("Error sending password reset email: " + error.message);
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      alert("Logged in with Google successfully");
      navigate("/products"); 
    } catch (error: any) {
      console.error(error);
      alert("Google Login failed: " + error.message); 
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-sm">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">
          {isSignup ? "Create Account" : "Welcome Back"}
        </h1>
        <p className="text-lg text-gray-600 text-center mb-6">
          {isSignup ? "Sign up to continue shopping" : "Login to continue shopping"}
        </p>

        <div className="space-y-4">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            onClick={isSignup ? handleSignup : handleLogin}
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-md text-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {isSignup ? "Sign Up" : "Login"}
          </button>

          <button
            onClick={handleGoogleLogin}
            className="w-full py-3 bg-red-500 text-white font-semibold rounded-md text-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 mt-4 flex items-center justify-center gap-2"
          >
            <img
              src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
              alt="Google"
              className="w-6 h-6"
            />
            Login with Google
          </button>
        </div>

        <div className="mt-6 text-center">
          {isSignup ? (
            <p
              onClick={() => setIsSignup(false)} 
              className="text-blue-500 cursor-pointer text-sm underline mb-2 hover:text-blue-600"
            >
              Already have an account? Login
            </p>
          ) : (
            <>
              <p
                onClick={handleForgotPassword}
                className="text-blue-500 cursor-pointer text-sm underline mb-2 hover:text-blue-600"
              >
                Forgot Password?
              </p>
              <p className="text-sm text-gray-600">
                Don't have an account?{" "}
                <span
                  onClick={() => setIsSignup(true)} 
                  className="text-blue-500 cursor-pointer hover:text-blue-600"
                >
                  Sign up
                </span>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
