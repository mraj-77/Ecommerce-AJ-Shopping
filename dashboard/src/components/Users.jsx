import React, { useEffect, useState } from "react";
import avatar from "../assets/avatar.jpg";
import { useDispatch, useSelector } from "react-redux";
import Header from "./Header";
import { deleteUser, fetchAllUsers } from "../store/slices/adminSlice";

import {
  Users as UsersIcon,
  Mail,
  CalendarDays,
  Trash2,
  ChevronLeft,
  ChevronRight,
  UserRound,
  ShieldCheck,
} from "lucide-react";

const Users = () => {
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(null);

  const { loading, users, totalUsers } = useSelector(
    (state) => state.admin
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllUsers(page));
  }, [dispatch, page]);

  useEffect(() => {
    if (totalUsers !== undefined) {
      const newMax = Math.ceil(totalUsers / 10);
      setMaxPage(newMax || 1);
    }
  }, [totalUsers]);

  useEffect(() => {
    if (maxPage && page > maxPage) {
      setPage(maxPage);
    }
  }, [maxPage, page]);

  const handleDeleteUser = (id) => {
    dispatch(deleteUser(id, page));
  };

  const onlineUsersCount = users?.filter((user) => user?.is_online).length || 0;

  return (
    <main className="min-h-screen w-full bg-slate-50 p-4 sm:p-5 md:pl-[17rem]">
      <div className="w-full max-w-[1600px] mx-auto">
        <Header />

        {/* ================= PAGE HEADER ================= */}
        <section className="mb-7">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-blue-600" />

                <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
                  User Management
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                All Users
              </h1>

              <p className="text-sm text-slate-500 mt-1">
                Manage and monitor all registered users.
              </p>
            </div>

            {/* Total Users */}
            <div className="flex items-center gap-3 bg-white border border-slate-200 rounded-2xl px-4 py-3 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                <UsersIcon
                  size={20}
                  className="text-blue-600"
                />
              </div>

              <div>
                <p className="text-[11px] text-slate-400 font-medium">
                  Total Users
                </p>

                <p className="text-lg font-bold text-slate-900 leading-tight">
                  {totalUsers ?? 0}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ================= USER TABLE CARD ================= */}
        <section className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
          {/* Card Header */}
          <div className="px-5 sm:px-7 py-5 border-b border-slate-100">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center">
                  <UserRound
                    size={19}
                    className="text-indigo-600"
                  />
                </div>

                <div>
                  <h2 className="text-base font-bold text-slate-800">
                    User Directory
                  </h2>

                  <p className="text-xs text-slate-400 mt-0.5">
                    View registered users and account details.
                  </p>
                </div>
              </div>

              {!loading && users?.length > 0 && (
                <div className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-xl bg-emerald-50 border border-emerald-100">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />

                  <span className="text-xs font-semibold text-emerald-600">
                    {onlineUsersCount} users online
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* ================= LOADING ================= */}
          {loading ? (
            <div className="min-h-[420px] flex flex-col items-center justify-center px-6">
              <div className="w-12 h-12 border-4 border-slate-200 border-t-blue-600 rounded-full animate-spin" />

              <p className="mt-4 text-sm font-semibold text-slate-700">
                Loading users...
              </p>

              <p className="text-xs text-slate-400 mt-1">
                Please wait while we fetch the user list.
              </p>
            </div>
          ) : users && users.length > 0 ? (
            <>
              {/* ================= DESKTOP TABLE ================= */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-100">
                      <th className="py-4 px-6 text-left text-[11px] font-bold uppercase tracking-wider text-slate-400">
                        User
                      </th>

                      <th className="py-4 px-6 text-left text-[11px] font-bold uppercase tracking-wider text-slate-400">
                        Email
                      </th>

                      <th className="py-4 px-6 text-left text-[11px] font-bold uppercase tracking-wider text-slate-400">
                        Registered On
                      </th>

                      <th className="py-4 px-6 text-left text-[11px] font-bold uppercase tracking-wider text-slate-400">
                        Role
                      </th>

                      <th className="py-4 px-6 text-right text-[11px] font-bold uppercase tracking-wider text-slate-400">
                        Action
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {users.map((user, index) => (
                      <tr
                        key={user.id || index}
                        className="border-b border-slate-100 last:border-0 hover:bg-slate-50/70 transition-colors duration-200"
                      >
                        {/* User */}
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-3">
                            <div className="relative shrink-0">
                              <div className="w-11 h-11 rounded-xl overflow-hidden border border-slate-200 bg-slate-100">
                                <img
                                  src={
                                    user?.avatar?.url || avatar
                                  }
                                  alt={user?.name || "User"}
                                  className="w-full h-full object-cover"
                                  loading="lazy"
                                />
                              </div>

                              <span
                                className={`absolute -right-0.5 -bottom-0.5 w-3 h-3 rounded-full border-2 border-white ${user?.is_online ? "bg-emerald-500" : "bg-slate-300"
                                  }`}
                              />
                            </div>

                            <div className="min-w-0">
                              <p className="text-sm font-semibold text-slate-800 truncate max-w-[180px]">
                                {user?.name || "Unknown User"}
                              </p>

                              <p className="text-[11px] text-slate-400 mt-0.5">
                                User ID:{" "}
                                {user?.id
                                  ? `${user.id.slice(0, 8)}...`
                                  : "N/A"}
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* Email */}
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-2 text-sm text-slate-600">
                            <Mail
                              size={15}
                              className="text-slate-400 shrink-0"
                            />

                            <span className="truncate max-w-[240px]">
                              {user?.email || "No email"}
                            </span>
                          </div>
                        </td>

                        {/* Registered */}
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-2 text-sm text-slate-600">
                            <CalendarDays
                              size={15}
                              className="text-slate-400"
                            />

                            <span>
                              {user?.created_at
                                ? new Date(
                                  user.created_at
                                ).toLocaleDateString(
                                  "en-IN",
                                  {
                                    day: "2-digit",
                                    month: "short",
                                    year: "numeric",
                                  }
                                )
                                : "N/A"}
                            </span>
                          </div>
                        </td>

                        {/* Role */}
                        <td className="py-4 px-6">
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-blue-50 border border-blue-100 text-xs font-semibold text-blue-600">
                            <ShieldCheck size={13} />
                            {user?.role || "User"}
                          </span>
                        </td>

                        {/* Action */}
                        <td className="py-4 px-6 text-right">
                          <button
                            type="button"
                            onClick={() =>
                              handleDeleteUser(user.id)
                            }
                            disabled={loading}
                            className="
                              inline-flex
                              items-center
                              gap-2
                              px-3.5
                              py-2.5
                              rounded-xl
                              bg-red-50
                              border
                              border-red-100
                              text-red-500
                              text-xs
                              font-semibold
                              hover:bg-red-500
                              hover:text-white
                              hover:border-red-500
                              transition-all
                              duration-200
                              cursor-pointer
                              disabled:opacity-50
                              disabled:cursor-not-allowed
                            "
                          >
                            <Trash2 size={15} />
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* ================= MOBILE USERS ================= */}
              <div className="md:hidden divide-y divide-slate-100">
                {users.map((user, index) => (
                  <div
                    key={user.id || index}
                    className="p-4 hover:bg-slate-50 transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      <div className="relative shrink-0">
                        <div className="w-12 h-12 rounded-xl overflow-hidden border border-slate-200 bg-slate-100">
                          <img
                            src={
                              user?.avatar?.url || avatar
                            }
                            alt={user?.name || "User"}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                        </div>

                        <span
                          className={`absolute -right-0.5 -bottom-0.5 w-3 h-3 rounded-full border-2 border-white ${user?.is_online ? "bg-emerald-500" : "bg-slate-300"
                            }`}
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <h3 className="text-sm font-bold text-slate-800 truncate">
                              {user?.name || "Unknown User"}
                            </h3>

                            <div className="flex items-center gap-1.5 mt-1 text-xs text-slate-500">
                              <Mail size={13} />

                              <span className="truncate">
                                {user?.email || "No email"}
                              </span>
                            </div>
                          </div>

                          <button
                            type="button"
                            onClick={() =>
                              handleDeleteUser(user.id)
                            }
                            disabled={loading}
                            className="w-9 h-9 shrink-0 rounded-xl bg-red-50 text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all disabled:opacity-50"
                            title="Delete user"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>

                        <div className="flex flex-wrap items-center gap-2 mt-3">
                          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-blue-50 text-[10px] font-semibold text-blue-600">
                            <ShieldCheck size={12} />
                            {user?.role || "User"}
                          </span>

                          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-slate-100 text-[10px] font-medium text-slate-500">
                            <CalendarDays size={12} />

                            {user?.created_at
                              ? new Date(
                                user.created_at
                              ).toLocaleDateString(
                                "en-IN",
                                {
                                  day: "2-digit",
                                  month: "short",
                                  year: "numeric",
                                }
                              )
                              : "N/A"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            /* ================= EMPTY STATE ================= */
            <div className="min-h-[420px] flex flex-col items-center justify-center px-6 text-center">
              <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center mb-4">
                <UsersIcon
                  size={28}
                  className="text-slate-400"
                />
              </div>

              <h3 className="text-lg font-bold text-slate-800">
                No users found
              </h3>

              <p className="text-sm text-slate-400 mt-1 max-w-sm">
                There are currently no registered users available
                on this page.
              </p>
            </div>
          )}
        </section>

        {/* ================= PAGINATION ================= */}
        {!loading && users?.length > 0 && (
          <div className="mt-5 bg-white border border-slate-200 rounded-2xl shadow-sm px-4 sm:px-5 py-3">
            <div className="flex items-center justify-between gap-3">
              {/* Previous */}
              <button
                type="button"
                onClick={() =>
                  setPage((prev) => Math.max(prev - 1, 1))
                }
                disabled={page === 1}
                className="
                  flex
                  items-center
                  justify-center
                  gap-2
                  px-3.5
                  py-2.5
                  rounded-xl
                  border
                  border-slate-200
                  bg-white
                  text-slate-600
                  text-xs
                  sm:text-sm
                  font-semibold
                  hover:bg-slate-50
                  hover:border-slate-300
                  disabled:opacity-40
                  disabled:cursor-not-allowed
                  transition-all
                "
              >
                <ChevronLeft size={16} />

                <span className="hidden sm:inline">
                  Previous
                </span>
              </button>

              {/* Page */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400 hidden sm:inline">
                  Page
                </span>

                <span className="min-w-9 h-9 px-2 rounded-xl bg-blue-600 text-white flex items-center justify-center text-xs font-bold shadow-sm">
                  {page}
                </span>

                <span className="text-xs text-slate-400">
                  of {maxPage || 1}
                </span>
              </div>

              {/* Next */}
              <button
                type="button"
                onClick={() =>
                  setPage((prev) =>
                    Math.min(prev + 1, maxPage || 1)
                  )
                }
                disabled={page === maxPage}
                className="
                  flex
                  items-center
                  justify-center
                  gap-2
                  px-3.5
                  py-2.5
                  rounded-xl
                  border
                  border-slate-200
                  bg-white
                  text-slate-600
                  text-xs
                  sm:text-sm
                  font-semibold
                  hover:bg-slate-50
                  hover:border-slate-300
                  disabled:opacity-40
                  disabled:cursor-not-allowed
                  transition-all
                "
              >
                <span className="hidden sm:inline">
                  Next
                </span>

                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default Users;