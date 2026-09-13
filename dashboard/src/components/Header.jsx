import React from "react";
import { useDispatch, useSelector } from "react-redux";
import avatar from "../assets/avatar.jpg";
import { Menu } from "lucide-react";
import { toggleNavbar } from "../store/slices/extraSlice";

const Header = () => {
  const { user } = useSelector((state) => state.auth);
  const { openedComponent } = useSelector((state) => state.extra);
  const dispatch = useDispatch();

  return (
    <header className="w-full mb-5">
      <div className="flex items-center justify-between gap-4">
        {/* LEFT SIDE */}
        <div className="flex items-center gap-3 min-w-0">
          {/* Mobile Menu */}
          <button
            type="button"
            onClick={() => dispatch(toggleNavbar())}
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all duration-200 shadow-sm"
            aria-label="Open navigation menu"
          >
            <Menu size={21} />
          </button>

          {/* Breadcrumb / Page Info */}
          <div className="min-w-0">
            <div className="flex items-center gap-2 text-sm">
              <span className="font-medium text-slate-500 truncate max-w-[120px] sm:max-w-none">
                {user?.name || "Admin"}
              </span>

              <span className="text-slate-300">/</span>

              <span className="font-semibold text-slate-900 truncate max-w-[140px] sm:max-w-none">
                {openedComponent || "Dashboard"}
              </span>
            </div>

            <p className="hidden sm:block text-xs text-slate-400 mt-1">
              Manage your store from one place
            </p>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Online Status */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 rounded-xl shadow-sm">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-60 animate-ping" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500" />
            </span>

            <span className="text-xs font-medium text-slate-600">
              Online
            </span>
          </div>

          {/* User Profile */}
          <div className="flex items-center gap-3 pl-1">
            <div className="hidden lg:block text-right">
              <p className="text-sm font-semibold text-slate-800 leading-tight">
                {user?.name || "Admin"}
              </p>

              <p className="text-xs text-slate-400 mt-0.5">
                Administrator
              </p>
            </div>

            {/* Avatar */}
            <div className="relative">
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl overflow-hidden border-2 border-white ring-1 ring-slate-200 shadow-sm bg-slate-100">
                <img
                  src={user?.avatar?.url || avatar}
                  alt={user?.name || "Admin"}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Online Dot */}
              <span className="absolute -right-0.5 -bottom-0.5 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full" />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Divider */}
      <div className="mt-4 h-px bg-slate-200/80" />
    </header>
  );
};

export default Header;