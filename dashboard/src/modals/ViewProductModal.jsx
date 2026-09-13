import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  toggleViewProductModal,
} from "../store/slices/extraSlice";
import {
  X,
  Package,
  Tag,
  IndianRupee,
  Star,
  Boxes,
  CalendarDays,
  Hash,
  FileText,
  ChevronLeft,
  ChevronRight,
  Image as ImageIcon,
} from "lucide-react";

const ViewProductModal = ({ selectedProduct }) => {
  const dispatch = useDispatch();

  const [activeImage, setActiveImage] = useState(0);

  const images = selectedProduct?.images || [];

  const nextImage = () => {
    if (images.length === 0) return;

    setActiveImage((prev) =>
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    if (images.length === 0) return;

    setActiveImage((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-center items-center p-3 sm:p-5">

      <div className="bg-white rounded-2xl sm:rounded-3xl w-full max-w-5xl max-h-[94vh] overflow-hidden shadow-2xl relative">

        {/* ================= HEADER ================= */}
        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 px-4 sm:px-6 py-4 sm:py-5 text-white flex items-center justify-between">

          <div className="flex items-center gap-3 min-w-0">
            <div className="bg-white/20 p-2 sm:p-2.5 rounded-xl shrink-0">
              <Package size={22} />
            </div>

            <div className="min-w-0">
              <h2 className="text-lg sm:text-2xl font-bold truncate">
                Product Details
              </h2>

              <p className="text-blue-100 text-xs sm:text-sm">
                View complete product information
              </p>
            </div>
          </div>

          <button
            onClick={() => dispatch(toggleViewProductModal())}
            className="p-2 rounded-xl hover:bg-white/20 active:scale-95 transition shrink-0"
            aria-label="Close"
          >
            <X size={22} />
          </button>
        </div>

        {/* ================= CONTENT ================= */}
        <div className="p-4 sm:p-6 overflow-y-auto max-h-[calc(94vh-80px)]">

          {/* ================= PRODUCT TITLE ================= */}
          <div className="mb-5 sm:mb-6">

            <h3 className="text-xl sm:text-3xl font-bold text-gray-900 break-words">
              {selectedProduct.title}
            </h3>

            <div className="flex flex-wrap items-center gap-2 mt-2">

              <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-semibold">
                {selectedProduct.category}
              </span>

              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${selectedProduct.stock > 0
                    ? "bg-green-50 text-green-600"
                    : "bg-red-50 text-red-600"
                  }`}
              >
                {selectedProduct.stock > 0
                  ? "In Stock"
                  : "Out of Stock"}
              </span>
            </div>
          </div>

          {/* ================= MAIN GRID ================= */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">

            {/* ================================================= */}
            {/*                    IMAGE GALLERY                  */}
            {/* ================================================= */}
            <div>

              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <ImageIcon
                    size={18}
                    className="text-blue-600"
                  />

                  <h3 className="font-semibold text-gray-800">
                    Product Images
                  </h3>
                </div>

                {images.length > 0 && (
                  <span className="text-xs text-gray-500">
                    {activeImage + 1} / {images.length}
                  </span>
                )}
              </div>

              {/* ================= MAIN IMAGE ================= */}
              <div className="relative w-full aspect-square sm:aspect-[4/3] bg-gray-100 rounded-2xl overflow-hidden border border-gray-200 group">

                {images.length > 0 ? (
                  <>
                    <img
                      src={images[activeImage]?.url}
                      alt={selectedProduct.title}
                      className="w-full h-full object-contain bg-white transition-transform duration-500 group-hover:scale-[1.03]"
                    />

                    {/* Image Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />

                    {/* Previous */}
                    {images.length > 1 && (
                      <button
                        onClick={prevImage}
                        className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/90 shadow-lg flex items-center justify-center text-gray-700 hover:bg-white hover:scale-105 transition"
                        aria-label="Previous image"
                      >
                        <ChevronLeft size={20} />
                      </button>
                    )}

                    {/* Next */}
                    {images.length > 1 && (
                      <button
                        onClick={nextImage}
                        className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/90 shadow-lg flex items-center justify-center text-gray-700 hover:bg-white hover:scale-105 transition"
                        aria-label="Next image"
                      >
                        <ChevronRight size={20} />
                      </button>
                    )}

                    {/* Bottom Image Count */}
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-black/60 text-white text-xs px-3 py-1.5 rounded-full backdrop-blur-md">
                      {activeImage + 1} / {images.length}
                    </div>
                  </>
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-gray-400">
                    <ImageIcon size={45} />
                    <p className="mt-2 text-sm">
                      No images available
                    </p>
                  </div>
                )}
              </div>

              {/* ================= THUMBNAILS ================= */}
              {images.length > 1 && (
                <div className="mt-3">

                  <div className="flex gap-2.5 overflow-x-auto pb-1 scrollbar-thin">

                    {images.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveImage(idx)}
                        className={`relative shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden border-2 transition-all ${activeImage === idx
                            ? "border-blue-600 ring-2 ring-blue-100 scale-[1.03]"
                            : "border-gray-200 hover:border-blue-300"
                          }`}
                      >
                        <img
                          src={img?.url}
                          alt={`Product thumbnail ${idx + 1}`}
                          className="w-full h-full object-cover"
                        />

                        {activeImage === idx && (
                          <div className="absolute inset-0 bg-blue-600/10" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* ================================================= */}
            {/*                  PRODUCT INFORMATION              */}
            {/* ================================================= */}
            <div>

              <div className="flex items-center gap-2 mb-3">
                <FileText
                  size={18}
                  className="text-blue-600"
                />

                <h3 className="font-semibold text-gray-800">
                  Product Information
                </h3>
              </div>

              <div className="space-y-3">

                {/* ================= ID ================= */}
                <div className="bg-gray-50 border border-gray-100 rounded-xl p-3.5">
                  <div className="flex items-center gap-2 text-gray-500 text-xs mb-1">
                    <Hash size={14} />
                    Product ID
                  </div>

                  <p className="text-sm font-medium text-gray-800 break-all">
                    {selectedProduct.id}
                  </p>
                </div>

                {/* ================= DESCRIPTION ================= */}
                <div className="bg-gray-50 border border-gray-100 rounded-xl p-3.5">
                  <div className="flex items-center gap-2 text-gray-500 text-xs mb-1">
                    <FileText size={14} />
                    Description
                  </div>

                  <p className="text-sm text-gray-700 leading-relaxed">
                    {selectedProduct.description}
                  </p>
                </div>

                {/* ================= CATEGORY ================= */}
                <div className="bg-gray-50 border border-gray-100 rounded-xl p-3.5">
                  <div className="flex items-center gap-2 text-gray-500 text-xs mb-1">
                    <Tag size={14} />
                    Category
                  </div>

                  <p className="text-sm font-semibold text-gray-800">
                    {selectedProduct.category}
                  </p>
                </div>

                {/* ================= PRICE ================= */}
                <div className="bg-blue-50 border border-blue-100 rounded-xl p-3.5">
                  <div className="flex items-center gap-2 text-blue-600 text-xs mb-1">
                    <IndianRupee size={14} />
                    Price
                  </div>

                  <p className="text-xl font-bold text-blue-700">
                    ₹ {selectedProduct.price.toLocaleString()}
                  </p>
                </div>

                {/* ================= RATING ================= */}
                <div className="bg-yellow-50 border border-yellow-100 rounded-xl p-3.5">
                  <div className="flex items-center gap-2 text-yellow-600 text-xs mb-1">
                    <Star size={14} />
                    Ratings
                  </div>

                  <p className="text-sm font-semibold text-gray-800">
                    ⭐ {selectedProduct.ratings}
                  </p>
                </div>

                {/* ================= STOCK ================= */}
                <div
                  className={`rounded-xl p-3.5 border ${selectedProduct.stock > 0
                      ? "bg-green-50 border-green-100"
                      : "bg-red-50 border-red-100"
                    }`}
                >
                  <div
                    className={`flex items-center gap-2 text-xs mb-1 ${selectedProduct.stock > 0
                        ? "text-green-600"
                        : "text-red-600"
                      }`}
                  >
                    <Boxes size={14} />
                    Stock
                  </div>

                  <p
                    className={`text-sm font-semibold ${selectedProduct.stock > 0
                        ? "text-green-700"
                        : "text-red-700"
                      }`}
                  >
                    {selectedProduct.stock > 0
                      ? `In Stock (${selectedProduct.stock})`
                      : "Out of Stock"}
                  </p>
                </div>

                {/* ================= CREATED AT ================= */}
                <div className="bg-gray-50 border border-gray-100 rounded-xl p-3.5">
                  <div className="flex items-center gap-2 text-gray-500 text-xs mb-1">
                    <CalendarDays size={14} />
                    Created At
                  </div>

                  <p className="text-sm font-medium text-gray-800">
                    {new Date(
                      selectedProduct.created_at
                    ).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ================= FOOTER ================= */}
          <div className="mt-6 pt-4 border-t border-gray-200 flex justify-end">

            <button
              onClick={() => dispatch(toggleViewProductModal())}
              className="px-5 sm:px-6 py-2.5 rounded-xl bg-gray-900 text-white font-semibold hover:bg-gray-800 active:scale-[0.98] transition flex items-center gap-2"
            >
              <X size={18} />
              Close
            </button>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewProductModal;