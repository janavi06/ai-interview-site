import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import {
  FiMail,
  FiLock,
  FiUser,
} from "react-icons/fi";
import useAuthStore from "../../store/authStore";

const Register = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const registerUser = useAuthStore(
    (state) => state.register
  );

  const loading = useAuthStore(
    (state) => state.loading
  );

  const onSubmit = async (data) => {
    const result =
      await registerUser(data);

    if (result.success) {
      toast.success(
        "Registration Successful"
      );

      navigate("/dashboard");
    } else {
      toast.error(
        result?.message ||
          "Something went wrong"
      );
    }
  };

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      {/* Top Blue Section */}
      <div className="relative bg-[#1976ff] h-[38vh] overflow-hidden">
        {/* Decorative Circle */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-blue-400 rounded-full opacity-20" />

        {/* Curved Shape */}
        <div className="absolute -bottom-24 left-0 w-[120%] h-56 bg-white rounded-[100%]" />

        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="relative z-10 px-8 pt-16 text-white"
        >
          <p className="text-sm opacity-80">
            Create your account
          </p>

          <h1 className="text-5xl font-bold mt-2">
            Sign Up
          </h1>
        </motion.div>
      </div>

      {/* Form Section */}
      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        className="relative z-20 px-6 md:px-10 max-w-md mx-auto -mt-10"
      >
        <form
          onSubmit={handleSubmit(
            onSubmit
          )}
          className="space-y-5"
        >
          {/* Full Name */}
          <div>
            <label className="text-gray-700 font-medium">
              Full Name
            </label>

            <div className="relative mt-2">
              <FiUser className="absolute left-4 top-4 text-gray-400 text-lg" />

              <input
                type="text"
                placeholder="Enter your name"
                className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-4 pl-12 pr-4 outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition"
                {...register(
                  "fullName",
                  {
                    required:
                      "Full name required",
                  }
                )}
              />
            </div>

            {errors.fullName && (
              <p className="text-red-500 text-sm mt-1">
                {
                  errors.fullName
                    .message
                }
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="text-gray-700 font-medium">
              Email Address
            </label>

            <div className="relative mt-2">
              <FiMail className="absolute left-4 top-4 text-gray-400 text-lg" />

              <input
                type="email"
                placeholder="Enter email"
                className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-4 pl-12 pr-4 outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition"
                {...register(
                  "email",
                  {
                    required:
                      "Email required",
                  }
                )}
              />
            </div>

            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {
                  errors.email
                    .message
                }
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="text-gray-700 font-medium">
              Password
            </label>

            <div className="relative mt-2">
              <FiLock className="absolute left-4 top-4 text-gray-400 text-lg" />

              <input
                type="password"
                placeholder="Enter password"
                className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-4 pl-12 pr-4 outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition"
                {...register(
                  "password",
                  {
                    required:
                      "Password required",
                    minLength: {
                      value: 6,
                      message:
                        "Minimum 6 characters",
                    },
                  }
                )}
              />
            </div>

            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {
                  errors.password
                    .message
                }
              </p>
            )}
          </div>

          {/* Register Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#1976ff] text-white py-4 rounded-2xl font-semibold text-lg hover:bg-blue-700 transition"
          >
            {loading
              ? "Creating..."
              : "Create Account"}
          </button>
        </form>

        {/* Footer */}
        <p className="text-center mt-6 text-gray-500">
          Already have an account?
          <Link
            to="/login"
            className="text-blue-600 font-semibold ml-1"
          >
            Login
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Register;