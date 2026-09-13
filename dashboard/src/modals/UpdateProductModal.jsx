import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleUpdateProductModal } from "../store/slices/extraSlice";
import {
  LoaderCircle,
  X,
  PackageCheck,
} from "lucide-react";
import { updateProduct } from "../store/slices/productsSlice";

const UpdateProductModal = ({ selectedProduct }) => {
  const { loading } = useSelector((state) => state.product);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stock: "",
  });

  const categoryOptions = [
    "Electronics",
    "Fashion",
    "Sports",
    "Books",
    "Beauty",
    "Sweets",
    "Kids & Baby",
    "Drinks",
    "Foods",
    "Fruits",
  ];

  useEffect(() => {
    if (selectedProduct) {
      setFormData({
        name: selectedProduct.name || "",
        description: selectedProduct.description || "",
        price: selectedProduct.price || "",
        category: selectedProduct.category || "",
        stock: selectedProduct.stock || "",
      });
    }
  }, [selectedProduct]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      name: formData.name,
      description: formData.description,
      price: formData.price,
      category: formData.category,
      stock: formData.stock,
    };

    dispatch(updateProduct(data, selectedProduct.id));
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">

      {/* MODAL */}
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden relative">

        {/* HEADER */}
        <div className="px-6 py-5 border-b border-gray-100 bg-gradient-to-r from-green-50 to-emerald-50">

          {/* CLOSE BUTTON */}
          <button
            type="button"
            onClick={() =>
              dispatch(toggleUpdateProductModal())
            }
            className="
              absolute
              top-4
              right-4
              w-9
              h-9
              rounded-full
              flex
              items-center
              justify-center
              text-gray-500
              bg-white
              border
              border-gray-200
              hover:bg-red-50
              hover:text-red-500
              hover:border-red-200
              transition-all
            "
          >
            <X className="w-5 h-5" />
          </button>

          {/* TITLE */}
          <div className="flex items-center gap-3">

            <div
              className="
                w-11
                h-11
                rounded-xl
                bg-green-600
                text-white
                flex
                items-center
                justify-center
                shadow-lg
                shadow-green-200
              "
            >
              <PackageCheck className="w-6 h-6" />
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-900">
                Update Product
              </h2>

              <p className="text-sm text-gray-500 mt-0.5">
                Modify your product information
              </p>
            </div>

          </div>
        </div>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="
            p-6
            space-y-5
            max-h-[75vh]
            overflow-y-auto
          "
        >

          {/* PRODUCT NAME + CATEGORY */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            {/* PRODUCT NAME */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Product Name
              </label>

              <input
                type="text"
                placeholder="Enter product name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    name: e.target.value,
                  })
                }
                className="
                  w-full
                  border
                  border-gray-200
                  px-4
                  py-2.5
                  rounded-xl
                  outline-none
                  text-gray-800
                  placeholder:text-gray-400
                  focus:border-green-500
                  focus:ring-4
                  focus:ring-green-100
                  transition
                "
              />
            </div>

            {/* CATEGORY */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Category
              </label>

              <select
                className="
                  w-full
                  border
                  border-gray-200
                  px-4
                  py-2.5
                  rounded-xl
                  outline-none
                  bg-white
                  text-gray-800
                  focus:border-green-500
                  focus:ring-4
                  focus:ring-green-100
                  transition
                "
                value={formData.category}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    category: e.target.value,
                  })
                }
                required
              >
                {categoryOptions.map((cat, idx) => (
                  <option key={idx} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

          </div>

          {/* PRICE + STOCK */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            {/* PRICE */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Price
              </label>

              <div className="relative">

                <span
                  className="
                    absolute
                    left-4
                    top-1/2
                    -translate-y-1/2
                    text-gray-500
                    font-medium
                  "
                >
                  ₹
                </span>

                <input
                  type="number"
                  placeholder="0.00"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      price: e.target.value,
                    })
                  }
                  className="
                    w-full
                    border
                    border-gray-200
                    pl-9
                    pr-4
                    py-2.5
                    rounded-xl
                    outline-none
                    text-gray-800
                    focus:border-green-500
                    focus:ring-4
                    focus:ring-green-100
                    transition
                  "
                />

              </div>
            </div>

            {/* STOCK */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Stock
              </label>

              <input
                type="number"
                placeholder="Enter stock quantity"
                value={formData.stock}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    stock: e.target.value,
                  })
                }
                className="
                  w-full
                  border
                  border-gray-200
                  px-4
                  py-2.5
                  rounded-xl
                  outline-none
                  text-gray-800
                  placeholder:text-gray-400
                  focus:border-green-500
                  focus:ring-4
                  focus:ring-green-100
                  transition
                "
              />
            </div>

          </div>

          {/* DESCRIPTION */}
          <div>

            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Description
            </label>

            <textarea
              placeholder="Write a detailed description about your product..."
              value={formData.description}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  description: e.target.value,
                })
              }
              className="
                w-full
                border
                border-gray-200
                px-4
                py-3
                rounded-xl
                outline-none
                text-gray-800
                placeholder:text-gray-400
                resize-none
                focus:border-green-500
                focus:ring-4
                focus:ring-green-100
                transition
              "
              rows={4}
            />

          </div>

          {/* UPDATE BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="
              w-full
              flex
              items-center
              justify-center
              gap-2
              bg-green-600
              hover:bg-green-700
              active:scale-[0.99]
              text-white
              py-3
              px-6
              rounded-xl
              font-semibold
              shadow-lg
              shadow-green-200
              transition-all
              disabled:opacity-60
              disabled:cursor-not-allowed
            "
          >

            {loading ? (
              <>
                <LoaderCircle className="w-5 h-5 animate-spin" />
                Updating Product...
              </>
            ) : (
              <>
                <PackageCheck className="w-5 h-5" />
                Update Product
              </>
            )}

          </button>

        </form>
      </div>
    </div>
  );
};

export default UpdateProductModal;