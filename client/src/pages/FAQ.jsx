import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ChevronDown,
  HelpCircle,
  MessageCircleQuestion,
  ArrowRight,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

const FAQ = () => {
  const [openItems, setOpenItems] = useState({});

  const faqs = [
    {
      question: "How do I place an order?",
      answer:
        "Simply browse our products, add the items you love to your cart, and proceed to checkout. Follow the simple steps to enter your details and complete your order securely.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept major credit and debit cards, PayPal, and other secure payment methods. All payments are processed through secure payment gateways to keep your information protected.",
    },
    {
      question: "How long does shipping take?",
      answer:
        "Standard shipping usually takes 3–5 business days. Express shipping options may also be available at checkout depending on your location.",
    },
    {
      question: "What is your return policy?",
      answer:
        "We offer a 30-day return policy for most eligible items. Products should be returned in their original condition with tags and packaging where applicable.",
    },
  ];

  const toggleItem = (index) => {
    setOpenItems((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <div className="min-h-screen bg-background text-foreground pt-20 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-10 py-12 sm:py-16">

        {/* ================= HEADER ================= */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/20 bg-primary/5 mb-5">
            <Sparkles className="w-3.5 h-3.5 text-primary" />

            <span className="text-xs font-bold uppercase tracking-[0.16em] text-primary">
              Help Center
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-[1.1]">
            Got questions?
            <span className="block text-primary mt-1">
              We've got answers.
            </span>
          </h1>

          <p className="mt-5 text-sm sm:text-base text-muted-foreground leading-7 max-w-2xl">
            Find quick answers to common questions about orders, payments,
            shipping, returns, and your shopping experience with AJ Shopping.
          </p>
        </div>

        {/* ================= MAIN CONTENT ================= */}
        <div className="grid lg:grid-cols-[0.72fr_1.28fr] gap-8 lg:gap-12 items-start">

          {/* ================= LEFT INFO ================= */}
          <div className="lg:sticky lg:top-28">

            <div className="relative overflow-hidden rounded-3xl border border-border bg-card p-6 sm:p-7">

              {/* Decorative */}
              <div className="absolute -top-16 -right-16 w-36 h-36 rounded-full bg-primary/10 blur-2xl pointer-events-none" />

              {/* Icon */}
              <div className="relative w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                <MessageCircleQuestion className="w-6 h-6 text-primary" />
              </div>

              <h2 className="relative text-xl sm:text-2xl font-black">
                Need a little help?
              </h2>

              <p className="relative mt-3 text-sm text-muted-foreground leading-6">
                We've collected the most common questions to make your
                shopping experience simple and stress-free.
              </p>

              {/* Benefits */}
              <div className="mt-7 space-y-4">
                {[
                  "Quick & simple answers",
                  "Secure shopping experience",
                  "Customer-first support",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3"
                  >
                    <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-4 h-4 text-primary" />
                    </div>

                    <span className="text-sm font-medium text-muted-foreground">
                      {item}
                    </span>
                  </div>
                ))}
              </div>

              {/* Support */}
              <div className="mt-8 pt-6 border-t border-border">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center">
                    <HelpCircle className="w-5 h-5 text-primary" />
                  </div>

                  <div>
                    <p className="text-sm font-bold">
                      Still have questions?
                    </p>

                    <p className="text-xs text-muted-foreground mt-1">
                      Our support team is here to help.
                    </p>
                  </div>
                </div>

                <Link
                  to="/contact"
                  className="mt-6 w-full inline-flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl bg-primary text-primary-foreground text-sm font-bold hover:opacity-90 hover:-translate-y-0.5 transition-all duration-200"
                >
                  Contact Support
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>

          {/* ================= FAQ LIST ================= */}
          <div>
            <div className="flex items-center justify-between mb-5">
              <div>
                <p className="text-base font-bold">
                  Common questions
                </p>

                <p className="text-xs text-muted-foreground mt-1">
                  Click a question to reveal the answer
                </p>
              </div>

              <span className="hidden sm:inline-flex px-3 py-1.5 rounded-full bg-muted text-xs font-semibold text-muted-foreground">
                {faqs.length} questions
              </span>
            </div>

            <div className="space-y-3">
              {faqs.map((faq, index) => {
                const isOpen = openItems[index];

                return (
                  <div
                    key={index}
                    className={`group rounded-2xl border bg-card overflow-hidden transition-all duration-300 ${isOpen
                        ? "border-primary/40 shadow-sm"
                        : "border-border hover:border-primary/30"
                      }`}
                  >
                    {/* QUESTION */}
                    <button
                      type="button"
                      onClick={() => toggleItem(index)}
                      aria-expanded={isOpen}
                      className="w-full flex items-center gap-4 px-5 sm:px-6 py-5 text-left"
                    >
                      {/* NUMBER */}
                      <span
                        className={`shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-xs font-black transition-colors ${isOpen
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-muted-foreground group-hover:text-primary"
                          }`}
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      {/* QUESTION */}
                      <span
                        className={`flex-1 text-sm sm:text-base font-bold leading-6 transition-colors ${isOpen
                            ? "text-primary"
                            : "text-foreground"
                          }`}
                      >
                        {faq.question}
                      </span>

                      {/* ARROW */}
                      <span
                        className={`shrink-0 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 ${isOpen
                            ? "bg-primary text-primary-foreground rotate-180"
                            : "bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary"
                          }`}
                      >
                        <ChevronDown className="w-4 h-4" />
                      </span>
                    </button>

                    {/* ANSWER */}
                    <div
                      className={`grid transition-all duration-300 ease-in-out ${isOpen
                          ? "grid-rows-[1fr] opacity-100"
                          : "grid-rows-[0fr] opacity-0"
                        }`}
                    >
                      <div className="overflow-hidden">
                        <div className="px-5 sm:px-6 pb-6 pl-[4.25rem] sm:pl-[4.75rem] pr-6 sm:pr-14">
                          <div className="h-px bg-border mb-5" />

                          <p className="text-sm text-muted-foreground leading-7">
                            {faq.answer}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* SMALL NOTE */}
            <div className="mt-5 flex items-center gap-2 px-1">
              <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />

              <p className="text-xs sm:text-sm text-muted-foreground">
                Can't find what you're looking for?{" "}
                <Link
                  to="/contact"
                  className="text-primary font-semibold hover:underline"
                >
                  Contact our support team.
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* ================= BOTTOM CTA ================= */}
        <div className="mt-16 sm:mt-20">
          <div className="relative overflow-hidden rounded-3xl bg-primary px-6 sm:px-10 py-9 sm:py-10">

            {/* Decorative circles */}
            <div className="absolute -top-24 -right-20 w-64 h-64 rounded-full bg-white/10 blur-2xl pointer-events-none" />

            <div className="absolute -bottom-28 -left-20 w-64 h-64 rounded-full bg-black/10 blur-2xl pointer-events-none" />

            <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-7">

              <div>
                <div className="inline-flex items-center gap-2 text-primary-foreground/70">
                  <HelpCircle className="w-4 h-4" />

                  <p className="text-xs font-bold uppercase tracking-[0.16em]">
                    Need assistance?
                  </p>
                </div>

                <h2 className="mt-3 text-2xl sm:text-3xl font-black text-primary-foreground">
                  We're here to help.
                </h2>

                <p className="mt-2 text-sm text-primary-foreground/70 max-w-lg leading-6">
                  Couldn't find your answer? Reach out to our support team
                  and we'll be happy to assist you.
                </p>
              </div>

              <Link
                to="/contact"
                className="shrink-0 inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-background text-foreground text-sm font-bold hover:opacity-90 hover:-translate-y-0.5 transition-all duration-200"
              >
                Get in touch
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default FAQ;