import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SignIn from "./SignIn";
import LogIn from "./LogIn";

export default function SignInPage() {
  const location = useLocation();
  const navigate = useNavigate();

  // Determine the tab based on the current path
  // Default: if '/', fall back to LogIn
  const getActiveFromPath = (path) => {
    if (path === "/user/signup") return "SignIn";
    return "LogIn";
  };

  const [active, setActive] = useState(getActiveFromPath(location.pathname));

  // Update tab state if path updates (back/forward in browser)
  useEffect(() => {
    setActive(getActiveFromPath(location.pathname));
  }, [location.pathname]);

  // Clicking tab: update local state AND update the URL (but don't remount)
  const handleTab = (tab) => {
    setActive(tab);
    if (tab === "SignIn") navigate("/user/signup", { replace: false });
    else navigate("/user/login", { replace: false });
  };

  return (
    <div className="flex min-h-screen justify-center px-4 pt-10 lg:px-8 bg-gray-200">
      <div className="h-max w-fit px-24 py-12 bg-indigo-100 justify-self-center self-center">
        <div className="grid grid-cols-2 overflow-hidden border border-solid border-gray-200 shadow-sm sm:mx-auto sm:w-full sm:max-w-sm">
          {/* Log In Tab */}
          <button
            onClick={() => handleTab("LogIn")}
            aria-pressed={active === "LogIn"}
            className={`p-5 text-center transition-all duration-200 focus:outline ${
              active === "LogIn"
                ? "bg-gray-800 text-white scale-[1.02]"
                : "bg-white text-gray-700 hover:bg-gray-50"
            }`}
          >
            Log In
          </button>
          {/* Sign Up Tab */}
          <button
            onClick={() => handleTab("SignIn")}
            aria-pressed={active === "SignIn"}
            className={`p-5 text-center transition-all duration-200 focus:outline ${
              active === "SignIn"
                ? "bg-gray-800 text-white scale-[1.02]"
                : "bg-white text-gray-700 hover:bg-gray-50"
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* Content panel showing the active world */}
        {active === "LogIn" ? <LogIn /> : <SignIn />}
      </div>
    </div>
  );
}
