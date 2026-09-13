import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { login } from "../store/slices/authSlice";
import {
  Mail,
  LockKeyhole,
  Eye,
  EyeOff,
  LogIn,
  ShieldCheck,
} from "lucide-react";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const dispatch = useDispatch();

  const handleLogin = (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("email", formData.email);
    data.append("password", formData.password);

    dispatch(login(data));
  };

  const { user, isAuthenticated, loading } = useSelector(
    (state) => state.auth
  );

  if (isAuthenticated && user.role === "Admin") {
    return <Navigate to="/" />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-100 px-4 py-8">

      {/* ================= MAIN CONTAINER ================= */}
      <div className="w-full max-w-md">

        {/* ================= LOGIN CARD ================= */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">

          {/* ================= HEADER ================= */}
          <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 px-6 py-8 text-center text-white">

            <div className="mx-auto w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-4">
              <LogIn size={30} />
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold">
              Welcome Back
            </h2>

            <p className="text-blue-100 text-sm mt-2">
              Sign in to continue to your account
            </p>
          </div>

          {/* ================= FORM ================= */}
          <div className="p-6 sm:p-8">

            <form onSubmit={handleLogin} className="space-y-5">

              {/* ================= EMAIL ================= */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Email Address
                </label>

                <div className="relative">

                  <Mail
                    size={19}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                  />

                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="Enter your email"
                    className="w-full pl-11 pr-4 py-3.5 border border-gray-200 rounded-xl bg-gray-50 text-gray-800 placeholder-gray-400 outline-none transition focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  />

                </div>
              </div>

              {/* ================= PASSWORD ================= */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Password
                </label>

                <div className="relative">

                  <LockKeyhole
                    size={19}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                  />

                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    placeholder="Enter your password"
                    className="w-full pl-11 pr-12 py-3.5 border border-gray-200 rounded-xl bg-gray-50 text-gray-800 placeholder-gray-400 outline-none transition focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
                    aria-label={
                      showPassword
                        ? "Hide password"
                        : "Show password"
                    }
                  >
                    {showPassword ? (
                      <EyeOff size={19} />
                    ) : (
                      <Eye size={19} />
                    )}
                  </button>

                </div>
              </div>

              {/* ================= REMEMBER + FORGOT ================= */}
              <div className="flex justify-between items-center gap-3 text-sm">

                <label
                  htmlFor="remember"
                  className="flex items-center gap-2 text-gray-600 cursor-pointer select-none"
                >
                  <input
                    type="checkbox"
                    id="remember"
                    className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />

                  <span>Remember me</span>
                </label>

                <Link
                  to="/password/forgot"
                  className="text-blue-600 font-medium hover:text-blue-700 hover:underline transition"
                >
                  Forgot Password?
                </Link>

              </div>

              {/* ================= LOGIN BUTTON ================= */}
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3.5 shadow-md hover:shadow-lg active:scale-[0.99] transition-all disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Signing In...</span>
                  </>
                ) : (
                  <>
                    <LogIn size={19} />
                    <span>Sign In</span>
                  </>
                )}
              </button>

            </form>

            {/* ================= SECURITY INFO ================= */}
            <div className="mt-6 flex items-start gap-3 bg-blue-50 border border-blue-100 rounded-xl p-4">

              <div className="shrink-0 mt-0.5">
                <ShieldCheck
                  size={19}
                  className="text-blue-600"
                />
              </div>

              <div>
                <p className="text-sm font-semibold text-blue-800">
                  Secure Login
                </p>

                <p className="text-xs text-blue-600 mt-1 leading-relaxed">
                  Your account information is protected with secure
                  authentication.
                </p>
              </div>

            </div>

          </div>
        </div>

        {/* ================= FOOTER ================= */}
        <p className="text-center text-sm text-gray-500 mt-5">
          Welcome to{" "}
          <span className="font-semibold text-gray-700">
            AJ Shopping
          </span>
        </p>

      </div>
    </div>
  );
};

export default Login;