import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { forgotPassword } from "../store/slices/authSlice";
import {
  Mail,
  ArrowLeft,
  LockKeyhole,
  ShieldCheck,
} from "lucide-react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(forgotPassword({ email }));
    setEmail("");
  };

  const { user, isAuthenticated, loading } = useSelector(
    (state) => state.auth
  );

  if (isAuthenticated && user.role === "Admin") {
    return <Navigate to="/" />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-100 px-4 py-8">

      {/* ================= MAIN CARD ================= */}
      <div className="w-full max-w-md">

        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">

          {/* ================= TOP SECTION ================= */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-8 text-center text-white">

            <div className="mx-auto w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-4">
              <LockKeyhole size={30} />
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold">
              Forgot Password?
            </h2>

            <p className="text-blue-100 text-sm mt-2 max-w-xs mx-auto">
              No worries! Enter your email and we'll send you a link to reset
              your password.
            </p>
          </div>

          {/* ================= FORM SECTION ================= */}
          <div className="p-6 sm:p-8">

            <form onSubmit={handleSubmit} className="space-y-5">

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
                    type="email"
                    name="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="Enter your email"
                    className="w-full pl-11 pr-4 py-3.5 border border-gray-200 rounded-xl bg-gray-50 text-gray-800 placeholder-gray-400 outline-none transition focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  />

                </div>
              </div>

              {/* ================= REMEMBER PASSWORD ================= */}
              <div className="flex justify-end">

                <Link
                  to="/login"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-600 hover:text-blue-700 hover:underline transition"
                >
                  <ArrowLeft size={15} />
                  Remember your password?
                </Link>

              </div>

              {/* ================= SUBMIT ================= */}
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3.5 shadow-md hover:shadow-lg active:scale-[0.99] transition-all disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Sending reset link...</span>
                  </>
                ) : (
                  <>
                    <Mail size={19} />
                    <span>Send Reset Link</span>
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
                  Secure Password Reset
                </p>

                <p className="text-xs text-blue-600 mt-1 leading-relaxed">
                  We'll send a secure password reset link to your registered
                  email address.
                </p>
              </div>

            </div>

          </div>
        </div>

        {/* ================= BACK TO LOGIN ================= */}
        <div className="text-center mt-5">
          <Link
            to="/login"
            className="text-sm text-gray-500 hover:text-gray-700 transition"
          >
            ← Back to Login
          </Link>
        </div>

      </div>
    </div>
  );
};

export default ForgotPassword;