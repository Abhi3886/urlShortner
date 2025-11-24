import { useState } from "react";

export default function SignIn() {
  const [hearAbout, setHearAbout] = useState(""); // Dropdown value
  const [otherText, setOtherText] = useState(""); // Other (explain) value

  return (
    <>
      {/*
        This SignIn requires updating your template:

        ```
        <html class="h-full bg-gray-900">
        <body class="h-full">
        ```
      */}

      <div className="mt-12 sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-black mb-10">
          Sign in to your account
        </h2>

        <form action="#" method="POST" className="space-y-6">
          <div className="flex flex-row gap-x-[8rem] ">
            {/* First Name */}
            <div>
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-gray-700"
              >
                First Name
              </label>
              <div className="mt-2">
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  required
                  autoComplete="given-name"
                  className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-slate-900 outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm"
                  placeholder="John"
                />
              </div>
            </div>

            {/* Last Name */}
            <div>
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-gray-700"
              >
                Last Name
              </label>
              <div className="mt-2">
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  required
                  autoComplete="family-name"
                  className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-slate-900 outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm"
                  placeholder="Doe"
                />
              </div>
            </div>
          </div>

          {/* Mobile */}
          <div>
            <label
              htmlFor="mobile"
              className="block text-sm font-medium text-gray-700"
            >
              Mobile Number
            </label>
            <div className="mt-2">
              <input
                id="mobile"
                name="mobile"
                type="tel"
                required
                autoComplete="tel"
                className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-slate-900 outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm"
                placeholder="+91 9876543210"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-slate-900 outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm"
                placeholder="you@example.com"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="new-password"
                className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-slate-900 outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm"
                placeholder="At least 8 characters"
              />
            </div>
          </div>

          {/* How did you hear about us? */}
          <div>
            <label
              htmlFor="hearAbout"
              className="block text-sm font-medium text-gray-700"
            >
              How did you hear about us?
            </label>
            <div className="mt-2">
              <select
                id="hearAbout"
                name="hearAbout"
                required
                value={hearAbout}
                onChange={(e) => setHearAbout(e.target.value)}
                className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-slate-900 outline-1 -outline-offset-1 outline-white/10 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm"
              >
                <option value="" disabled>
                  Select an option
                </option>
                <option value="Google">Google</option>
                <option value="Friend">Friend</option>
                <option value="Social Media">Social Media</option>
                <option value="Advertisement">Advertisement</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          {/* If Other is chosen, show textarea */}
          {hearAbout === "Other" && (
            <div>
              <label
                htmlFor="otherHow"
                className="block text-sm font-medium text-gray-700"
              >
                Please specify (up to 256 characters)
              </label>
              <div className="mt-2">
                <textarea
                  id="otherHow"
                  name="otherHow"
                  rows={3}
                  maxLength={256}
                  value={otherText}
                  onChange={(e) => setOtherText(e.target.value)}
                  className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-slate-900 outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm"
                  placeholder="Describe how you heard about us..."
                />
                <p className="text-right text-xs text-gray-400">
                  {otherText.length} / 256 characters
                </p>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="flex w-50% justify-self-center w-[40%] justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
