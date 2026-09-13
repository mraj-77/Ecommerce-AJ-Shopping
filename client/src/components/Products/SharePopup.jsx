import { useEffect } from "react";
import {
    X,
    Copy,
    Check,
    MessageCircle,
    Facebook,
    Send,
    Linkedin,
    Share2,
} from "lucide-react";
import { toast } from "react-toastify";
import { useState } from "react";

const SharePopup = ({
    isOpen,
    onClose,
    url = window.location.href,
    title = "Check this out!",
    text = "I found something interesting!",
}) => {
    const [copied, setCopied] = useState(false);

    // ================================
    // CLOSE ON ESCAPE
    // ================================
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === "Escape") {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener("keydown", handleEscape);
        }

        return () => {
            document.removeEventListener("keydown", handleEscape);
        };
    }, [isOpen, onClose]);

    // ================================
    // NATIVE SHARE
    // ================================
    const handleNativeShare = async () => {
        if (!navigator.share) {
            toast.info("Native sharing is not supported on this device.");
            return;
        }

        try {
            await navigator.share({
                title,
                text,
                url,
            });
        } catch (error) {
            // User cancelled share — no need to show error
            if (error.name !== "AbortError") {
                toast.error("Unable to share.");
            }
        }
    };

    // ================================
    // COPY LINK
    // ================================
    const handleCopyLink = async () => {
        try {
            await navigator.clipboard.writeText(url);

            setCopied(true);

            toast.success("Link copied!");

            setTimeout(() => {
                setCopied(false);
            }, 2000);
        } catch (error) {
            toast.error("Failed to copy link.");
        }
    };

    // ================================
    // SOCIAL SHARE
    // ================================
    const handleSocialShare = (platform) => {
        const encodedUrl = encodeURIComponent(url);
        const encodedText = encodeURIComponent(`${text} ${url}`);

        let shareUrl = "";

        switch (platform) {
            case "whatsapp":
                shareUrl = `https://wa.me/?text=${encodedText}`;
                break;

            case "facebook":
                shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
                break;

            case "telegram":
                shareUrl = `https://t.me/share/url?url=${encodedUrl}&text=${encodeURIComponent(
                    text
                )}`;
                break;

            case "linkedin":
                shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
                break;

            case "x":
                shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
                    text
                )}&url=${encodedUrl}`;
                break;

            default:
                return;
        }

        window.open(
            shareUrl,
            "_blank",
            "noopener,noreferrer,width=600,height=600"
        );
    };

    // ================================
    // DON'T RENDER
    // ================================
    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
            onClick={onClose}
        >
            <div
                className="relative w-full max-w-md rounded-3xl border border-white/10 bg-[#111827]/95 p-6 shadow-2xl backdrop-blur-xl"
                onClick={(e) => e.stopPropagation()}
            >
                {/* ================================
            CLOSE BUTTON
        ================================ */}
                <button
                    onClick={onClose}
                    className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/5 text-gray-400 transition hover:bg-white/10 hover:text-white"
                >
                    <X size={20} />
                </button>

                {/* ================================
            HEADER
        ================================ */}
                <div className="mb-6 text-center">
                    <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-green-400/10 text-green-400">
                        <Share2 size={27} />
                    </div>

                    <h2 className="text-xl font-semibold text-white">
                        Share this
                    </h2>

                    <p className="mt-1 text-sm text-gray-400">
                        Share it with your friends
                    </p>
                </div>

                {/* ================================
            NATIVE SHARE
        ================================ */}
                {typeof navigator !== "undefined" && navigator.share && (
                    <button
                        onClick={handleNativeShare}
                        className="mb-5 flex w-full items-center justify-center gap-2 rounded-xl bg-green-400 py-3 font-semibold text-black transition hover:bg-green-300 active:scale-[0.98]"
                    >
                        <Share2 size={19} />
                        Share
                    </button>
                )}

                {/* ================================
            SOCIAL ICONS
        ================================ */}
                <div className="grid grid-cols-5 gap-3">
                    {/* WhatsApp */}
                    <button
                        onClick={() => handleSocialShare("whatsapp")}
                        className="group flex flex-col items-center gap-2"
                    >
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-500/10 text-green-400 transition group-hover:scale-110 group-hover:bg-green-500/20">
                            <MessageCircle size={22} />
                        </div>

                        <span className="text-xs text-gray-400">
                            WhatsApp
                        </span>
                    </button>

                    {/* Facebook */}
                    <button
                        onClick={() => handleSocialShare("facebook")}
                        className="group flex flex-col items-center gap-2"
                    >
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-500/10 text-blue-400 transition group-hover:scale-110 group-hover:bg-blue-500/20">
                            <Facebook size={22} />
                        </div>

                        <span className="text-xs text-gray-400">
                            Facebook
                        </span>
                    </button>

                    {/* Telegram */}
                    <button
                        onClick={() => handleSocialShare("telegram")}
                        className="group flex flex-col items-center gap-2"
                    >
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-sky-500/10 text-sky-400 transition group-hover:scale-110 group-hover:bg-sky-500/20">
                            <Send size={21} />
                        </div>

                        <span className="text-xs text-gray-400">
                            Telegram
                        </span>
                    </button>

                    {/* LinkedIn */}
                    <button
                        onClick={() => handleSocialShare("linkedin")}
                        className="group flex flex-col items-center gap-2"
                    >
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600/10 text-blue-400 transition group-hover:scale-110 group-hover:bg-blue-600/20">
                            <Linkedin size={21} />
                        </div>

                        <span className="text-xs text-gray-400">
                            LinkedIn
                        </span>
                    </button>

                    {/* X */}
                    <button
                        onClick={() => handleSocialShare("x")}
                        className="group flex flex-col items-center gap-2"
                    >
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition group-hover:scale-110 group-hover:bg-white/20">
                            <span className="text-lg font-bold">𝕏</span>
                        </div>

                        <span className="text-xs text-gray-400">
                            X
                        </span>
                    </button>
                </div>

                {/* ================================
            COPY LINK
        ================================ */}
                <div className="mt-7">
                    <p className="mb-2 text-xs font-medium text-gray-400">
                        Or copy link
                    </p>

                    <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 p-1.5">
                        <input
                            type="text"
                            value={url}
                            readOnly
                            className="min-w-0 flex-1 bg-transparent px-2 text-sm text-gray-300 outline-none"
                        />

                        <button
                            onClick={handleCopyLink}
                            className="flex shrink-0 items-center gap-2 rounded-lg bg-white/10 px-3 py-2 text-sm font-medium text-white transition hover:bg-white/20"
                        >
                            {copied ? (
                                <>
                                    <Check size={16} />
                                    Copied
                                </>
                            ) : (
                                <>
                                    <Copy size={16} />
                                    Copy
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SharePopup;