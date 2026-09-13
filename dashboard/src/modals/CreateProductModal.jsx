import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createNewProduct } from "../store/slices/productsSlice";
import { toggleCreateProductModal } from "../store/slices/extraSlice";
import { LoaderCircle, X, Upload, PackagePlus } from "lucide-react";

const CreateProductModal = () => {
  const { loading } = useSelector((state) => state.product);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Electronics",
    stock: "",
    images: [],
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

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData();

    data.append("name", formData.name);
    data.append("description", formData.description);
    data.append("price", formData.price);
    data.append("category", formData.category);
    data.append("stock", formData.stock);

    for (let i = 0; i < formData.images.length; i++) {
      data.append("images", formData.images[i]);
    }

    dispatch(createNewProduct(data));
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">

      {/* MODAL */}
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden relative">

        {/* HEADER */}
        <div className="px-6 py-5 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-indigo-50">

          <button
            type="button"
            onClick={() => dispatch(toggleCreateProductModal())}
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

          <div className="flex items-center gap-3">

            <div className="
              w-11
              h-11
              rounded-xl
              bg-blue-600
              text-white
              flex
              items-center
              justify-center
              shadow-lg
              shadow-blue-200
            ">
              <PackagePlus className="w-6 h-6" />
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-900">
                Create New Product
              </h2>

              <p className="text-sm text-gray-500 mt-0.5">
                Add a new product to your store
              </p>
            </div>

          </div>
        </div>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="p-6 space-y-5 max-h-[75vh] overflow-y-auto"
        >

          {/* PRODUCT NAME + CATEGORY */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

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
                  focus:border-blue-500
                  focus:ring-4
                  focus:ring-blue-100
                  transition
                "
              />
            </div>

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
                  focus:border-blue-500
                  focus:ring-4
                  focus:ring-blue-100
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

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Price
              </label>

              <div className="relative">

                <span className="
                  absolute
                  left-4
                  top-1/2
                  -translate-y-1/2
                  text-gray-500
                  font-medium
                ">
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
                    focus:border-blue-500
                    focus:ring-4
                    focus:ring-blue-100
                    transition
                  "
                />

              </div>
            </div>

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
                  focus:border-blue-500
                  focus:ring-4
                  focus:ring-blue-100
                  transition
                "
              />
            </div>

          </div>

          {/* IMAGE UPLOAD */}
          <div>

            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Product Images
            </label>

            <label
              className="
                flex
                flex-col
                items-center
                justify-center
                w-full
                min-h-[130px]
                border-2
                border-dashed
                border-gray-200
                rounded-xl
                bg-gray-50
                hover:bg-blue-50
                hover:border-blue-300
                transition-all
                cursor-pointer
              "
            >

              <div className="
                w-11
                h-11
                rounded-full
                bg-blue-100
                text-blue-600
                flex
                items-center
                justify-center
                mb-2
              ">
                <Upload className="w-5 h-5" />
              </div>

              <p className="text-sm font-medium text-gray-700">
                Click to upload images
              </p>

              <p className="text-xs text-gray-400 mt-1">
                PNG, JPG, JPEG or WEBP
              </p>

              <input
                type="file"
                multiple
                accept="image/*"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    images: Array.from(e.target.files),
                  })
                }
                className="hidden"
              />

            </label>

            {formData.images.length > 0 && (
              <p className="text-xs text-blue-600 mt-2 font-medium">
                {formData.images.length} image
                {formData.images.length > 1 ? "s" : ""} selected
              </p>
            )}

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
                focus:border-blue-500
                focus:ring-4
                focus:ring-blue-100
                transition
              "
              rows={4}
            />

          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="
              w-full
              flex
              items-center
              justify-center
              gap-2
              bg-blue-600
              hover:bg-blue-700
              active:scale-[0.99]
              text-white
              py-3
              px-6
              rounded-xl
              font-semibold
              shadow-lg
              shadow-blue-200
              transition-all
              disabled:opacity-60
              disabled:cursor-not-allowed
            "
          >

            {loading ? (
              <>
                <LoaderCircle className="w-5 h-5 animate-spin" />
                Creating Product...
              </>
            ) : (
              <>
                <PackagePlus className="w-5 h-5" />
                Add New Product
              </>
            )}

          </button>

        </form>
      </div>
    </div>
  );
};

export default CreateProductModal;