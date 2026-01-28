import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../app/features/authSlice";
import {toast} from "react-hot-toast";
import api from "../configs/api"; 

const Login = () => {
  const query = new URLSearchParams(window.location.search);
  const urlState = query.get("state");
  const [state, setState] = useState(urlState || "login");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [dark, setDark] = useState(false);
  const [passwordValid, setPasswordValid] = useState({
    length: false,
    capital: false,
    number: false,
    special: false,
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "password") {
      setPasswordValid({
        length: value.length >= 8 && value.length <= 10,
        capital: /[A-Z]/.test(value),
        number: /\d/.test(value),
        special: /[!@#$%^&*(),.?":{}|<>]/.test(value),
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!formData.email.includes("@")) {
      setError("Enter a valid email");
      setLoading(false);
      return;
    }

    if (
      state !== "login" &&
      (!passwordValid.length ||
        !passwordValid.capital ||
        !passwordValid.number ||
        !passwordValid.special)
    ) {
      setError("Password does not meet requirements");
      setLoading(false);
      return;
    }

    try {
      let response;

      if (state === "login") {
        response = await api.post("/api/users/login", {
          email: formData.email,
          password: formData.password,
        });
      } else {
        response = await api.post("/api/users/register", {
          name: formData.name,
          email: formData.email,
          password: formData.password,
        });
      }

      const data = response.data; // { token, user }

      // Save token to sessionStorage (clears when browser closes)
      sessionStorage.setItem("token", data.token);

      // Dispatch to Redux
      dispatch(
        login({
          token: data.token,
          user: data.user,
        })
      );

      if (state === "login") {
        toast.success("Successfully logged in!");
      } else {
        toast.success("Account created successfully!");
      }
      setLoading(false);
      navigate("/app", { replace: true });
    } catch (err) {
      console.error(err.response?.data || err.message);
      setError(err.response?.data?.message || "Something went wrong");
      setLoading(false);
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen overflow-hidden">
      {/* Animated Glowing Background */}
      <div
        className={`absolute inset-0 -z-10 transition-colors duration-700 ${
          dark
            ? "bg-gradient-to-tr from-indigo-950 via-purple-950 to-teal-950"
            : "bg-gradient-to-tr from-indigo-50 via-purple-50 to-teal-50"
        }`}
      >
        <div className="absolute w-96 h-96 rounded-full bg-indigo-700 opacity-30 blur-3xl animate-blob top-10 left-10"></div>
        <div className="absolute w-72 h-72 rounded-full bg-pink-600 opacity-20 blur-2xl animate-blob animation-delay-2000 top-32 right-20"></div>
        <div className="absolute w-80 h-80 rounded-full bg-purple-700 opacity-20 blur-2xl animate-blob animation-delay-4000 bottom-20 left-16"></div>
      </div>

      {/* Dark / Light Toggle */}
      <button
        onClick={() => setDark(!dark)}
        className={`absolute top-6 right-6 px-4 py-2 rounded-full text-sm shadow-lg transition z-20 ${
          dark
            ? "bg-indigo-600 text-white hover:bg-indigo-500"
            : "bg-indigo-500 text-white hover:bg-indigo-600"
        }`}
      >
        {dark ? "Light Mode" : "Dark Mode"}
      </button>

      <AnimatePresence>
        <motion.form
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleSubmit}
          className={`relative w-full max-w-md rounded-3xl px-8 py-10 border backdrop-blur-xl transition-all duration-700 z-10 ${
            dark
              ? "bg-white/5 border-white/20 shadow-2xl shadow-indigo-500/40"
              : "bg-white/50 border-gray-200 shadow-2xl"
          }`}
        >
          {/* Glowing Card */}
          {dark && (
            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 blur-xl opacity-30 -z-10"></div>
          )}

          {/* Logo */}
          <div className="flex justify-center mb-6 relative z-20">
            <div
              className={`h-16 w-16 rounded-xl flex items-center justify-center font-bold text-lg shadow-lg transition ${
                dark
                  ? state === "login"
                    ? "bg-blue-500 text-white shadow-blue-500/50"
                    : "bg-pink-500 text-white shadow-pink-500/50"
                  : state === "login"
                  ? "bg-indigo-500 text-white shadow-indigo-500/50"
                  : "bg-purple-500 text-white shadow-purple-500/50"
              }`}
            >
              {state === "login" ? "Login" : "Sign Up"}
            </div>
          </div>

          {/* Header */}
          <h1
            className={`text-3xl font-semibold text-center transition relative z-10 ${
              dark ? "text-white drop-shadow-lg" : "text-gray-900"
            }`}
          >
            {state === "login"
              ? "Sign in to your account"
              : "Create your account"}
          </h1>
          <p
            className={`text-sm mt-2 text-center transition relative z-10 ${
              dark ? "text-gray-300" : "text-gray-500"
            }`}
          >
            Welcome back — let's continue
          </p>

          {/* Name (Sign Up) */}
          {state !== "login" && (
            <div className="relative mt-6 z-10">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className={`peer w-full h-11 px-4 rounded-lg border bg-transparent outline-none transition ${
                  dark
                    ? "border-white/20 text-white focus:border-pink-400"
                    : "border-gray-300 text-gray-800 focus:border-indigo-500"
                }`}
                placeholder="Full Name"
              />
            </div>
          )}

          {/* Email */}
          <div className="relative mt-4 z-10">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className={`w-full h-11 px-4 rounded-lg border bg-transparent outline-none transition ${
                dark
                  ? "border-white/20 text-white focus:border-blue-400"
                  : "border-gray-300 text-gray-800 focus:border-indigo-500"
              }`}
              placeholder="Email Address"
            />
          </div>

          {/* Password */}
          <div className="relative mt-4 z-10">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className={`w-full h-11 px-4 pr-12 rounded-lg border bg-transparent outline-none transition ${
                dark
                  ? "border-white/20 text-white focus:border-purple-400"
                  : "border-gray-300 text-gray-800 focus:border-indigo-500"
              }`}
              placeholder="Password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-xs text-indigo-400 hover:text-indigo-300"
            >
              {showPassword ? "Hide" : "Show"}
            </button>

            {/* Password Requirements */}
            {state !== "login" && (
              <div className="mt-2 text-xs text-gray-300">
                <p className={passwordValid.length ? "text-green-400" : "text-red-400"}>8-10 characters</p>
                <p className={passwordValid.capital ? "text-green-400" : "text-red-400"}>1 uppercase letter</p>
                <p className={passwordValid.number ? "text-green-400" : "text-red-400"}>1 number</p>
                <p className={passwordValid.special ? "text-green-400" : "text-red-400"}>1 special character</p>
              </div>
            )}
          </div>

          {/* Error */}
          {error && <p className="text-red-500 text-sm mt-3 z-10 relative">{error}</p>}

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            disabled={loading}
            type="submit"
            className={`mt-6 w-full h-11 rounded-lg text-white font-medium transition flex items-center justify-center shadow-lg ${
              dark
                ? "bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:shadow-lg hover:shadow-pink-500/50"
                : "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:shadow-lg hover:shadow-purple-500/50"
            }`}
          >
            {loading ? (
              <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span>
            ) : state === "login" ? "Sign in" : "Sign Up"}
          </motion.button>

          {/* Toggle Login/Sign Up */}
          <p className={`text-sm mt-6 text-center z-10 relative transition ${dark ? "text-gray-300" : "text-gray-600"}`}>
            {state === "login" ? "Don’t have an account?" : "Already have an account?"}{" "}
            <span
              onClick={() => setState(state === "login" ? "register" : "login")}
              className={`ml-1 font-medium underline cursor-pointer transition ${dark ? "hover:text-white" : "hover:text-indigo-500"}`}
            >
              Click here
            </span>
          </p>
        </motion.form>
      </AnimatePresence>
    </div>
  );
};

export default Login;
