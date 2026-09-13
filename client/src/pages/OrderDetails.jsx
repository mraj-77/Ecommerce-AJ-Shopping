import React from "react";
import {
    X,
    Package,
    MapPin,
    CreditCard,
    Calendar,
    User,
    Phone,
    Mail,
} from "lucide-react";

const OrderDetails = ({ order, onClose }) => {
    if (!order) return null;

    return (
        <div
            className="
                fixed inset-0 z-50
                flex items-center justify-center
                p-4
                bg-black/60
                backdrop-blur-md
            "
            onClick={onClose}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className="
                    w-full max-w-3xl
                    max-h-[90vh]
                    overflow-y-auto
                    [scrollbar-width:none]
                    [-ms-overflow-style:none]
                    [&::-webkit-scrollbar]:hidden
                    glass-card
                    rounded-2xl
                    p-6
                    shadow-2xl
                    border border-[hsla(var(--glass-border))]
                "
            >
                {/* HEADER */}
                <div className="flex items-start justify-between mb-6">
                    <div>
                        <div className="flex items-center gap-3">
                            <div
                                className="
                                    w-11 h-11
                                    rounded-xl
                                    bg-primary/10
                                    text-primary
                                    flex items-center justify-center
                                "
                            >
                                <Package className="w-5 h-5" />
                            </div>

                            <div>
                                <h2 className="text-xl font-bold text-foreground">
                                    Order Details
                                </h2>

                                <p className="text-sm text-muted-foreground">
                                    Order #{order.id}
                                </p>
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={onClose}
                        className="
                            w-9 h-9
                            rounded-lg
                            flex items-center justify-center
                            bg-secondary/70
                            text-muted-foreground
                            hover:text-foreground
                            hover:bg-secondary
                            transition-all
                        "
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* ORDER SUMMARY */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">

                    <div className="p-4 rounded-xl bg-secondary/40">
                        <div className="flex items-center gap-2 mb-2">
                            <Calendar className="w-4 h-4 text-primary" />
                            <span className="text-sm text-muted-foreground">
                                Order Date
                            </span>
                        </div>

                        <p className="font-medium text-foreground">
                            {new Date(
                                order.created_at
                            ).toLocaleDateString()}
                        </p>
                    </div>

                    <div className="p-4 rounded-xl bg-secondary/40">
                        <div className="flex items-center gap-2 mb-2">
                            <Package className="w-4 h-4 text-primary" />
                            <span className="text-sm text-muted-foreground">
                                Status
                            </span>
                        </div>

                        <p className="font-medium text-primary capitalize">
                            {order.order_status}
                        </p>
                    </div>

                    <div className="p-4 rounded-xl bg-secondary/40">
                        <div className="flex items-center gap-2 mb-2">
                            <CreditCard className="w-4 h-4 text-primary" />
                            <span className="text-sm text-muted-foreground">
                                Total
                            </span>
                        </div>

                        <p className="font-bold text-lg text-foreground">
                            ₹{order.total_price}
                        </p>
                    </div>

                </div>

                {/* ORDER ITEMS */}
                <div className="mb-6">
                    <h3 className="text-lg font-semibold text-foreground mb-4">
                        Ordered Items
                    </h3>

                    <div className="space-y-3">
                        {order?.order_items?.map((item) => (
                            <div
                                key={item.product_id}
                                className="
                                    flex items-center gap-4
                                    p-4
                                    rounded-xl
                                    bg-secondary/40
                                    border border-transparent
                                    hover:border-primary/20
                                    transition-all
                                "
                            >
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="
                                        w-16 h-16
                                        rounded-xl
                                        object-cover
                                        shrink-0
                                    "
                                />

                                <div className="flex-1 min-w-0">
                                    <h4 className="font-medium text-foreground truncate">
                                        {item.title}
                                    </h4>

                                    <p className="text-sm text-muted-foreground mt-1">
                                        Quantity: {item.quantity}
                                    </p>
                                </div>

                                <div className="text-right">
                                    <p className="font-semibold text-foreground">
                                        ₹{item.price}
                                    </p>

                                    <p className="text-xs text-muted-foreground">
                                        each
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* SHIPPING INFORMATION */}
                {order.shipping_info && (
                    <div className="mb-6">
                        <h3 className="text-lg font-semibold text-foreground mb-4">
                            Shipping Information
                        </h3>

                        <div className="p-5 rounded-xl bg-secondary/40">
                            <div className="flex items-start gap-3">
                                <div
                                    className="
                                        w-10 h-10
                                        rounded-lg
                                        bg-primary/10
                                        text-primary
                                        flex items-center justify-center
                                        shrink-0
                                    "
                                >
                                    <MapPin className="w-5 h-5" />
                                </div>

                                <div className="space-y-2">
                                    <p className="font-medium text-foreground">
                                        {order.shipping_info.full_name}
                                    </p>

                                    <p className="text-sm text-muted-foreground">
                                        {order.shipping_info.address}
                                    </p>

                                    <p className="text-sm text-muted-foreground">
                                        {order.shipping_info.city},{" "}
                                        {order.shipping_info.state} -{" "}
                                        {order.shipping_info.pincode}
                                    </p>

                                    {order.shipping_info.phone && (
                                        <p className="flex items-center gap-2 text-sm text-muted-foreground">
                                            <Phone className="w-4 h-4" />
                                            {order.shipping_info.phone}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* PRICE SUMMARY */}
                <div>
                    <h3 className="text-lg font-semibold text-foreground mb-4">
                        Price Summary
                    </h3>

                    <div className="p-5 rounded-xl bg-secondary/40 space-y-3">

                        <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">
                                Subtotal
                            </span>

                            <span className="text-foreground">
                                ₹{order.total_price}
                            </span>
                        </div>

                        <div className="h-px bg-border/50" />

                        <div className="flex justify-between">
                            <span className="font-semibold text-foreground">
                                Total
                            </span>

                            <span className="font-bold text-xl text-primary">
                                ₹{order.total_price}
                            </span>
                        </div>

                    </div>
                </div>

                {/* CLOSE */}
                <div className="mt-6 flex justify-end">
                    <button
                        onClick={onClose}
                        className="
                            px-5 py-2.5
                            rounded-xl
                            bg-primary
                            text-primary-foreground
                            hover:opacity-90
                            transition-all
                            font-medium
                        "
                    >
                        Close
                    </button>
                </div>

            </div>
        </div>
    );
};

export default OrderDetails;