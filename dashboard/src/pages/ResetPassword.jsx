import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useParams } from "react-router-dom";
import { resetPassword } from "../store/slices/authSlice";
import {
  LockKeyhole,
  Eye,
  EyeOff,
  ShieldCheck,
  KeyRound,
  CheckCircle2,
  XCircle,
} from "lucide-react";

const ResetPassword = () => {
  const { token } = useParams();

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("password", formData.password);
    data.append("confirmPassword", formData.confirmPassword);

    dispatch(resetPassword(data, token));
  };

  const { user, isAuthenticated, loading } = useSelector(
    (state) => state.auth
  );

  if (isAuthenticated && user.role === "Admin") {
    return <Navigate to="/" />;
  }

  const passwordsMatch =
    formData.password &&
    formData.confirmPassword &&
    formData.password === formData.confirmPassword;

  const passwordsNotMatch =
    formData.password &&
    formData.confirmPassword &&
    formData.password !== formData.confirmPassword;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-100 px-4 py-8">

      {/* ================= MAIN CONTAINER ================= */}
      <div className="w-full max-w-md">

        {/* ================= CARD ================= */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">

          {/* ================= HEADER ================= */}
          <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 px-6 py-8 text-center text-white">

            <div className="mx-auto w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-4">
              <KeyRound size={30} />
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold">
              Reset Password
            </h2>

            <p className="text-blue-100 text-sm mt-2 max-w-xs mx-auto">
              Create a new secure password for your account.
            </p>
          </div>

          {/* ================= FORM SECTION ================= */}
          <div className="p-6 sm:p-8">

            <form onSubmit={handleSubmit} className="space-y-5">

              {/* ================= NEW PASSWORD ================= */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  New Password
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
                    placeholder="Enter your new password"
                    className="w-full pl-11 pr-12 py-3.5 border border-gray-200 rounded-xl bg-gray-50 text-gray-800 placeholder-gray-400 outline-none transition focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(!showPassword)
                    }
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

              {/* ================= CONFIRM PASSWORD ================= */}
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Confirm Password
                </label>

                <div className="relative">

                  <LockKeyhole
                    size={19}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                  />

                  <input
                    id="confirmPassword"
                    type={
                      showConfirmPassword ? "text" : "password"
                    }
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    placeholder="Confirm your new password"
                    className={`w-full pl-11 pr-12 py-3.5 border rounded-xl bg-gray-50 text-gray-800 placeholder-gray-400 outline-none transition focus:bg-white focus:ring-4 ${passwordsNotMatch
                      ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                      : passwordsMatch
                        ? "border-green-400 focus:border-green-500 focus:ring-green-100"
                        : "border-gray-200 focus:border-blue-500 focus:ring-blue-100"
                      }`}
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword(
                        !showConfirmPassword
                      )
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
                    aria-label={
                      showConfirmPassword
                        ? "Hide password"
                        : "Show password"
                    }
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={19} />
                    ) : (
                      <Eye size={19} />
                    )}
                  </button>

                </div>

                {/* ================= PASSWORD MATCH STATUS ================= */}
                {passwordsMatch && (
                  <div className="flex items-center gap-1.5 mt-2 text-xs font-medium text-green-600">
                    <CheckCircle2 size={14} />
                    Passwords match
                  </div>
                )}

                {passwordsNotMatch && (
                  <div className="flex items-center gap-1.5 mt-2 text-xs font-medium text-red-600">
                    <XCircle size={14} />
                    Passwords do not match
                  </div>
                )}
              </div>

              {/* ================= RESET BUTTON ================= */}
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3.5 shadow-md hover:shadow-lg active:scale-[0.99] transition-all disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />

                    <span>
                      Resetting Password...
                    </span>
                  </>
                ) : (
                  <>
                    <KeyRound size={19} />

                    <span>
                      Reset Password
                    </span>
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
                  Keep your account secure
                </p>

                <p className="text-xs text-blue-600 mt-1 leading-relaxed">
                  Use a strong password that you don't use on other
                  websites.
                </p>
              </div>

            </div>

          </div>
        </div>

        {/* ================= FOOTER ================= */}
        <p className="text-center text-sm text-gray-500 mt-5">
          Secure password recovery •{" "}
          <span className="font-semibold text-gray-700">
            AJ Shopping
          </span>
        </p>

      </div>
    </div>
  );
};

export default ResetPassword;