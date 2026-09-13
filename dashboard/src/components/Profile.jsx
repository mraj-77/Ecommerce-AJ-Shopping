import React, { useEffect, useState } from "react";
import defaultAvatar from "../assets/avatar.jpg";
import Header from "./Header";

import { useDispatch, useSelector } from "react-redux";

import {
  updateAdminPassword,
  updateAdminProfile,
} from "../store/slices/authSlice";

import {
  User,
  Mail,
  ShieldCheck,
  Camera,
  LockKeyhole,
  Eye,
  EyeOff,
  Save,
  KeyRound,
  CheckCircle2,
  Settings,
} from "lucide-react";

const Profile = () => {
  const { user, loading } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  // ================= PROFILE STATE =================

  const [editData, setEditData] = useState({
    name: user?.name || "",
    email: user?.email || "",
  });

  const [avatarFile, setAvatarFile] = useState(null);

  const [avatarPreview, setAvatarPreview] = useState(
    user?.avatar?.url || defaultAvatar
  );

  const [updatingSection, setUpdatingSection] = useState("");

  // ================= PASSWORD STATE =================

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  // ================= SYNC USER DATA =================

  useEffect(() => {
    if (user) {
      setEditData({
        name: user?.name || "",
        email: user?.email || "",
      });

      setAvatarPreview(
        user?.avatar?.url || defaultAvatar
      );
    }
  }, [user]);

  // ================= AVATAR =================

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setAvatarFile(file);

    const previewUrl = URL.createObjectURL(file);

    setAvatarPreview(previewUrl);
  };

  // ================= PROFILE INPUT =================

  const handleProfileChange = (e) => {
    const { name, value } = e.target;

    setEditData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ================= PASSWORD INPUT =================

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;

    setPasswordData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ================= UPDATE PROFILE =================

  const updateProfile = () => {
    const formData = new FormData();

    formData.append("name", editData.name);
    formData.append("email", editData.email);

    if (avatarFile) {
      formData.append("avatar", avatarFile);
    }

    setUpdatingSection("Profile");

    dispatch(updateAdminProfile(formData));
  };

  // ================= UPDATE PASSWORD =================

  const updatePassword = () => {
    const formData = new FormData();

    formData.append(
      "currentPassword",
      passwordData.currentPassword
    );

    formData.append(
      "newPassword",
      passwordData.newPassword
    );

    formData.append(
      "confirmNewPassword",
      passwordData.confirmNewPassword
    );

    setUpdatingSection("Password");

    dispatch(updateAdminPassword(formData));
  };

  // ================= PASSWORD VISIBILITY =================

  const togglePasswordVisibility = (field) => {
    setShowPasswords((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  // ================= PASSWORD MATCH =================

  const passwordsMatch =
    passwordData.newPassword &&
    passwordData.confirmNewPassword &&
    passwordData.newPassword ===
    passwordData.confirmNewPassword;

  return (
    <main className="min-h-screen w-full bg-slate-50 p-4 sm:p-5 md:pl-[17rem]">
      <div className="w-full max-w-[1200px] mx-auto">

        {/* =====================================================
            HEADER
        ====================================================== */}

        <Header />

        {/* =====================================================
            PAGE TITLE
        ====================================================== */}

        <section className="mb-7">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">

            {/* TITLE */}

            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-blue-600" />

                <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
                  Account Settings
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                Profile
              </h1>

              <p className="text-sm text-slate-500 mt-1">
                Manage your account information and security.
              </p>
            </div>

            {/* ACCOUNT STATUS */}

            <div className="flex items-center gap-3 bg-white border border-slate-200 rounded-2xl px-4 py-3 shadow-sm">

              <div className="w-9 h-9 rounded-xl bg-emerald-50 flex items-center justify-center">
                <ShieldCheck
                  size={19}
                  className="text-emerald-600"
                />
              </div>

              <div>
                <p className="text-[11px] text-slate-400 font-medium">
                  Account Status
                </p>

                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />

                  <p className="text-sm font-bold text-emerald-600">
                    Active
                  </p>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* =====================================================
            PROFILE OVERVIEW
        ====================================================== */}

        <section className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden mb-6">

          <div className="p-5 sm:p-7">

            <div className="flex flex-col sm:flex-row sm:items-center gap-6">

              {/* AVATAR */}

              <div className="relative shrink-0 self-center sm:self-auto">

                <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl overflow-hidden bg-slate-100 border-4 border-white ring-1 ring-slate-200 shadow-md">

                  <img
                    src={avatarPreview}
                    alt={user?.name || "Admin"}
                    className="w-full h-full object-cover"
                  />

                </div>

                {/* CAMERA BUTTON */}

                <label
                  htmlFor="profile-avatar"
                  title="Change profile picture"
                  className="
                    absolute
                    -right-2
                    -bottom-2
                    w-10
                    h-10
                    rounded-xl
                    bg-white
                    border
                    border-slate-200
                    shadow-md
                    flex
                    items-center
                    justify-center
                    text-blue-600
                    hover:bg-blue-50
                    hover:border-blue-200
                    cursor-pointer
                    transition-all
                    duration-200
                  "
                >
                  <Camera size={18} />

                  <input
                    id="profile-avatar"
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    className="hidden"
                  />
                </label>
              </div>

              {/* USER INFORMATION */}

              <div className="flex-1 text-center sm:text-left">

                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">

                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                    {user?.name || "Admin"}
                  </h2>

                  <span className="inline-flex w-fit mx-auto sm:mx-0 items-center gap-1.5 px-2.5 py-1 rounded-lg bg-blue-50 border border-blue-100 text-xs font-semibold text-blue-600">
                    <ShieldCheck size={13} />

                    {user?.role || "Admin"}
                  </span>
                </div>

                {/* EMAIL */}

                <div className="flex items-center justify-center sm:justify-start gap-2 mt-2 text-sm text-slate-500">
                  <Mail size={15} />

                  <span className="break-all">
                    {user?.email || "No email"}
                  </span>
                </div>

                {/* STATUS */}

                <div className="flex items-center justify-center sm:justify-start gap-2 mt-3">

                  <span className="relative flex w-2 h-2">
                    <span className="absolute inline-flex w-full h-full rounded-full bg-emerald-400 opacity-60 animate-ping" />

                    <span className="relative inline-flex w-2 h-2 rounded-full bg-emerald-500" />
                  </span>

                  <span className="text-xs font-semibold text-emerald-600">
                    Account is active
                  </span>
                </div>

                {/* IMAGE SELECTED */}

                {avatarFile && (
                  <div className="flex items-center justify-center sm:justify-start gap-1.5 mt-2 text-xs font-medium text-emerald-600">
                    <CheckCircle2 size={14} />

                    New profile picture selected
                  </div>
                )}

              </div>

            </div>
          </div>
        </section>

        {/* =====================================================
            PERSONAL INFORMATION
        ====================================================== */}

        <section className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden mb-6">

          {/* SECTION HEADER */}

          <div className="px-5 sm:px-7 py-5 border-b border-slate-100">

            <div className="flex items-center gap-3">

              <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                <User
                  size={19}
                  className="text-blue-600"
                />
              </div>

              <div>
                <h2 className="text-base font-bold text-slate-800">
                  Personal Information
                </h2>

                <p className="text-xs text-slate-400 mt-0.5">
                  Update your name, email and profile picture.
                </p>
              </div>

            </div>
          </div>

          {/* FORM */}

          <form
            onSubmit={(e) => {
              e.preventDefault();
              updateProfile();
            }}
            className="p-5 sm:p-7"
          >

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

              {/* NAME */}

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-2">
                  Full Name
                </label>

                <div className="relative">

                  <User
                    size={17}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type="text"
                    name="name"
                    value={editData.name}
                    onChange={handleProfileChange}
                    placeholder="Your Name"
                    autoComplete="name"
                    className="
                      w-full
                      h-11
                      pl-10
                      pr-4
                      bg-slate-50
                      border
                      border-slate-200
                      rounded-xl
                      text-sm
                      text-slate-700
                      outline-none
                      focus:bg-white
                      focus:border-blue-400
                      focus:ring-4
                      focus:ring-blue-50
                      transition-all
                    "
                  />

                </div>
              </div>

              {/* EMAIL */}

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-2">
                  Email Address
                </label>

                <div className="relative">

                  <Mail
                    size={17}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type="email"
                    name="email"
                    value={editData.email}
                    onChange={handleProfileChange}
                    placeholder="Your Email"
                    autoComplete="email"
                    className="
                      w-full
                      h-11
                      pl-10
                      pr-4
                      bg-slate-50
                      border
                      border-slate-200
                      rounded-xl
                      text-sm
                      text-slate-700
                      outline-none
                      focus:bg-white
                      focus:border-blue-400
                      focus:ring-4
                      focus:ring-blue-50
                      transition-all
                    "
                  />

                </div>
              </div>

            </div>

            {/* PROFILE IMAGE INFO */}

            <div className="mt-5">

              <div className="flex items-center gap-3 p-4 rounded-xl bg-slate-50 border border-slate-100">

                <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center shrink-0">
                  <Camera
                    size={18}
                    className="text-slate-500"
                  />
                </div>

                <div className="min-w-0">

                  <p className="text-xs font-bold text-slate-700">
                    Profile Picture
                  </p>

                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Use the camera button on your profile image to select a new picture.
                  </p>

                </div>

              </div>

            </div>

            {/* BUTTON */}

            <div className="flex justify-end mt-6">

              <button
                type="submit"
                disabled={loading}
                className="
                  w-full
                  sm:w-auto
                  flex
                  items-center
                  justify-center
                  gap-2
                  px-5
                  py-3
                  rounded-xl
                  bg-blue-600
                  hover:bg-blue-700
                  disabled:opacity-60
                  disabled:cursor-not-allowed
                  text-white
                  text-sm
                  font-semibold
                  shadow-sm
                  hover:shadow-md
                  transition-all
                  active:scale-[0.98]
                "
              >

                {loading &&
                  updatingSection === "Profile" ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />

                    Updating Profile...
                  </>
                ) : (
                  <>
                    <Save size={17} />

                    Update Profile
                  </>
                )}

              </button>

            </div>
          </form>
        </section>

        {/* =====================================================
            PASSWORD & SECURITY
        ====================================================== */}

        <section className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden mb-8">

          {/* SECTION HEADER */}

          <div className="px-5 sm:px-7 py-5 border-b border-slate-100">

            <div className="flex items-center gap-3">

              <div className="w-10 h-10 rounded-xl bg-violet-50 flex items-center justify-center">
                <LockKeyhole
                  size={19}
                  className="text-violet-600"
                />
              </div>

              <div>
                <h2 className="text-base font-bold text-slate-800">
                  Password & Security
                </h2>

                <p className="text-xs text-slate-400 mt-0.5">
                  Keep your administrator account secure.
                </p>
              </div>

            </div>
          </div>

          {/* PASSWORD FORM */}

          <form
            onSubmit={(e) => {
              e.preventDefault();
              updatePassword();
            }}
            className="p-5 sm:p-7"
          >

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

              {/* CURRENT PASSWORD */}

              <div className="md:col-span-2">

                <label className="block text-xs font-semibold text-slate-600 mb-2">
                  Current Password
                </label>

                <div className="relative">

                  <LockKeyhole
                    size={17}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type={
                      showPasswords.current
                        ? "text"
                        : "password"
                    }
                    name="currentPassword"
                    value={passwordData.currentPassword}
                    onChange={handlePasswordChange}
                    placeholder="Enter your current password"
                    autoComplete="current-password"
                    className="
                      w-full
                      h-11
                      pl-10
                      pr-11
                      bg-slate-50
                      border
                      border-slate-200
                      rounded-xl
                      text-sm
                      text-slate-700
                      outline-none
                      focus:bg-white
                      focus:border-violet-400
                      focus:ring-4
                      focus:ring-violet-50
                      transition-all
                    "
                  />

                  <button
                    type="button"
                    onClick={() =>
                      togglePasswordVisibility("current")
                    }
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 transition-colors"
                    aria-label={
                      showPasswords.current
                        ? "Hide current password"
                        : "Show current password"
                    }
                  >
                    {showPasswords.current ? (
                      <EyeOff size={17} />
                    ) : (
                      <Eye size={17} />
                    )}
                  </button>

                </div>
              </div>

              {/* NEW PASSWORD */}

              <div>

                <label className="block text-xs font-semibold text-slate-600 mb-2">
                  New Password
                </label>

                <div className="relative">

                  <KeyRound
                    size={17}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type={
                      showPasswords.new
                        ? "text"
                        : "password"
                    }
                    name="newPassword"
                    value={passwordData.newPassword}
                    onChange={handlePasswordChange}
                    placeholder="Enter new password"
                    autoComplete="new-password"
                    className="
                      w-full
                      h-11
                      pl-10
                      pr-11
                      bg-slate-50
                      border
                      border-slate-200
                      rounded-xl
                      text-sm
                      text-slate-700
                      outline-none
                      focus:bg-white
                      focus:border-violet-400
                      focus:ring-4
                      focus:ring-violet-50
                      transition-all
                    "
                  />

                  <button
                    type="button"
                    onClick={() =>
                      togglePasswordVisibility("new")
                    }
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 transition-colors"
                    aria-label={
                      showPasswords.new
                        ? "Hide new password"
                        : "Show new password"
                    }
                  >
                    {showPasswords.new ? (
                      <EyeOff size={17} />
                    ) : (
                      <Eye size={17} />
                    )}
                  </button>

                </div>
              </div>

              {/* CONFIRM PASSWORD */}

              <div>

                <label className="block text-xs font-semibold text-slate-600 mb-2">
                  Confirm New Password
                </label>

                <div className="relative">

                  <KeyRound
                    size={17}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type={
                      showPasswords.confirm
                        ? "text"
                        : "password"
                    }
                    name="confirmNewPassword"
                    value={
                      passwordData.confirmNewPassword
                    }
                    onChange={handlePasswordChange}
                    placeholder="Confirm new password"
                    autoComplete="new-password"
                    className="
                      w-full
                      h-11
                      pl-10
                      pr-11
                      bg-slate-50
                      border
                      border-slate-200
                      rounded-xl
                      text-sm
                      text-slate-700
                      outline-none
                      focus:bg-white
                      focus:border-violet-400
                      focus:ring-4
                      focus:ring-violet-50
                      transition-all
                    "
                  />

                  <button
                    type="button"
                    onClick={() =>
                      togglePasswordVisibility("confirm")
                    }
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 transition-colors"
                    aria-label={
                      showPasswords.confirm
                        ? "Hide confirm password"
                        : "Show confirm password"
                    }
                  >
                    {showPasswords.confirm ? (
                      <EyeOff size={17} />
                    ) : (
                      <Eye size={17} />
                    )}
                  </button>

                </div>
              </div>
            </div>

            {/* PASSWORD MATCH */}

            {passwordData.confirmNewPassword && (
              <div
                className={`
                  mt-4
                  flex
                  items-center
                  gap-2
                  text-xs
                  font-semibold
                  ${passwordsMatch
                    ? "text-emerald-600"
                    : "text-red-500"
                  }
                `}
              >
                <CheckCircle2 size={15} />

                {passwordsMatch
                  ? "New passwords match."
                  : "New passwords do not match."}
              </div>
            )}

            {/* SECURITY MESSAGE */}

            <div className="mt-6 flex gap-3 p-4 rounded-xl bg-violet-50 border border-violet-100">

              <ShieldCheck
                size={18}
                className="text-violet-600 shrink-0 mt-0.5"
              />

              <div>
                <p className="text-xs font-bold text-violet-800">
                  Keep your account secure
                </p>

                <p className="text-xs text-violet-600/80 mt-1 leading-5">
                  Use a strong password that you don't use on other websites or applications.
                </p>
              </div>

            </div>

            {/* PASSWORD BUTTON */}

            <div className="flex justify-end mt-6">

              <button
                type="submit"
                disabled={loading}
                className="
                  w-full
                  sm:w-auto
                  flex
                  items-center
                  justify-center
                  gap-2
                  px-5
                  py-3
                  rounded-xl
                  bg-violet-600
                  hover:bg-violet-700
                  disabled:opacity-60
                  disabled:cursor-not-allowed
                  text-white
                  text-sm
                  font-semibold
                  shadow-sm
                  hover:shadow-md
                  transition-all
                  active:scale-[0.98]
                "
              >

                {loading &&
                  updatingSection === "Password" ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />

                    Updating Password...
                  </>
                ) : (
                  <>
                    <LockKeyhole size={17} />

                    Update Password
                  </>
                )}

              </button>

            </div>
          </form>
        </section>
      </div>
    </main>
  );
};

export default Profile;