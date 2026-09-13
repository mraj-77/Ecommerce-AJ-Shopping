import React, { useState, useEffect } from "react";
import {
  LoaderCircle,
  Plus,
  Package,
  Pencil,
  Trash2,
  Star,
  Eye,
  ChevronLeft,
  ChevronRight,
  Layers3,
  IndianRupee,
} from "lucide-react";
import CreateProductModal from "../modals/CreateProductModal";
import { useDispatch, useSelector } from "react-redux";
import Header from "./Header";
import UpdateProductModal from "../modals/UpdateProductModal";
import ViewProductModal from "../modals/ViewProductModal";
import {
  toggleCreateProductModal,
  toggleUpdateProductModal,
  toggleViewProductModal,
} from "../store/slices/extraSlice";
import {
  deleteProduct,
  fetchAllProducts,
} from "../store/slices/productsSlice";

const Products = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [maxPage, setMaxPage] = useState(null);
  const [page, setPage] = useState(1);

  const dispatch = useDispatch();

  const {
    isViewProductModalOpened,
    isCreateProductModalOpened,
    isUpdateProductModalOpened,
  } = useSelector((state) => state.extra);

  const {
    loading,
    products,
    totalProducts,
    fetchingProducts,
  } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(fetchAllProducts(page));
  }, [dispatch, page]);

  useEffect(() => {
    if (totalProducts !== undefined) {
      const newMax = Math.ceil(totalProducts / 10);
      setMaxPage(newMax || 1);
    }
  }, [totalProducts]);

  useEffect(() => {
    if (maxPage && page > maxPage) {
      setPage(maxPage);
    }
  }, [maxPage, page]);

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
                    Product Management
                  </span>
                </div>

                <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                  All Products
                </h1>

                <p className="text-sm text-slate-500 mt-1">
                  Manage your store products, inventory and pricing.
                </p>
              </div>

              {/* PRODUCT COUNT */}
              <div className="flex items-center gap-3 bg-white border border-slate-200 rounded-2xl px-4 py-3 shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                  <Layers3
                    size={20}
                    className="text-blue-600"
                  />
                </div>

                <div>
                  <p className="text-xs text-slate-400 font-medium">
                    Total Products
                  </p>

                  <p className="text-lg font-bold text-slate-900">
                    {totalProducts ?? products?.length ?? 0}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* PRODUCTS CONTAINER */}
          <section className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">

            {/* TABLE HEADER */}
            <div className="px-4 sm:px-6 py-4 border-b border-slate-100">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center">
                    <Package
                      size={20}
                      className="text-slate-600"
                    />
                  </div>

                  <div>
                    <h2 className="text-sm sm:text-base font-bold text-slate-800">
                      Product Inventory
                    </h2>

                    <p className="text-xs text-slate-400 mt-0.5">
                      View and manage your products
                    </p>
                  </div>
                </div>

                {!fetchingProducts && products?.length > 0 && (
                  <div className="text-xs font-medium text-slate-500">
                    Showing{" "}
                    <span className="font-bold text-slate-700">
                      {products.length}
                    </span>{" "}
                    products
                  </div>
                )}
              </div>
            </div>

            {/* CONTENT */}
            {fetchingProducts ? (
              <div className="flex flex-col items-center justify-center py-24">
                <div className="w-12 h-12 rounded-full border-4 border-slate-200 border-t-blue-600 animate-spin" />

                <p className="mt-4 text-sm font-semibold text-slate-600">
                  Loading products...
                </p>

                <p className="text-xs text-slate-400 mt-1">
                  Fetching your inventory
                </p>
              </div>
            ) : products && products.length > 0 ? (
              <>
                {/* DESKTOP / TABLET TABLE */}
                <div className="overflow-x-auto">
                  <table className="min-w-[900px] w-full">

                    {/* TABLE HEAD */}
                    <thead className="bg-slate-50 border-b border-slate-200">
                      <tr>
                        <th className="py-4 px-5 text-left text-[11px] font-bold uppercase tracking-wider text-slate-400">
                          Product
                        </th>

                        <th className="py-4 px-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-400">
                          Category
                        </th>

                        <th className="py-4 px-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-400">
                          Price
                        </th>

                        <th className="py-4 px-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-400">
                          Stock
                        </th>

                        <th className="py-4 px-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-400">
                          Rating
                        </th>

                        <th className="py-4 px-5 text-right text-[11px] font-bold uppercase tracking-wider text-slate-400">
                          Actions
                        </th>
                      </tr>
                    </thead>

                    {/* TABLE BODY */}
                    <tbody>
                      {products.map((product, index) => {
                        const imageUrl =
                          product?.images?.[0]?.url;

                        const stock = Number(
                          product?.stock || 0
                        );

                        const rating = Number(
                          product?.ratings || 0
                        );

                        return (
                          <tr
                            key={product?.id || index}
                            className="border-b border-slate-100 last:border-b-0 hover:bg-slate-50/70 transition-colors cursor-pointer"
                            onClick={() => {
                              setSelectedProduct(product);
                              dispatch(
                                toggleViewProductModal()
                              );
                            }}
                          >
                            {/* PRODUCT */}
                            <td className="py-4 px-5">
                              <div className="flex items-center gap-3 min-w-[240px]">

                                {/* IMAGE */}
                                <div className="w-14 h-14 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
                                  {imageUrl ? (
                                    <img
                                      src={imageUrl}
                                      alt={
                                        product?.name ||
                                        "Product"
                                      }
                                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                    />
                                  ) : (
                                    <div className="w-full h-full flex items-center justify-center">
                                      <Package
                                        size={22}
                                        className="text-slate-400"
                                      />
                                    </div>
                                  )}
                                </div>

                                {/* NAME */}
                                <div className="min-w-0">
                                  <p className="font-semibold text-sm text-slate-800 truncate max-w-[220px]">
                                    {product?.name ||
                                      "Unnamed Product"}
                                  </p>

                                  <p className="text-xs text-slate-400 mt-1">
                                    Product ID:{" "}
                                    {product?.id
                                      ? String(
                                        product.id
                                      ).slice(0, 8)
                                      : "N/A"}
                                  </p>
                                </div>
                              </div>
                            </td>

                            {/* CATEGORY */}
                            <td className="px-4 py-4">
                              <span className="inline-flex items-center px-2.5 py-1.5 rounded-lg bg-slate-100 text-slate-600 text-xs font-semibold">
                                {product?.category ||
                                  "Uncategorized"}
                              </span>
                            </td>

                            {/* PRICE */}
                            <td className="px-4 py-4">
                              <div className="flex items-center gap-1">
                                <IndianRupee
                                  size={14}
                                  className="text-slate-400"
                                />

                                <span className="font-bold text-slate-800 text-sm">
                                  {Number(
                                    product?.price || 0
                                  ).toLocaleString(
                                    "en-IN"
                                  )}
                                </span>
                              </div>
                            </td>

                            {/* STOCK */}
                            <td className="px-4 py-4">
                              <span
                                className={`inline-flex items-center px-2.5 py-1.5 rounded-lg text-xs font-bold ${stock === 0
                                    ? "bg-red-50 text-red-600"
                                    : stock <= 10
                                      ? "bg-amber-50 text-amber-700"
                                      : "bg-emerald-50 text-emerald-700"
                                  }`}
                              >
                                {stock === 0
                                  ? "Out of Stock"
                                  : stock <= 10
                                    ? `${stock} Left`
                                    : `${stock} In Stock`}
                              </span>
                            </td>

                            {/* RATING */}
                            <td className="px-4 py-4">
                              <div className="flex items-center gap-1.5">
                                <Star
                                  size={15}
                                  className="fill-amber-400 text-amber-400"
                                />

                                <span className="font-semibold text-sm text-slate-700">
                                  {rating.toFixed(1)}
                                </span>
                              </div>
                            </td>

                            {/* ACTIONS */}
                            <td
                              className="px-5 py-4"
                              onClick={(e) =>
                                e.stopPropagation()
                              }
                            >
                              <div className="flex items-center justify-end gap-2">

                                {/* VIEW */}
                                <button
                                  type="button"
                                  onClick={() => {
                                    setSelectedProduct(
                                      product
                                    );
                                    dispatch(
                                      toggleViewProductModal()
                                    );
                                  }}
                                  className="w-9 h-9 rounded-lg border border-slate-200 bg-white text-slate-500 hover:bg-slate-900 hover:text-white hover:border-slate-900 flex items-center justify-center transition-all"
                                  title="View Product"
                                >
                                  <Eye size={16} />
                                </button>

                                {/* UPDATE */}
                                <button
                                  type="button"
                                  onClick={() => {
                                    setSelectedProduct(
                                      product
                                    );
                                    dispatch(
                                      toggleUpdateProductModal()
                                    );
                                  }}
                                  className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white flex items-center justify-center transition-all"
                                  title="Update Product"
                                >
                                  <Pencil size={16} />
                                </button>

                                {/* DELETE */}
                                <button
                                  type="button"
                                  onClick={() => {
                                    setSelectedProduct(
                                      product
                                    );
                                    dispatch(
                                      deleteProduct(
                                        product.id,
                                        page
                                      )
                                    );
                                  }}
                                  className="min-w-9 h-9 rounded-lg bg-red-50 text-red-500 hover:bg-red-500 hover:text-white flex items-center justify-center transition-all px-2"
                                  title="Delete Product"
                                >
                                  {selectedProduct?.id ===
                                    product.id &&
                                    loading ? (
                                    <div className="flex items-center gap-1.5">
                                      <LoaderCircle
                                        size={15}
                                        className="animate-spin"
                                      />

                                      <span className="text-xs font-semibold">
                                        Deleting
                                      </span>
                                    </div>
                                  ) : (
                                    <Trash2 size={16} />
                                  )}
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                {/* PAGINATION */}
                {!fetchingProducts && (
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-4 sm:px-6 py-4 border-t border-slate-100 bg-slate-50/50">

                    <p className="text-xs text-slate-500">
                      Page{" "}
                      <span className="font-bold text-slate-700">
                        {page}
                      </span>{" "}
                      of{" "}
                      <span className="font-bold text-slate-700">
                        {maxPage || 1}
                      </span>
                    </p>

                    <div className="flex items-center gap-2">

                      <button
                        type="button"
                        onClick={() =>
                          setPage((prev) =>
                            Math.max(prev - 1, 1)
                          )
                        }
                        disabled={page === 1}
                        className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-200 bg-white text-slate-600 text-xs font-semibold hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                      >
                        <ChevronLeft size={15} />
                        Previous
                      </button>

                      <div className="hidden sm:flex items-center justify-center min-w-10 h-9 px-3 rounded-xl bg-blue-600 text-white text-xs font-bold">
                        {page}
                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          setPage((prev) =>
                            Math.min(
                              prev + 1,
                              maxPage
                            )
                          )
                        }
                        disabled={
                          page === maxPage ||
                          !maxPage
                        }
                        className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-200 bg-white text-slate-600 text-xs font-semibold hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                      >
                        Next
                        <ChevronRight size={15} />
                      </button>
                    </div>
                  </div>
                )}
              </>
            ) : (
              /* EMPTY STATE */
              <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
                <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center">
                  <Package
                    size={30}
                    className="text-slate-400"
                  />
                </div>

                <h3 className="text-xl font-bold text-slate-800 mt-5">
                  No Products Found
                </h3>

                <p className="text-sm text-slate-500 mt-2 max-w-sm">
                  Your product inventory is empty. Add your
                  first product to get started.
                </p>

                <button
                  type="button"
                  onClick={() =>
                    dispatch(toggleCreateProductModal())
                  }
                  className="mt-5 flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold shadow-sm hover:shadow-md transition-all"
                >
                  <Plus size={17} />
                  Add Product
                </button>
              </div>
            )}
          </section>
        </div>

        {/* CREATE PRODUCT BUTTON */}
        <button
          type="button"
          onClick={() =>
            dispatch(toggleCreateProductModal())
          }
          className="fixed bottom-6 right-6 w-14 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl shadow-lg hover:shadow-xl flex items-center justify-center z-50 transition-all duration-300 hover:-translate-y-1"
          title="Create New Product"
        >
          <Plus size={23} />
        </button>
      </main>

      {/* MODALS */}
      {isCreateProductModalOpened && <CreateProductModal />}

      {isUpdateProductModalOpened && (
        <UpdateProductModal
          selectedProduct={selectedProduct}
        />
      )}

      {isViewProductModalOpened && (
        <ViewProductModal
          selectedProduct={selectedProduct}
        />
      )}
    </>
  );
};

export default Products;