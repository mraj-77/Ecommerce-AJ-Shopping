import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { CreditCard, Lock } from "lucide-react";
import { toast } from "react-toastify";
import { toggleOrderStep, verifyPayment } from "../store/slices/orderSlice";
import { clearCart } from "../store/slices/cartSlice";

const PaymentForm = () => {
  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  const { authUser } = useSelector((state) => state.auth);

  // ✅ Ye sab ab orderSlice se aate hain (placeOrder ke fulfilled me set hote hain)
  const { razorpayOrderId, amount, currency, keyId, orderId } = useSelector(
    (state) => state.order
  );

  const [isProcessing, setIsProcessing] = useState(false);

  // ================================
  // Razorpay ka checkout.js script load karo
  // (sirf ek baar - agar already load ho chuka hai toh dobara nahi)
  // ================================
  useEffect(() => {
    if (document.getElementById("razorpay-checkout-script")) return;

    const script = document.createElement("script");
    script.id = "razorpay-checkout-script";
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  // ================================
  // "Pay Now" click -> Razorpay ka popup khulta hai
  // ================================
  const handlePayment = () => {
    if (!window.Razorpay) {
      toast.error("Payment gateway abhi load ho raha hai, thoda ruk ke try karo.");
      return;
    }

    setIsProcessing(true);

    const options = {
      key: keyId,                 // Razorpay public key (backend se aaya)
      amount: amount,             // paise me hai already (backend * 100 kar chuka hai)
      currency: currency,
      name: "AJ Shopping",
      description: `Order #${orderId}`,
      order_id: razorpayOrderId,  // backend ne razorpay.orders.create se banaya tha

      prefill: {
        name: authUser?.full_name || authUser?.name,
        email: authUser?.email,
        contact: authUser?.phone,
      },

      theme: { color: "#6366f1" },

      // ================================
      // ✅ PAYMENT SUCCESS HANDLER
      // Razorpay checkout khud yahan tak sirf tabhi pahunchta hai
      // jab card/UPI se payment ho chuka ho. Lekin ye abhi bhi
      // "claim" hai - isliye signature backend se verify karwana
      // zaroori hai (warna koi fake response bhej ke free order
      // "successful" dikha sakta hai).
      // ================================
      handler: async (response) => {
        const result = await dispatch(
          verifyPayment({
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
          })
        );

        if (verifyPayment.fulfilled.match(result)) {
          toast.success("Payment Successful.");
          dispatch(clearCart());
          dispatch(toggleOrderStep());
          navigateTo("/orders");
        } else {
          toast.error(
            "Payment ho gaya lekin verify nahi ho paya. Support se contact karo."
          );
        }

        setIsProcessing(false);
      },

      // User ne popup band kar diya bina payment kiye
      modal: {
        ondismiss: () => {
          setIsProcessing(false);
        },
      },
    };

    const razorpayInstance = new window.Razorpay(options);

    // Card decline / insufficient funds / etc.
    razorpayInstance.on("payment.failed", (response) => {
      toast.error(
        response.error?.description || "Payment failed. Please try again."
      );
      setIsProcessing(false);
    });

    razorpayInstance.open();
  };

  return (
    <div className="glass-panel">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 gradient-primary rounded-full flex items-center justify-center">
          <CreditCard className="w-6 h-6 text-primary-foreground" />
        </div>
        <h2 className="text-xl font-semibold text-foreground">
          Complete Payment
        </h2>
      </div>

      <div className="flex items-center space-x-2 mb-6 p-4 bg-secondary/50 rounded-lg">
        <Lock className="w-5 h-5 text-green-500" />
        <span className="text-sm text-muted-foreground">
          You'll be redirected to Razorpay's secure checkout to pay via
          card, UPI, or netbanking.
        </span>
      </div>

      <button
        type="button"
        onClick={handlePayment}
        disabled={isProcessing || !razorpayOrderId}
        className="flex justify-center items-center gap-2 w-full py-3 gradient-primary text-primary-foreground rounded-lg hover:glow-on-hover animate-smooth font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isProcessing ? (
          <>
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            <span>Processing ...</span>
          </>
        ) : (
          "Pay Now"
        )}
      </button>
    </div>
  );
};

export default PaymentForm;