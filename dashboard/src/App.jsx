// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Navigate,
// } from "react-router-dom";
// import Login from "./pages/Login";
// import ForgotPassword from "./pages/ForgotPassword";
// import ResetPassword from "./pages/ResetPassword";
// import { ToastContainer } from "react-toastify";
// import { useDispatch, useSelector } from "react-redux";
// import SideBar from "./components/SideBar";
// import Dashboard from "./components/Dashboard";
// import Orders from "./components/Orders";
// import Products from "./components/Products";
// import Profile from "./components/Profile";
// import Users from "./components/Users";
// import { useEffect } from "react";
// import { getUser } from "./store/slices/authSlice";
// import { getDashboardStats } from "./store/slices/adminSlice";
// import { fetchAllProducts } from "./store/slices/productsSlice";

// function App() {

//   const { openedComponent } = useSelector((state) => state.extra);
//   const { user, isAuthenticated } = useSelector((state) => state.auth);
//   const dispatch = useDispatch();
//   useEffect(() => {
//     dispatch(getUser());
//   }, []);
//   useEffect(() => {
//     if (isAuthenticated) {
//       dispatch(getDashboardStats());
//       dispatch(fetchAllProducts())
//     }
//   }, [])

//   const renderDashboardContent = () => {
//     switch (openedComponent) {
//       case "Dashboard":
//         return <Dashboard />;
//       case "Orders":
//         return <Orders />;
//       case "Users":
//         return <Users />;
//       case "Profile":
//         return <Profile />;
//       case "Products":
//         return <Products />;
//       default:
//         return <Dashboard />;
//     }
//   };

//   return (
//     <Router>
//       <Routes>
//         <Route path="/login" element={<Login />} />
//         <Route path="/password/forgot" element={<ForgotPassword />} />
//         <Route path="/password/reset/:token" element={<ResetPassword />} />

//         {/* Protected Admin Route */}
//         <Route
//           path="/"
//           element={
//             isAuthenticated && user?.role === "Admin" ? (
//               <div className="flex min-h-screen">
//                 <SideBar />
//                 {renderDashboardContent()}
//               </div>
//             ) : (
//               <Navigate to="/login" replace />
//             )
//           }
//         />
//       </Routes>
//       <ToastContainer theme="dark" />
//     </Router>
//   );
// }

// export default App;







import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import { ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import SideBar from "./components/SideBar";
import Dashboard from "./components/Dashboard";
import Orders from "./components/Orders";
import Products from "./components/Products";
import Profile from "./components/Profile";
import Users from "./components/Users";
import { useEffect } from "react";
import { getUser } from "./store/slices/authSlice";
import { getDashboardStats } from "./store/slices/adminSlice";
import { fetchAllProducts } from "./store/slices/productsSlice";
import { axiosInstance } from "./lib/axios"; // ADDED — needed for the ping call

function App() {

  const { openedComponent } = useSelector((state) => state.extra);
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUser());
  }, []);
  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getDashboardStats());
      dispatch(fetchAllProducts())
    }
  }, [])

  // ================================
  // ONLINE STATUS PING
  // Sends a lightweight heartbeat every 30s so the backend can
  // update `last_seen` for this admin while they're active on the page.
  // ================================
  useEffect(() => {
    if (!isAuthenticated) return;

    const interval = setInterval(() => {
      axiosInstance.get("/auth/ping");
    }, 30000);

    return () => clearInterval(interval);
  }, [isAuthenticated]);

  const renderDashboardContent = () => {
    switch (openedComponent) {
      case "Dashboard":
        return <Dashboard />;
      case "Orders":
        return <Orders />;
      case "Users":
        return <Users />;
      case "Profile":
        return <Profile />;
      case "Products":
        return <Products />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/password/forgot" element={<ForgotPassword />} />
        <Route path="/password/reset/:token" element={<ResetPassword />} />

        {/* Protected Admin Route */}
        <Route
          path="/"
          element={
            isAuthenticated && user?.role === "Admin" ? (
              <div className="flex min-h-screen">
                <SideBar />
                {renderDashboardContent()}
              </div>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>
      <ToastContainer theme="dark" />
    </Router>
  );
}

export default App;