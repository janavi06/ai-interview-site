import {
  NavLink,
  useNavigate,
} from "react-router-dom";

import useAuthStore
from "../../store/authStore";

const Navbar =
() => {

  const navigate =
    useNavigate();

  const logout =
    useAuthStore(
      (state) =>
        state.logout
    );

  const user =
    useAuthStore(
      (state) =>
        state.user
    );

  const handleLogout =
    () => {

      logout();

      navigate(
        "/login"
      );
    };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">

      <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">

        {/* Logo */}

        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() =>
            navigate(
              "/dashboard"
            )
          }
        >

          <div className="w-11 h-11 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-bold text-lg shadow-md">

            AI

          </div>

          <div>

            <h1 className="font-bold text-xl">

              Mock Interview

            </h1>

            <p className="text-xs text-gray-500">

              AI Powered

            </p>

          </div>

        </div>

        {/* Navigation */}

        <div className="hidden md:flex items-center gap-3">

          <NavLink
            to="/dashboard"

            className={(
              {
                isActive,
              }
            ) =>
              `px-5 py-2 rounded-2xl font-medium transition ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`
            }
          >

            Dashboard

          </NavLink>

          <NavLink
            to="/history"

            className={(
              {
                isActive,
              }
            ) =>
              `px-5 py-2 rounded-2xl font-medium transition ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`
            }
          >

            History

          </NavLink>

          <NavLink
            to="/profile"

            className={(
              {
                isActive,
              }
            ) =>
              `px-5 py-2 rounded-2xl font-medium transition ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`
            }
          >

            Profile

          </NavLink>

        </div>

        {/* User Section */}

        <div className="flex items-center gap-4">

          <div className="hidden sm:block text-right">

            <p className="font-semibold">

              {
              user?.fullName
              ||
              "User"
              }

            </p>

            <p className="text-sm text-gray-500">

              Candidate

            </p>

          </div>

          <div className="w-11 h-11 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center">

            {
            user
            ?.fullName
            ?.charAt(0)
            ?.toUpperCase()
            ||
            "U"
            }

          </div>

          <button
            onClick={
              handleLogout
            }

            className="bg-red-50 text-red-600 px-4 py-2 rounded-2xl hover:bg-red-100 transition font-medium"
          >

            Logout

          </button>

        </div>

      </div>
    </nav>
  );
};

export default
Navbar;