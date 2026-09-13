import React, { useEffect, useState } from "react";
import {
  LayoutDashboard,
  ListOrdered,
  Package,
  Users,
  User,
  LogOut,
  MoveLeft,
  Store,
  ChevronRight,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { logout } from "../store/slices/authSlice";
import {
  toggleComponent,
  toggleNavbar,
} from "../store/slices/extraSlice";

const SideBar = () => {
  const [activeLink, setActiveLink] = useState(0);

  const location = useLocation();

  const links = [
    {
      icon: LayoutDashboard,
      title: "Dashboard",
      path: "/",
    },
    {
      icon: ListOrdered,
      title: "Orders",
      path: "/orders",
    },
    {
      icon: Package,
      title: "Products",
      path: "/products",
    },
    {
      icon: Users,
      title: "Users",
      path: "/users",
    },
    {
      icon: User,
      title: "Profile",
      path: "/profile",
    },
  ];

  const { isNavbarOpened } = useSelector((state) => state.extra);
  const { isAuthenticated, user } = useSelector(
    (state) => state.auth
  );

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  useEffect(() => {
    const currentIndex = links.findIndex(
      (item) => item.path === location.pathname
    );

    if (currentIndex !== -1) {
      setActiveLink(currentIndex);
    }
  }, [location.pathname]);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <aside
      className={`
        fixed
        top-2.5
        left-2.5
        z-50
        w-64
        h-[calc(100vh-20px)]
        bg-white
        border
        border-slate-200
        rounded-2xl
        shadow-[0_10px_40px_rgba(15,23,42,0.08)]
        flex
        flex-col
        justify-between
        p-4
        transition-all
        duration-300
        ease-in-out

        ${isNavbarOpened
          ? "translate-x-0"
          : "-translate-x-[120%]"
        }

        md:translate-x-0
      `}
    >
      {/* ================= HEADER ================= */}
      <div>
        <div className="flex items-center justify-between px-2 py-2 mb-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-md">
              <Store
                size={20}
                className="text-white"
                strokeWidth={2.3}
              />
            </div>

            <div>
              <h2 className="text-base font-bold text-slate-900 leading-tight">
                Admin Panel
              </h2>

              <p className="text-[11px] text-slate-400 mt-0.5">
                Store Management
              </p>
            </div>
          </div>

          {/* Mobile Close */}
          <button
            type="button"
            onClick={() => dispatch(toggleNavbar())}
            className="md:hidden w-9 h-9 rounded-xl flex items-center justify-center text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-all"
            aria-label="Close navigation"
          >
            <MoveLeft size={19} />
          </button>
        </div>

        <div className="h-px bg-slate-100 mb-5" />

        {/* ================= NAVIGATION ================= */}
        <div>
          <p className="px-2 mb-2 text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400">
            Main Menu
          </p>

          <nav className="space-y-1.5">
            {links.map((item, index) => {
              const Icon = item.icon;
              const isActive = activeLink === index;

              return (
                <button
                  type="button"
                  key={item.title}
                  onClick={() => {
                    setActiveLink(index);
                    dispatch(toggleComponent(item.title));
                  }}
                  className={`
                    group
                    relative
                    w-full
                    flex
                    items-center
                    gap-3
                    px-3
                    py-3
                    rounded-xl
                    text-sm
                    font-medium
                    transition-all
                    duration-200
                    cursor-pointer

                    ${isActive
                      ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-100"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    }
                  `}
                >
                  {/* Active indicator */}
                  {isActive && (
                    <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-7 rounded-r-full bg-white" />
                  )}

                  <span
                    className={`
                      flex
                      items-center
                      justify-center
                      w-9
                      h-9
                      rounded-lg
                      transition-all
                      duration-200

                      ${isActive
                        ? "bg-white/15"
                        : "bg-slate-100 group-hover:bg-white"
                      }
                    `}
                  >
                    <Icon
                      size={19}
                      strokeWidth={isActive ? 2.3 : 2}
                    />
                  </span>

                  <span className="flex-1 text-left">
                    {item.title}
                  </span>

                  <ChevronRight
                    size={16}
                    className={`
                      transition-all
                      duration-200

                      ${isActive
                        ? "opacity-100 translate-x-0"
                        : "opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0"
                      }
                    `}
                  />
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* ================= BOTTOM ================= */}
      <div>
        {/* Admin Profile Mini Card */}
        <div className="mb-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
          <div className="flex items-center gap-3">
            <div className="relative shrink-0">
              <div className="w-10 h-10 rounded-xl overflow-hidden bg-slate-200 border border-white shadow-sm">
                <img
                  src={
                    user?.avatar?.url ||
                    "/src/assets/avatar.jpg"
                  }
                  alt={user?.name || "Admin"}
                  className="w-full h-full object-cover"
                />
              </div>

              <span className="absolute -right-0.5 -bottom-0.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white" />
            </div>

            <div className="min-w-0">
              <p className="text-sm font-semibold text-slate-800 truncate">
                {user?.name || "Admin"}
              </p>

              <p className="text-[11px] text-slate-400 truncate">
                {user?.role || "Administrator"}
              </p>
            </div>
          </div>
        </div>

        {/* Logout */}
        <button
          type="button"
          onClick={handleLogout}
          className="
            group
            w-full
            flex
            items-center
            gap-3
            px-3
            py-3
            rounded-xl
            text-sm
            font-semibold
            text-red-500
            bg-red-50
            hover:bg-red-500
            hover:text-white
            transition-all
            duration-200
            cursor-pointer
          "
        >
          <span className="w-9 h-9 rounded-lg bg-white/80 group-hover:bg-white/20 flex items-center justify-center transition-all">
            <LogOut size={18} />
          </span>

          <span>Logout</span>
        </button>

        <p className="text-center text-[10px] text-slate-300 mt-3">
          AJ Shopping • Admin
        </p>
      </div>
    </aside>
  );
};

export default SideBar;