import React, { useState } from "react";
import { X, AlertTriangle, ChevronLeft, XCircle, Loader2 } from "lucide-react";

const REASONS = [
    "Ordered by mistake",
    "Found a better price elsewhere",
    "Delivery is taking too long",
    "Changed my mind",
    "Item no longer needed",
    "Other",
];

// STEP INDEX MEANINGS: 1 = pick reason, 2 = details, 3 = confirm, 4 = done
const CancelOrder = ({ order, onClose, onConfirmCancel }) => {
    const [step, setStep] = useState(1);
    const [reason, setReason] = useState("");
    const [details, setDetails] = useState("");
    const [submitting, setSubmitting] = useState(false);

    if (!order) return null;

    const canGoToDetails = reason !== "";
    const needsDetails = reason === "Other";

    const goNext = () => {
        if (step === 1 && canGoToDetails) setStep(2);
        else if (step === 2) setStep(3);
    };

    const goBack = () => {
        if (step > 1) setStep(step - 1);
    };

    const handleConfirm = async () => {
        setSubmitting(true);
        try {
            // Hook this up to your cancelOrder thunk/API call
            if (onConfirmCancel) {
                await onConfirmCancel({
                    orderId: order.id,
                    reason,
                    details,
                });
            }
            setStep(4);
        } finally {
            setSubmitting(false);
        }
    };

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
                    w-full max-w-lg
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
                    <div className="flex items-center gap-3">
                        <div
                            className="
                                w-11 h-11
                                rounded-xl
                                bg-red-500/10
                                text-red-400
                                flex items-center justify-center
                            "
                        >
                            <XCircle className="w-5 h-5" />
                        </div>

                        <div>
                            <h2 className="text-xl font-bold text-foreground">
                                Cancel Order
                            </h2>
                            <p className="text-sm text-muted-foreground">
                                Order #{order.id}
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

                {/* PROGRESS DOTS (only while in the flow, not on the done screen) */}
                {step < 4 && (
                    <div className="flex items-center gap-2 mb-6">
                        {[1, 2, 3].map((s) => (
                            <div
                                key={s}
                                className={`
                                    h-1.5 rounded-full transition-all
                                    ${s === step
                                        ? "w-8 bg-primary"
                                        : s < step
                                            ? "w-8 bg-primary/40"
                                            : "w-8 bg-secondary"
                                    }
                                `}
                            />
                        ))}
                    </div>
                )}

                {/* STEP 1: REASON */}
                {step === 1 && (
                    <div>
                        <h3 className="text-lg font-semibold text-foreground mb-1">
                            Why are you cancelling?
                        </h3>
                        <p className="text-sm text-muted-foreground mb-5">
                            This helps us improve. Pick the closest reason.
                        </p>

                        <div className="space-y-2 mb-6">
                            {REASONS.map((r) => (
                                <label
                                    key={r}
                                    className={`
                                        flex items-center gap-3
                                        p-3.5
                                        rounded-xl
                                        border
                                        cursor-pointer
                                        transition-all
                                        ${reason === r
                                            ? "border-primary/50 bg-primary/5"
                                            : "border-transparent bg-secondary/40 hover:bg-secondary/60"
                                        }
                                    `}
                                >
                                    <input
                                        type="radio"
                                        name="cancel-reason"
                                        value={r}
                                        checked={reason === r}
                                        onChange={() => setReason(r)}
                                        className="accent-primary w-4 h-4"
                                    />
                                    <span className="text-sm text-foreground">
                                        {r}
                                    </span>
                                </label>
                            ))}
                        </div>

                        <div className="flex justify-end gap-3">
                            <button
                                onClick={onClose}
                                className="px-5 py-2.5 rounded-xl glass-card hover:glow-on-hover transition-all font-medium text-sm"
                            >
                                Keep Order
                            </button>
                            <button
                                onClick={goNext}
                                disabled={!canGoToDetails}
                                className="
                                    px-5 py-2.5
                                    rounded-xl
                                    bg-primary
                                    text-primary-foreground
                                    font-medium
                                    text-sm
                                    hover:opacity-90
                                    disabled:opacity-40
                                    disabled:cursor-not-allowed
                                    transition-all
                                "
                            >
                                Continue
                            </button>
                        </div>
                    </div>
                )}

                {/* STEP 2: DETAILS */}
                {step === 2 && (
                    <div>
                        <h3 className="text-lg font-semibold text-foreground mb-1">
                            {needsDetails
                                ? "Tell us a bit more"
                                : "Anything else to add?"}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-5">
                            {needsDetails
                                ? "Please describe your reason so we can help better."
                                : "Optional — add any extra detail before you confirm."}
                        </p>

                        <textarea
                            value={details}
                            onChange={(e) => setDetails(e.target.value)}
                            rows={4}
                            placeholder={
                                needsDetails
                                    ? "e.g. wrong size ordered, duplicate order..."
                                    : "Add a comment (optional)"
                            }
                            className="
                                w-full
                                p-4
                                rounded-xl
                                bg-secondary/40
                                border border-transparent
                                focus:border-primary/40
                                focus:outline-none
                                text-sm text-foreground
                                placeholder:text-muted-foreground
                                resize-none
                                mb-6
                            "
                        />

                        <div className="flex justify-between gap-3">
                            <button
                                onClick={goBack}
                                className="px-5 py-2.5 rounded-xl glass-card hover:glow-on-hover transition-all font-medium text-sm flex items-center gap-1"
                            >
                                <ChevronLeft className="w-4 h-4" />
                                Back
                            </button>
                            <button
                                onClick={goNext}
                                disabled={needsDetails && details.trim() === ""}
                                className="
                                    px-5 py-2.5
                                    rounded-xl
                                    bg-primary
                                    text-primary-foreground
                                    font-medium
                                    text-sm
                                    hover:opacity-90
                                    disabled:opacity-40
                                    disabled:cursor-not-allowed
                                    transition-all
                                "
                            >
                                Continue
                            </button>
                        </div>
                    </div>
                )}

                {/* STEP 3: CONFIRM */}
                {step === 3 && (
                    <div>
                        <div
                            className="
                                p-4
                                rounded-xl
                                bg-red-500/10
                                border border-red-500/20
                                flex items-start gap-3
                                mb-5
                            "
                        >
                            <AlertTriangle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                            <p className="text-sm text-foreground">
                                This cannot be undone. Your order will be
                                cancelled and any payment will be refunded as
                                per policy.
                            </p>
                        </div>

                        <div className="p-4 rounded-xl bg-secondary/40 space-y-3 mb-6">
                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">
                                    Order
                                </span>
                                <span className="text-foreground font-medium">
                                    #{order.id}
                                </span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">
                                    Reason
                                </span>
                                <span className="text-foreground font-medium text-right max-w-[60%]">
                                    {reason}
                                </span>
                            </div>
                            {details.trim() !== "" && (
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">
                                        Note
                                    </span>
                                    <span className="text-foreground text-right max-w-[60%]">
                                        {details}
                                    </span>
                                </div>
                            )}
                            <div className="h-px bg-border/50" />
                            <div className="flex justify-between">
                                <span className="font-semibold text-foreground">
                                    Refund Amount
                                </span>
                                <span className="font-bold text-lg text-primary">
                                    ₹{order.total_price}
                                </span>
                            </div>
                        </div>

                        <div className="flex justify-between gap-3">
                            <button
                                onClick={goBack}
                                disabled={submitting}
                                className="px-5 py-2.5 rounded-xl glass-card hover:glow-on-hover transition-all font-medium text-sm flex items-center gap-1 disabled:opacity-40"
                            >
                                <ChevronLeft className="w-4 h-4" />
                                Back
                            </button>
                            <button
                                onClick={handleConfirm}
                                disabled={submitting}
                                className="
                                    px-5 py-2.5
                                    rounded-xl
                                    bg-red-500
                                    text-white
                                    font-medium
                                    text-sm
                                    hover:opacity-90
                                    disabled:opacity-60
                                    transition-all
                                    flex items-center gap-2
                                "
                            >
                                {submitting && (
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                )}
                                {submitting
                                    ? "Cancelling..."
                                    : "Yes, Cancel Order"}
                            </button>
                        </div>
                    </div>
                )}

                {/* STEP 4: DONE */}
                {step === 4 && (
                    <div className="text-center py-4">
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
                        <h3 className="text-lg font-semibold text-foreground mb-1">
                            Order Cancelled
                        </h3>
                        <p className="text-sm text-muted-foreground mb-6">
                            Order #{order.id} has been cancelled. Refund of ₹
                            {order.total_price} will reflect in 5–7 business
                            days.
                        </p>
                        <button
                            onClick={onClose}
                            className="px-5 py-2.5 rounded-xl bg-primary text-primary-foreground hover:opacity-90 transition-all font-medium text-sm"
                        >
                            Close
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CancelOrder;