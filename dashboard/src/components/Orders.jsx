import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "./Header";
import {
  fetchAllOrders,
  updateOrderStatus,
  deleteOrder,
} from "../store/slices/orderSlice";

import {
  Package,
  MapPin,
  Phone,
  User,
  CalendarDays,
  ShoppingBag,
  IndianRupee,
  Trash2,
  Eye,
  X,
  ChevronDown,
  Truck,
  CheckCircle2,
  Clock3,
  XCircle,
  Search,
  Hash,
} from "lucide-react";

const Orders = () => {
  const statusArray = [
    "All",
    "Processing",
    "Shipped",
    "Delivered",
    "Cancelled",
  ];

  const dispatch = useDispatch();
  const { orders, loading } = useSelector((state) => state.order);

  const [selectedStatus, setSelectedStatus] = useState({});
  const [filterByStaus, setFilterByStaus] = useState("All");
  const [previewImage, setPreviewImage] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState({
    open: false,
    id: null,
  });

  useEffect(() => {
    dispatch(fetchAllOrders());
  }, [dispatch]);

  const handleStatusChange = (orderId, newStatus) => {
    setSelectedStatus((prev) => ({
      ...prev,
      [orderId]: newStatus,
    }));

    dispatch(
      updateOrderStatus({
        orderId,
        status: newStatus,
      })
    );
  };

  const filteredOrders =
    filterByStaus === "All"
      ? orders
      : orders?.filter(
        (order) => order.order_status === filterByStaus
      );

  const confirmDelete = () => {
    dispatch(deleteOrder(deleteConfirm.id));

    setDeleteConfirm({
      open: false,
      id: null,
    });
  };

  const getStatusConfig = (status) => {
    switch (status) {
      case "Processing":
        return {
          bg: "bg-amber-50",
          text: "text-amber-700",
          border: "border-amber-200",
          icon: Clock3,
        };

      case "Shipped":
        return {
          bg: "bg-blue-50",
          text: "text-blue-700",
          border: "border-blue-200",
          icon: Truck,
        };

      case "Delivered":
        return {
          bg: "bg-emerald-50",
          text: "text-emerald-700",
          border: "border-emerald-200",
          icon: CheckCircle2,
        };

      case "Cancelled":
        return {
          bg: "bg-red-50",
          text: "text-red-700",
          border: "border-red-200",
          icon: XCircle,
        };

      default:
        return {
          bg: "bg-slate-50",
          text: "text-slate-700",
          border: "border-slate-200",
          icon: Package,
        };
    }
  };

  const getOrderId = (id) => {
    if (!id) return "N/A";

    return `#${String(id).slice(0, 8).toUpperCase()}`;
  };

  return (
    <>
      <main className="min-h-screen w-full bg-slate-50 p-4 sm:p-5 md:pl-[17rem]">
        <div className="w-full max-w-[1600px] mx-auto">

          {/* HEADER */}
          <Header />

          {/* PAGE TITLE */}
          <section className="mb-6">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2 h-2 rounded-full bg-blue-600" />

                  <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
                    Order Management
                  </span>
                </div>

                <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                  All Orders
                </h1>

                <p className="text-sm text-slate-500 mt-1">
                  Manage, track and update customer orders.
                </p>
              </div>

              {/* TOTAL ORDERS */}
              <div className="flex items-center gap-3 bg-white border border-slate-200 rounded-2xl px-4 py-3 shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                  <ShoppingBag
                    size={20}
                    className="text-blue-600"
                  />
                </div>

                <div>
                  <p className="text-xs text-slate-400 font-medium">
                    Total Orders
                  </p>

                  <p className="text-lg font-bold text-slate-900">
                    {orders?.length || 0}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* FILTER BAR */}
          <section className="bg-white border border-slate-200 rounded-2xl shadow-sm p-4 mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

              <div>
                <h2 className="text-sm font-bold text-slate-800">
                  Order List
                </h2>

                <p className="text-xs text-slate-400 mt-0.5">
                  {filteredOrders?.length || 0} orders found
                </p>
              </div>

              <div className="relative w-full sm:w-52">
                <select
                  value={filterByStaus}
                  onChange={(e) =>
                    setFilterByStaus(e.target.value)
                  }
                  className="appearance-none w-full bg-slate-50 border border-slate-200 text-sm font-medium text-slate-700 rounded-xl px-4 py-2.5 pr-10 outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all cursor-pointer"
                >
                  {statusArray.map((status) => (
                    <option key={status} value={status}>
                      {status === "All"
                        ? "All Orders"
                        : status}
                    </option>
                  ))}
                </select>

                <ChevronDown
                  size={17}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                />
              </div>
            </div>
          </section>

          {/* LOADING */}
          {loading ? (
            <div className="flex flex-col items-center justify-center py-24">
              <div className="w-12 h-12 rounded-full border-4 border-slate-200 border-t-blue-600 animate-spin" />

              <p className="mt-4 text-sm font-medium text-slate-600">
                Loading orders...
              </p>

              <p className="text-xs text-slate-400 mt-1">
                Please wait a moment
              </p>
            </div>
          ) : (
            <>
              {/* EMPTY STATE */}
              {!filteredOrders || filteredOrders.length === 0 ? (
                <div className="bg-white border border-slate-200 rounded-2xl shadow-sm py-20 px-6 text-center">
                  <div className="w-16 h-16 mx-auto rounded-2xl bg-slate-100 flex items-center justify-center">
                    <Package
                      size={30}
                      className="text-slate-400"
                    />
                  </div>

                  <h3 className="text-xl font-bold text-slate-800 mt-5">
                    No orders found
                  </h3>

                  <p className="text-sm text-slate-500 mt-2 max-w-sm mx-auto">
                    There are no orders matching the selected
                    status.
                  </p>
                </div>
              ) : (
                /* ORDERS */
                <div className="space-y-5">
                  {filteredOrders.map((order) => {
                    const totalItems =
                      order.order_items?.reduce(
                        (total, item) =>
                          total +
                          Number(item.quantity || 0),
                        0
                      ) || 0;

                    const statusConfig = getStatusConfig(
                      order.order_status
                    );

                    const StatusIcon = statusConfig.icon;

                    return (
                      <article
                        key={order.id}
                        className="bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
                      >
                        {/* ORDER TOP BAR */}
                        <div className="p-4 sm:p-5 border-b border-slate-100">
                          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

                            {/* ORDER ID */}
                            <div className="flex items-center gap-3">
                              <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                                <Package
                                  size={21}
                                  className="text-blue-600"
                                />
                              </div>

                              <div>
                                <div className="flex items-center gap-2">
                                  <p className="text-xs text-slate-400 font-medium">
                                    Order ID
                                  </p>

                                  <Hash
                                    size={13}
                                    className="text-slate-300"
                                  />
                                </div>

                                <p
                                  className="font-bold text-slate-800 text-sm sm:text-base"
                                  title={order.id}
                                >
                                  {getOrderId(order.id)}
                                </p>
                              </div>
                            </div>

                            {/* STATUS + ACTIONS */}
                            <div className="flex flex-wrap items-center gap-2">

                              {/* STATUS BADGE */}
                              <div
                                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl border ${statusConfig.bg} ${statusConfig.text} ${statusConfig.border}`}
                              >
                                <StatusIcon size={15} />

                                <span className="text-xs font-bold">
                                  {order.order_status}
                                </span>
                              </div>

                              {/* UPDATE STATUS */}
                              <div className="relative">
                                <select
                                  value={
                                    selectedStatus[order.id] ||
                                    order.order_status
                                  }
                                  onChange={(e) =>
                                    handleStatusChange(
                                      order.id,
                                      e.target.value
                                    )
                                  }
                                  className="appearance-none bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 py-2.5 pl-3 pr-9 outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 cursor-pointer"
                                >
                                  {statusArray
                                    .filter(
                                      (status) =>
                                        status !== "All"
                                    )
                                    .map((status) => (
                                      <option
                                        key={status}
                                        value={status}
                                      >
                                        {status}
                                      </option>
                                    ))}
                                </select>

                                <ChevronDown
                                  size={14}
                                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                                />
                              </div>

                              {/* DELETE */}
                              <button
                                type="button"
                                onClick={() =>
                                  setDeleteConfirm({
                                    open: true,
                                    id: order.id,
                                  })
                                }
                                className="w-10 h-10 flex items-center justify-center rounded-xl border border-red-100 bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-all duration-200"
                                title="Delete Order"
                              >
                                <Trash2 size={17} />
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* ORDER SUMMARY */}
                        <div className="grid grid-cols-2 lg:grid-cols-4 border-b border-slate-100">

                          <div className="p-4 sm:p-5 border-r border-slate-100">
                            <div className="flex items-center gap-2 text-slate-400 mb-1">
                              <CalendarDays size={14} />

                              <span className="text-xs font-medium">
                                Placed At
                              </span>
                            </div>

                            <p className="text-sm font-semibold text-slate-700">
                              {new Date(
                                order.created_at
                              ).toLocaleDateString()}
                            </p>

                            <p className="text-xs text-slate-400 mt-0.5">
                              {new Date(
                                order.created_at
                              ).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </p>
                          </div>

                          <div className="p-4 sm:p-5 lg:border-r border-slate-100">
                            <div className="flex items-center gap-2 text-slate-400 mb-1">
                              <ShoppingBag size={14} />

                              <span className="text-xs font-medium">
                                Total Items
                              </span>
                            </div>

                            <p className="text-sm font-semibold text-slate-700">
                              {totalItems}{" "}
                              {totalItems === 1
                                ? "Item"
                                : "Items"}
                            </p>
                          </div>

                          <div className="p-4 sm:p-5 border-r border-slate-100">
                            <div className="flex items-center gap-2 text-slate-400 mb-1">
                              <IndianRupee size={14} />

                              <span className="text-xs font-medium">
                                Total Amount
                              </span>
                            </div>

                            <p className="text-lg font-bold text-slate-900">
                              ₹
                              {Number(
                                order.total_price || 0
                              ).toLocaleString("en-IN")}
                            </p>
                          </div>

                          <div className="p-4 sm:p-5">
                            <div className="flex items-center gap-2 text-slate-400 mb-1">
                              <User size={14} />

                              <span className="text-xs font-medium">
                                Customer
                              </span>
                            </div>

                            <p className="text-sm font-semibold text-slate-300 truncate">
                              {order.user_email || "N/A"}
                            </p>
                            <p className="text-sm font-semibold text-slate-700 truncate">
                              {order.user_name || "N/A"}
                            </p>
                          </div>
                        </div>

                        {/* BODY */}
                        <div className="p-4 sm:p-5">
                          <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">

                            {/* SHIPPING INFO */}
                            <div className="xl:col-span-1">
                              <div className="flex items-center gap-2 mb-3">
                                <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center">
                                  <MapPin
                                    size={16}
                                    className="text-indigo-600"
                                  />
                                </div>

                                <div>
                                  <h3 className="text-sm font-bold text-slate-800">
                                    Shipping Information
                                  </h3>

                                  <p className="text-[11px] text-slate-400">
                                    Delivery details
                                  </p>
                                </div>
                              </div>

                              <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 space-y-3">

                                <div className="flex gap-3">
                                  <User
                                    size={15}
                                    className="text-slate-400 mt-0.5 shrink-0"
                                  />

                                  <div>
                                    <p className="text-[11px] text-slate-400">
                                      Name
                                    </p>

                                    <p className="text-sm font-semibold text-slate-700">
                                      {order.shipping_info
                                        ?.full_name ||
                                        "N/A"}
                                    </p>
                                  </div>
                                </div>

                                <div className="flex gap-3">
                                  <Phone
                                    size={15}
                                    className="text-slate-400 mt-0.5 shrink-0"
                                  />

                                  <div>
                                    <p className="text-[11px] text-slate-400">
                                      Phone
                                    </p>

                                    <p className="text-sm font-semibold text-slate-700">
                                      {order.shipping_info
                                        ?.phone || "N/A"}
                                    </p>
                                  </div>
                                </div>

                                <div className="flex gap-3">
                                  <MapPin
                                    size={15}
                                    className="text-slate-400 mt-0.5 shrink-0"
                                  />

                                  <div>
                                    <p className="text-[11px] text-slate-400">
                                      Address
                                    </p>

                                    <p className="text-sm font-medium text-slate-600 leading-5">
                                      {order.shipping_info
                                        ?.address ||
                                        "N/A"}
                                      {order
                                        .shipping_info
                                        ?.city
                                        ? `, ${order.shipping_info.city}`
                                        : ""}
                                      {order
                                        .shipping_info
                                        ?.state
                                        ? `, ${order.shipping_info.state}`
                                        : ""}
                                      {order
                                        .shipping_info
                                        ?.pincode
                                        ? ` - ${order.shipping_info.pincode}`
                                        : ""}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* ORDERED ITEMS */}
                            <div className="xl:col-span-2">
                              <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center gap-2">
                                  <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center">
                                    <ShoppingBag
                                      size={16}
                                      className="text-emerald-600"
                                    />
                                  </div>

                                  <div>
                                    <h3 className="text-sm font-bold text-slate-800">
                                      Ordered Items
                                    </h3>

                                    <p className="text-[11px] text-slate-400">
                                      Products in this order
                                    </p>
                                  </div>
                                </div>

                                <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-slate-100 text-slate-600">
                                  {totalItems}{" "}
                                  {totalItems === 1
                                    ? "Item"
                                    : "Items"}
                                </span>
                              </div>

                              <div className="space-y-2">
                                {Array.isArray(
                                  order.order_items
                                ) &&
                                  order.order_items.map(
                                    (item) => (
                                      <div
                                        key={
                                          item.order_item_id
                                        }
                                        className="flex flex-col sm:flex-row sm:items-center gap-3 p-3 rounded-xl border border-slate-100 hover:border-slate-200 hover:bg-slate-50/70 transition-all"
                                      >
                                        {/* PRODUCT IMAGE */}
                                        <div className="relative shrink-0">
                                          {item.image ? (
                                            <button
                                              type="button"
                                              onClick={() =>
                                                setPreviewImage(
                                                  item.image
                                                )
                                              }
                                              className="relative w-16 h-16 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 group"
                                            >
                                              <img
                                                src={
                                                  item.image
                                                }
                                                alt={
                                                  item.title ||
                                                  "Product"
                                                }
                                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                                              />

                                              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 flex items-center justify-center transition-all">
                                                <Eye
                                                  size={17}
                                                  className="text-white opacity-0 group-hover:opacity-100 transition-opacity"
                                                />
                                              </div>
                                            </button>
                                          ) : (
                                            <div className="w-16 h-16 rounded-xl bg-slate-100 flex items-center justify-center border border-slate-200">
                                              <Package
                                                size={22}
                                                className="text-slate-400"
                                              />
                                            </div>
                                          )}
                                        </div>

                                        {/* PRODUCT INFO */}
                                        <div className="flex-1 min-w-0">
                                          <p className="font-semibold text-sm text-slate-800 truncate">
                                            {item.title ||
                                              "Product"}
                                          </p>

                                          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1">
                                            <span className="text-xs text-slate-500">
                                              Qty:{" "}
                                              <strong className="text-slate-700">
                                                {
                                                  item.quantity
                                                }
                                              </strong>
                                            </span>

                                            <span className="hidden sm:block w-1 h-1 rounded-full bg-slate-300" />

                                            <span className="text-xs text-slate-500">
                                              Price:{" "}
                                              <strong className="text-slate-700">
                                                ₹
                                                {Number(
                                                  item.price ||
                                                  0
                                                ).toLocaleString(
                                                  "en-IN"
                                                )}
                                              </strong>
                                            </span>
                                          </div>
                                        </div>

                                        {/* ITEM TOTAL */}
                                        <div className="sm:text-right pl-[76px] sm:pl-0">
                                          <p className="text-[11px] text-slate-400">
                                            Item Total
                                          </p>

                                          <p className="font-bold text-slate-900 text-sm">
                                            ₹
                                            {(
                                              Number(
                                                item.quantity ||
                                                0
                                              ) *
                                              Number(
                                                item.price || 0
                                              )
                                            ).toLocaleString(
                                              "en-IN"
                                            )}
                                          </p>
                                        </div>
                                      </div>
                                    )
                                  )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </article>
                    );
                  })}
                </div>
              )}
            </>
          )}
        </div>
      </main>

      {/* IMAGE PREVIEW MODAL */}
      {previewImage && (
        <div
          className="fixed inset-0 z-[60] bg-black/75 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setPreviewImage(null)}
        >
          <div
            className="relative max-w-4xl max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setPreviewImage(null)}
              className="absolute -top-3 -right-3 z-10 w-10 h-10 rounded-full bg-white text-slate-700 shadow-lg flex items-center justify-center hover:bg-slate-100 transition-all"
              aria-label="Close image preview"
            >
              <X size={19} />
            </button>

            <div className="bg-white rounded-2xl p-2 shadow-2xl">
              <img
                src={previewImage}
                alt="Product Preview"
                className="max-w-[85vw] max-h-[82vh] object-contain rounded-xl"
              />
            </div>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {deleteConfirm.open && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div
            className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* ICON */}
            <div className="pt-8 flex justify-center">
              <div className="w-16 h-16 rounded-2xl bg-red-50 flex items-center justify-center">
                <div className="w-11 h-11 rounded-xl bg-red-500 flex items-center justify-center">
                  <Trash2
                    size={21}
                    className="text-white"
                  />
                </div>
              </div>
            </div>

            {/* CONTENT */}
            <div className="px-6 sm:px-8 pt-5 pb-8 text-center">
              <p className="text-xs font-bold uppercase tracking-wider text-red-500 mb-2">
                Permanent Action
              </p>

              <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                Delete this order?
              </h3>

              <p className="mt-3 text-sm text-slate-500 leading-6">
                Are you sure you want to delete this order?
                This action will permanently remove the order
                from your records.
              </p>

              <div className="mt-4 px-4 py-3 rounded-xl bg-red-50 border border-red-100">
                <p className="text-xs text-red-600 font-medium">
                  This action cannot be undone.
                </p>
              </div>

              {/* BUTTONS */}
              <div className="flex flex-col-reverse sm:flex-row gap-3 mt-7">
                <button
                  type="button"
                  onClick={() =>
                    setDeleteConfirm({
                      open: false,
                      id: null,
                    })
                  }
                  className="flex-1 px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-700 font-semibold text-sm hover:bg-slate-100 transition-all"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={confirmDelete}
                  className="flex-1 px-4 py-3 rounded-xl bg-red-500 text-white font-semibold text-sm hover:bg-red-600 shadow-sm hover:shadow-md transition-all active:scale-[0.98] flex items-center justify-center gap-2"
                >
                  <Trash2 size={16} />
                  Yes, Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Orders;