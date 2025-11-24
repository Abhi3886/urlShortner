import React, { useState } from "react";
import * as yup from "yup";
import { ClipLoader } from "react-spinners";

const serverEndpoint = "http://localhost:8001";

const logInSchema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(
      /[@$!%*#?&^_.,\-]/,
      "Password must contain at least one special character"
    ),
});

export default function LogIn() {
  const [formData, setFormData] = useState({ email: "", password: "" });

  // field validation errors (email/password)
  const [errors, setErrors] = useState({});

  // global response message
  const [responseMsg, setResponseMsg] = useState("");

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    // clear that specific field's error
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResponseMsg("");
    setErrors({});

    try {
      // client-side validation
      await logInSchema.validate(formData, { abortEarly: false });

      const res = await fetch(serverEndpoint + window.location.pathname, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        const result = await res.json();
        setResponseMsg("Login successful: " + JSON.stringify(result));
        setErrors({});
      } else {
        const error = await res.text();
        setResponseMsg("Server error: " + error);
      }
    } catch (err) {
      if (err.inner && Array.isArray(err.inner)) {
        // yup validation error: convert to { field: "message" }
        const errObj = {};
        err.inner.forEach((e) => {
          errObj[e.path] = e.message;
        });
        setErrors(errObj);
      } else {
        // unexpected error
        setResponseMsg("Validation error: " + err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  // detect global error or success
  const hasValidationErrors = Object.keys(errors).some(
    (key) => errors[key] !== ""
  );

  const isGlobalError =
    responseMsg.startsWith("Server error") ||
    responseMsg.startsWith("Validation error");

  const isErrorState = hasValidationErrors || isGlobalError;

  return (
    <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-sm">
      <h2 className="text-center text-2xl font-bold tracking-tight text-gray-700 mb-2">
        Log In to your account
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6 text-black">
        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-2 block w-full rounded-md bg-white px-3 py-1.5 text-sm placeholder:text-gray-500 focus:outline-indigo-500"
            placeholder="you@example.com"
          />
          {errors.email && (
            <p className="text-xs text-red-500 mt-1">{errors.email}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <div className="flex items-center justify-between">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <a
              href="#"
              className="text-sm font-semibold text-indigo-400 hover:text-indigo-300"
            >
              Forgot password?
            </a>
          </div>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            value={formData.password}
            onChange={handleChange}
            className="mt-2 block w-full rounded-md bg-white px-3 py-1.5 text-sm placeholder:text-gray-500 focus:outline-indigo-500"
            placeholder="At least 8 chars, uppercase, number, special char"
          />
          {errors.password && (
            <p className="text-xs text-red-500 mt-1">{errors.password}</p>
          )}
        </div>

        {/* Button */}
        <button
          type="submit"
          className="flex justify-center w-[40%] mx-auto rounded-md bg-indigo-500 px-3 py-1.5 text-sm font-semibold text-white hover:bg-indigo-400"
        >
          Log In
        </button>

        {/* Response / Loader */}
        <div
          className={`
            mt-4 text-center text-sm min-h-[32px] flex items-center justify-center
            transition-all duration-300
            ${isErrorState ? "text-red-600" : "text-indigo-700"}
        `}
        >
          {loading ? (
            <ClipLoader
              size={28}
              color={isErrorState ? "#dc2626" : "#6366f1"}
            />
          ) : (
            responseMsg && <span className="animate-fadeIn">{responseMsg}</span>
          )}
        </div>
      </form>
    </div>
  );
}
