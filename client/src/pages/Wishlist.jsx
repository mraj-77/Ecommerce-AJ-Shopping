import { Heart, ShoppingCart, Trash2, ArrowRight } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
    removeFromWishlist,
} from "../store/slices/wishlistSlice";
import { addToCart } from "../store/slices/cartSlice";
import { toast } from "react-toastify";

const Wishlist = () => {
    const dispatch = useDispatch();

    const { wishlist } = useSelector((state) => state.wishlist);

    // ==========================================
    // REMOVE FROM WISHLIST
    // ==========================================
    const handleRemove = (product) => {
        dispatch(removeFromWishlist(product));
        toast.success("Removed from wishlist");
    };

    // ==========================================
    // ADD TO CART
    // ==========================================
    const handleAddToCart = (product) => {
        dispatch(
            addToCart({
                product,
                quantity: 1,
            })
        );

        toast.success("Added to cart");
    };

    return (
        <div className="min-h-screen pt-20">
            <div className="container mx-auto px-4 py-8">

                {/* ==========================================
            HEADER
        ========================================== */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-foreground">
                            My Wishlist
                        </h1>

                        <p className="text-muted-foreground mt-1">
                            {wishlist.length}{" "}
                            {wishlist.length === 1 ? "item" : "items"} saved
                        </p>
                    </div>

                    <Heart className="w-8 h-8 text-primary fill-current" />
                </div>

                {/* ==========================================
            EMPTY WISHLIST
        ========================================== */}
                {wishlist.length === 0 ? (
                    <div className="glass-card min-h-[400px] flex flex-col items-center justify-center text-center p-8">

                        <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-5">
                            <Heart className="w-10 h-10 text-primary" />
                        </div>

                        <h2 className="text-2xl font-semibold text-foreground mb-2">
                            Your wishlist is empty
                        </h2>

                        <p className="text-muted-foreground max-w-md mb-6">
                            Save your favorite products here and come back whenever
                            you're ready to buy.
                        </p>

                        <Link
                            to="/products"
                            className="flex items-center gap-2 px-6 py-3 gradient-primary text-primary-foreground rounded-lg font-semibold hover:glow-on-hover animate-smooth"
                        >
                            Explore Products
                            <ArrowRight className="w-5 h-5" />
                        </Link>

                    </div>
                ) : (

                    /* ==========================================
                        WISHLIST PRODUCTS
                    ========================================== */
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

                        {wishlist.map((product) => (

                            <div
                                key={product.id}
                                className="glass-card overflow-hidden group"
                            >

                                {/* ==========================================
                    PRODUCT IMAGE
                ========================================== */}
                                <Link to={`/product/${product.id}`}>
                                    <div className="relative h-64 overflow-hidden">

                                        <img
                                            src={product.images?.[0]?.url}
                                            alt={product.name}
                                            className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
                                        />

                                        {/* REMOVE BUTTON */}
                                        <button
                                            onClick={(e) => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                                handleRemove(product);
                                            }}
                                            className="absolute top-3 right-3 w-10 h-10 rounded-full bg-background/80 backdrop-blur-md flex items-center justify-center text-muted-foreground hover:text-red-500 transition"
                                        >
                                            <Trash2 className="w-5 h-5" />
                                        </button>

                                    </div>
                                </Link>

                                {/* ==========================================
                    PRODUCT INFO
                ========================================== */}
                                <div className="p-5">

                                    <Link to={`/product/${product.id}`}>
                                        <h2 className="text-lg font-semibold text-foreground line-clamp-2 hover:text-primary transition">
                                            {product.name}
                                        </h2>
                                    </Link>

                                    <p className="text-xl font-bold text-primary mt-3">
                                        ₹{product.price}
                                    </p>

                                    {/* ==========================================
                      ADD TO CART
                  ========================================== */}
                                    <button
                                        onClick={() => handleAddToCart(product)}
                                        disabled={product.stock === 0}
                                        className="w-full mt-4 flex items-center justify-center gap-2 py-3 gradient-primary text-primary-foreground rounded-lg font-semibold hover:glow-on-hover animate-smooth disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <ShoppingCart className="w-5 h-5" />

                                        {product.stock === 0
                                            ? "Out of Stock"
                                            : "Add to Cart"}
                                    </button>

                                </div>
                            </div>

                        ))}

                    </div>
                )}

            </div>
        </div>
    );
};

export default Wishlist;