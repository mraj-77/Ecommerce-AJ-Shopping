// import React, { useEffect, useState } from "react";
// import { Filter, Package, Truck, CheckCircle, XCircle, MapPin, Eye, PenLine, RefreshCw } from "lucide-react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { fetchMyOrders } from "../store/slices/orderSlice";

// // ADD THESE TWO IMPORTS
// import OrderDetails from "../pages/OrderDetails";
// import TrackOrder from "../pages/TrackOrder";

// const Orders = () => {
//   const [statusFilter, setStatusFilter] = useState("All");

//   // ADD THESE STATES
//   const [selectedOrder, setSelectedOrder] = useState(null);
//   const [showOrderDetails, setShowOrderDetails] = useState(false);
//   const [showTrackOrder, setShowTrackOrder] = useState(false);

//   const { myOrders } = useSelector((state) => state.order);
//   const dispatch = useDispatch();
//   useEffect(() => {
//     dispatch(fetchMyOrders());
//   }, [dispatch]);

//   const filterOrders = myOrders.filter(
//     (order) => statusFilter === "All" || order.order_status === statusFilter
//   );

//   const getStatusIcon = (status) => {
//     switch (status) {
//       case "Processing":
//         return <Package className="w-5 h-5 text-yellow-500" />;
//       case "Shipped":
//         return <Truck className="w-5 h-5 text-blue-500" />;
//       case "Delivered":
//         return <CheckCircle className="w-5 h-5 text-green-500" />;
//       case "Cancelled":
//         return <XCircle className="w-5 h-5 text-red-500" />;
//       default:
//         return <Package className="w-5 h-5 text-yellow-500" />;
//     }
//   };

//   const getStatusColor = (status) => {
//     switch (status) {
//       case "Processing":
//         return "bg-yellow-500/20 text-yellow-400";
//       case "Shipped":
//         return "bg-blue-500/20 text-blue-400";
//       case "Delivered":
//         return "bg-green-500/20 text-green-400";
//       case "Cancelled":
//         return "bg-red-500/20 text-red-400";
//       default:
//         return "bg-gray-500/20 text-gray-400";
//     }
//   };

//   const statusArray = [
//     "All",
//     "Processing",
//     "Shipped",
//     "Delivered",
//     "Cancelled",
//   ];

//   const { authUser } = useSelector((state) => state.auth);
//   const navigateTo = useNavigate();
//   if (!authUser) return navigateTo("/products");

//   // ================================
//   // VIEW DETAILS
//   // ================================
//   const handleViewDetails = (order) => {
//     setSelectedOrder(order);
//     setShowOrderDetails(true);
//   };

//   // ================================
//   // TRACK ORDER
//   // ================================
//   const handleTrackOrder = (order) => {
//     setSelectedOrder(order);
//     setShowTrackOrder(true);
//   };

//   // ================================
//   // CLOSE ORDER DETAILS
//   // ================================
//   const handleCloseOrderDetails = () => {
//     setShowOrderDetails(false);
//     setSelectedOrder(null);
//   };

//   // ================================
//   // CLOSE TRACK ORDER
//   // ================================
//   const handleCloseTrackOrder = () => {
//     setShowTrackOrder(false);
//     setSelectedOrder(null);
//   };

//   return (
//     <>
//       <div className="min-h-screen pt-20">
//         <div className="container mx-auto px-4 py-8">
//           <div className="mb-8">
//             <h1 className="text-3xl font-bold text-foreground mb-2">
//               My Orders
//             </h1>
//             <p className="text-muted-foreground">
//               Track and manage your order history.
//             </p>
//           </div>

//           {/* STATUS FILTER */}
//           <div className="glass-card p-4 mb-8">
//             <div className="flex items-center space-x-4 flex-wrap">
//               <div className="flex items-center space-x-2">
//                 <Filter className="w-5 h-5 text-primary" />
//                 <span className="font-medium">Filter by status:</span>
//               </div>
//               <div className="flex flex-wrap gap-2">
//                 {statusArray.map((status) => {
//                   return (
//                     <button
//                       key={status}
//                       onClick={() => setStatusFilter(status)}
//                       className={`px-4 py-2 rounded-lg font-medium transition-all capitalize ${statusFilter === status
//                         ? "gradient-primary text-primary-foreground"
//                         : "glass-card hover:glow-on-hover text-foreground"
//                         }`}
//                     >
//                       {status}
//                     </button>
//                   );
//                 })}
//               </div>
//             </div>
//           </div>

//           {/* ORDERS LIST */}
//           {filterOrders.length === 0 ? (
//             <div className="text-center glass-panel max-w-md mx-auto">
//               <Package className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
//               <h2 className="text-xl font-semibold text-foreground mb-2">
//                 No Orders Found
//               </h2>
//               <p className="text-muted-foreground">
//                 {statusFilter === "All"
//                   ? "You haven't placed any orders yet."
//                   : `No orders with status "${statusFilter}" found.`}
//               </p>
//             </div>
//           ) : (
//             <div className="space-y-6">
//               {filterOrders.map((order) => {
//                 return (
//                   <div key={order.id} className="glass-card p-6">
//                     {/* ORDER HEADER */}
//                     <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 space-y-4 md:space-y-0">
//                       <div>
//                         <h3 className="text-lg font-semibold from-foreground mb-1">
//                           Orders #{order.id}
//                         </h3>
//                         <p className="text-muted-foreground">
//                           Placed on{" "}
//                           {new Date(order.created_at).toLocaleDateString()}
//                         </p>
//                       </div>

//                       <div className="flex items-center space-x-4">
//                         <div className="flex items-center space-x-2">
//                           {getStatusIcon(order.order_status)}
//                           <span
//                             className={`px-3 py-1 rounded text-sm font-medium capitalize ${getStatusColor(
//                               order.order_status
//                             )}`}
//                           >
//                             {order.order_status}
//                           </span>
//                         </div>

//                         <div className="text-right">
//                           <p className="text-sm text-muted-foreground">Total</p>
//                           <p className="text-xl font-bold text-primary">
//                             ₹{order.total_price}
//                           </p>
//                         </div>
//                       </div>
//                     </div>

//                     {/* ORDER ITEMS */}
//                     <div className="space-y-4">
//                       {order?.order_items?.map((item) => (
//                         <div
//                           key={item.product_id}
//                           className="flex items-center space-x-4 p-4 bg-secondary/50 rounded-lg"
//                         >
//                           <img
//                             src={item.image}
//                             alt={item.title}
//                             className="w-16 h-16 object-cover rounded-lg"
//                           />
//                           <div className="flex-1 min-w-0">
//                             <h4 className="font-medium text-foreground truncate">
//                               {item.title}
//                             </h4>
//                             <p className="text-sm text-muted-foreground">
//                               Quantity: {item.quantity}
//                             </p>
//                           </div>
//                           <div className="text-right">
//                             <p className="font-semibold text-foreground">
//                               ₹{item.price}
//                             </p>
//                           </div>
//                         </div>
//                       ))}
//                     </div>

//                     {/* ORDER ACTION */}
//                     <div className="flex flex-wrap gap-3 mt-6 pt-6 border-t border-[hsla(var(--glass-border))]">
//                       {/* VIEW DETAILS */}
//                       <button
//                         onClick={() => handleViewDetails(order)}
//                         className="px-4 py-2 glass-card hover:glow-on-hover animate-smooth text-sm flex items-center gap-2"
//                       >
//                         <Eye className="w-5 h-5" />
//                         View Details
//                       </button>

//                       {/* TRACK ORDER */}
//                       <button
//                         onClick={() => handleTrackOrder(order)}
//                         className="px-4 py-2 glass-card hover:glow-on-hover animate-smooth text-sm flex items-center gap-2"
//                       >
//                         <MapPin className="w-5 h-5 text-primary" />
//                         <span>Track Order</span>
//                       </button>

//                       {/* {order.status === "Delivered" && ( */}
//                       <>
//                         <button className="px-4 py-2 glass-card hover:glow-on-hover animate-smooth text-sm flex items-center gap-2">
//                           <PenLine className="w-4 h-4" />
//                           Write Review
//                         </button>

//                         <button className="px-4 py-2 glass-card hover:glow-on-hover animate-smooth text-sm flex items-center gap-2">
//                           <RefreshCw className="w-4 h-4" />
//                           Reorder
//                         </button>
//                       </>
//                       {/* )} */}

//                       {/* {order.status === "Processing" && ( */}
//                       <button className="ml-auto px-4 py-2 glass-card hover:glow-on-hover animate-smooth text-sm text-destructive">
//                         Cancel Order
//                       </button>
//                       {/* )} */}
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           )}
//         </div>
//       </div>

//       {/* ========================================= */}
//       {/* VIEW ORDER DETAILS MODAL */}
//       {/* ========================================= */}

//       {showOrderDetails && (
//         <OrderDetails order={selectedOrder} onClose={handleCloseOrderDetails} />
//       )}

//       {/* ========================================= */}
//       {/* TRACK ORDER MODAL */}
//       {/* ========================================= */}

//       {showTrackOrder && (
//         <TrackOrder order={selectedOrder} onClose={handleCloseTrackOrder} />
//       )}
//     </>
//   );
// };

// export default Orders;











import React, { useEffect, useState } from "react";
import { Filter, Package, Truck, CheckCircle, XCircle } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchMyOrders } from "../store/slices/orderSlice";
import { addToCart } from "../store/slices/cartSlice";

// ADD THESE TWO IMPORTS
import OrderDetails from "../pages/OrderDetails";
import TrackOrder from "../pages/TrackOrder";
import CancelOrder from "../pages/CancelOrder";

const Orders = () => {
  const [statusFilter, setStatusFilter] = useState("All");

  // ADD THESE STATES
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const [showTrackOrder, setShowTrackOrder] = useState(false);
  const [showCancelOrder, setShowCancelOrder] = useState(false);

  const { myOrders } = useSelector((state) => state.order);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchMyOrders());
  }, [dispatch]);

  const filterOrders = myOrders.filter(
    (order) => statusFilter === "All" || order.order_status === statusFilter
  );

  const getStatusIcon = (status) => {
    switch (status) {
      case "Processing":
        return <Package className="w-5 h-5 text-yellow-500" />;
      case "Shipped":
        return <Truck className="w-5 h-5 text-blue-500" />;
      case "Delivered":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "Cancelled":
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Package className="w-5 h-5 text-yellow-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Processing":
        return "bg-yellow-500/20 text-yellow-400";
      case "Shipped":
        return "bg-blue-500/20 text-blue-400";
      case "Delivered":
        return "bg-green-500/20 text-green-400";
      case "Cancelled":
        return "bg-red-500/20 text-red-400";
      default:
        return "bg-gray-500/20 text-gray-400";
    }
  };

  const statusArray = [
    "All",
    "Processing",
    "Shipped",
    "Delivered",
    "Cancelled",
  ];

  const { authUser } = useSelector((state) => state.auth);
  const navigateTo = useNavigate();
  if (!authUser) return navigateTo("/products");

  // ================================
  // VIEW DETAILS
  // ================================
  const handleViewDetails = (order) => {
    setSelectedOrder(order);
    setShowOrderDetails(true);
  };

  // ================================
  // TRACK ORDER
  // ================================
  const handleTrackOrder = (order) => {
    setSelectedOrder(order);
    setShowTrackOrder(true);
  };

  // ================================
  // CLOSE ORDER DETAILS
  // ================================
  const handleCloseOrderDetails = () => {
    setShowOrderDetails(false);
    setSelectedOrder(null);
  };

  // ================================
  // CLOSE TRACK ORDER
  // ================================
  const handleCloseTrackOrder = () => {
    setShowTrackOrder(false);
    setSelectedOrder(null);
  };

  // ================================
  // CANCEL ORDER
  // ================================
  const handleCancelOrder = (order) => {
    setSelectedOrder(order);
    setShowCancelOrder(true);
  };

  // ================================
  // CLOSE CANCEL ORDER
  // ================================
  const handleCloseCancelOrder = () => {
    setShowCancelOrder(false);
    setSelectedOrder(null);
  };

  // ================================
  // CONFIRM CANCEL ORDER (hook your API/thunk here)
  // ================================
  const handleConfirmCancelOrder = async ({ orderId, reason, details }) => {
    // TODO: dispatch(cancelOrder({ orderId, reason, details }))
    console.log("Cancelling order:", orderId, reason, details);
  };

  // ================================
  // WRITE REVIEW
  // ================================
  const handleWriteReview = (item) => {
    navigateTo(`/product/${item.product_id}`, { state: { openReview: true } });
  };
  // ================================
  // REORDER
  // ================================
  const handleReorder = (item) => {
    dispatch(
      addToCart({
        product: {
          id: item.product_id,
          name: item.title,
        },
        quantity: item.quantity,
      })
    );
    navigateTo(`/product/${item.product_id}`);
  };

  return (
    <>
      <div className="min-h-screen pt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              My Orders
            </h1>
            <p className="text-muted-foreground">
              Track and manage your order history.
            </p>
          </div>

          {/* STATUS FILTER */}
          <div className="glass-card p-4 mb-8">
            <div className="flex items-center space-x-4 flex-wrap">
              <div className="flex items-center space-x-2">
                <Filter className="w-5 h-5 text-primary" />
                <span className="font-medium">Filter by status:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {statusArray.map((status) => {
                  return (
                    <button
                      key={status}
                      onClick={() => setStatusFilter(status)}
                      className={`px-4 py-2 rounded-lg font-medium transition-all capitalize ${statusFilter === status
                        ? "gradient-primary text-primary-foreground"
                        : "glass-card hover:glow-on-hover text-foreground"
                        }`}
                    >
                      {status}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ORDERS LIST */}
          {filterOrders.length === 0 ? (
            <div className="text-center glass-panel max-w-md mx-auto">
              <Package className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-foreground mb-2">
                No Orders Found
              </h2>
              <p className="text-muted-foreground">
                {statusFilter === "All"
                  ? "You haven't placed any orders yet."
                  : `No orders with status "${statusFilter}" found.`}
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {filterOrders.map((order) => {
                return (
                  <div key={order.id} className="glass-card p-6">
                    {/* ORDER HEADER */}
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 space-y-4 md:space-y-0">
                      <div>
                        <h3 className="text-lg font-semibold from-foreground mb-1">
                          Orders #{order.id}
                        </h3>
                        <p className="text-muted-foreground">
                          Placed on{" "}
                          {new Date(order.created_at).toLocaleDateString()}
                        </p>
                      </div>

                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(order.order_status)}
                          <span
                            className={`px-3 py-1 rounded text-sm font-medium capitalize ${getStatusColor(
                              order.order_status
                            )}`}
                          >
                            {order.order_status}
                          </span>
                        </div>

                        <div className="text-right">
                          <p className="text-sm text-muted-foreground">Total</p>
                          <p className="text-xl font-bold text-primary">
                            ₹{order.total_price}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* ORDER ITEMS */}
                    <div className="space-y-4">
                      {order?.order_items?.map((item) => (
                        <div
                          key={item.product_id}
                          className="flex items-center space-x-4 p-4 bg-secondary/50 rounded-lg"
                        >
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-16 h-16 object-cover rounded-lg"
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-foreground truncate">
                              {item.title}
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              Quantity: {item.quantity}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-foreground">
                              ₹{item.price}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* ORDER ACTION */}
                    <div className="flex flex-wrap gap-3 mt-6 pt-6 border-t border-[hsla(var(--glass-border))]">
                      {/* VIEW DETAILS */}
                      <button
                        onClick={() => handleViewDetails(order)}
                        className="px-4 py-2 glass-card hover:glow-on-hover animate-smooth text-sm"
                      >
                        View Details
                      </button>

                      {/* TRACK ORDER */}
                      <button
                        onClick={() => handleTrackOrder(order)}
                        className="px-4 py-2 glass-card hover:glow-on-hover animate-smooth text-sm"
                      >
                        Track Order
                      </button>

                      {order.order_status === "Delivered" && (
                        <>
                          <button
                            onClick={() => handleWriteReview(item)}
                            className="px-4 py-2 glass-card hover:glow-on-hover animate-smooth text-sm"
                          >
                            Write Review
                          </button>

                          <button
                            onClick={() => handleReorder(item)}
                            className="px-4 py-2 glass-card hover:glow-on-hover animate-smooth text-sm"
                          >
                            Reorder
                          </button>
                        </>
                      )}

                      <button
                        onClick={() => handleCancelOrder(order)}
                        className="ml-auto px-4 py-2 glass-card hover:glow-on-hover animate-smooth text-sm text-destructive"
                      >
                        Cancel Order
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* ========================================= */}
      {/* VIEW ORDER DETAILS MODAL */}
      {/* ========================================= */}

      {showOrderDetails && (
        <OrderDetails order={selectedOrder} onClose={handleCloseOrderDetails} />
      )}

      {/* ========================================= */}
      {/* TRACK ORDER MODAL */}
      {/* ========================================= */}

      {showTrackOrder && (
        <TrackOrder order={selectedOrder} onClose={handleCloseTrackOrder} />
      )}

      {/* ========================================= */}
      {/* CANCEL ORDER MODAL */}
      {/* ========================================= */}

      {showCancelOrder && (
        <CancelOrder
          order={selectedOrder}
          onClose={handleCloseCancelOrder}
          onConfirmCancel={handleConfirmCancelOrder}
        />
      )}
    </>
  );
};

export default Orders;
