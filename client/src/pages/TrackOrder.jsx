import React from "react";
import {
    X,
    Package,
    Truck,
    CheckCircle,
    Clock,
    XCircle,
    MapPin,
} from "lucide-react";

const TrackOrder = ({ order, onClose }) => {
    if (!order) return null;

    const status = order.order_status;

    const steps = [
        {
            title: "Order Placed",
            description: "Your order has been successfully placed.",
            icon: Package,
            status: "Processing",
        },
        {
            title: "Processing",
            description: "Your order is being prepared.",
            icon: Clock,
            status: "Processing",
        },
        {
            title: "Shipped",
            description: "Your order is on its way.",
            icon: Truck,
            status: "Shipped",
        },
        {
            title: "Delivered",
            description: "Your order has been delivered.",
            icon: CheckCircle,
            status: "Delivered",
        },
    ];

    const getStepIndex = () => {
        if (status === "Processing") return 1;
        if (status === "Shipped") return 2;
        if (status === "Delivered") return 3;
        return 0;
    };

    const currentStep = getStepIndex();

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
                    w-full max-w-2xl
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
                <div className="flex items-center justify-between mb-8">
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
                            <Truck className="w-5 h-5" />
                        </div>

                        <div>
                            <h2 className="text-xl font-bold text-foreground">
                                Track Order
                            </h2>

                            <p className="text-sm text-muted-foreground">
                                #{order.id}
                            </p>
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

                {/* CURRENT STATUS */}
                <div
                    className="
                        p-5
                        rounded-2xl
                        bg-primary/5
                        border border-primary/10
                        mb-8
                    "
                >
                    <div className="flex items-center justify-between">

                        <div>
                            <p className="text-sm text-muted-foreground mb-1">
                                Current Status
                            </p>

                            <h3 className="text-xl font-bold text-primary capitalize">
                                {status}
                            </h3>
                        </div>

                        <div
                            className="
                                w-12 h-12
                                rounded-xl
                                bg-primary/10
                                flex items-center justify-center
                                text-primary
                            "
                        >
                            {status === "Delivered" ? (
                                <CheckCircle className="w-6 h-6" />
                            ) : status === "Shipped" ? (
                                <Truck className="w-6 h-6" />
                            ) : status === "Cancelled" ? (
                                <XCircle className="w-6 h-6" />
                            ) : (
                                <Package className="w-6 h-6" />
                            )}
                        </div>

                    </div>
                </div>

                {/* CANCELLED */}
                {status === "Cancelled" ? (
                    <div
                        className="
                            p-6
                            rounded-2xl
                            bg-red-500/10
                            border border-red-500/20
                            text-center
                        "
                    >
                        <div
                            className="
                                w-14 h-14
                                mx-auto mb-4
                                rounded-full
                                bg-red-500/10
                                text-red-400
                                flex items-center justify-center
                            "
                        >
                            <XCircle className="w-7 h-7" />
                        </div>

                        <h3 className="text-lg font-semibold text-foreground">
                            Order Cancelled
                        </h3>

                        <p className="text-sm text-muted-foreground mt-2">
                            This order has been cancelled and will not be
                            delivered.
                        </p>
                    </div>
                ) : (
                    /* TIMELINE */
                    <div className="relative">

                        {steps.map((step, index) => {
                            const Icon = step.icon;
                            const completed = index <= currentStep;
                            const active = index === currentStep;

                            return (
                                <div
                                    key={step.title}
                                    className="relative flex gap-4"
                                >

                                    {/* LINE */}
                                    {index !== steps.length - 1 && (
                                        <div
                                            className={`
                                                absolute
                                                left-[19px]
                                                top-10
                                                w-0.5
                                                h-[calc(100%-10px)]
                                                ${index < currentStep
                                                    ? "bg-primary"
                                                    : "bg-secondary"
                                                }
                                            `}
                                        />
                                    )}

                                    {/* ICON */}
                                    <div
                                        className={`
                                            relative z-10
                                            w-10 h-10
                                            shrink-0
                                            rounded-full
                                            flex items-center justify-center
                                            transition-all
                                            ${completed
                                                ? "bg-primary text-primary-foreground"
                                                : "bg-secondary text-muted-foreground"
                                            }
                                            ${active
                                                ? "ring-4 ring-primary/10"
                                                : ""
                                            }
                                        `}
                                    >
                                        <Icon className="w-5 h-5" />
                                    </div>

                                    {/* CONTENT */}
                                    <div
                                        className={`
                                            pb-8
                                            ${index === steps.length - 1
                                                ? "pb-0"
                                                : ""
                                            }
                                        `}
                                    >
                                        <div className="flex items-center gap-2">
                                            <h4
                                                className={`
                                                    font-semibold
                                                    ${completed
                                                        ? "text-foreground"
                                                        : "text-muted-foreground"
                                                    }
                                                `}
                                            >
                                                {step.title}
                                            </h4>

                                            {active && (
                                                <span
                                                    className="
                                                        px-2 py-0.5
                                                        rounded-full
                                                        text-[10px]
                                                        font-medium
                                                        bg-primary/10
                                                        text-primary
                                                    "
                                                >
                                                    CURRENT
                                                </span>
                                            )}
                                        </div>

                                        <p className="text-sm text-muted-foreground mt-1">
                                            {step.description}
                                        </p>

                                        {active && (
                                            <p className="text-xs text-primary mt-2 font-medium">
                                                Your order is currently at this
                                                stage.
                                            </p>
                                        )}
                                    </div>

                                </div>
                            );
                        })}

                    </div>
                )}

                {/* DELIVERY INFO */}
                {status !== "Cancelled" && (
                    <div
                        className="
                            mt-8
                            p-4
                            rounded-xl
                            bg-secondary/40
                            flex items-start gap-3
                        "
                    >
                        <MapPin className="w-5 h-5 text-primary mt-0.5" />

                        <div>
                            <p className="font-medium text-foreground">
                                Delivery Address
                            </p>

                            <p className="text-sm text-muted-foreground mt-1">
                                {order.shipping_info?.address ||
                                    "Delivery address available in order details"}
                            </p>
                        </div>
                    </div>
                )}

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

export default TrackOrder;