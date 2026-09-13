import { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  ArrowUpRight,
  MessageCircle,
  Clock3,
  CheckCircle2,
} from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    alert("Message sent successfully!");

    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  const contactItems = [
    {
      icon: Mail,
      title: "Email",
      value: "hello@ajshopping.com",
      description: "We'll get back to you shortly",
    },
    {
      icon: Phone,
      title: "Phone",
      value: "+91 9065608174",
      description: "Mon – Sat, 9 AM – 7 PM",
    },
    {
      icon: MapPin,
      title: "Location",
      value: "Kanti, Atihar, DBG, 846007",
      description: "Bihar, India",
    },
  ];

  const benefits = [
    "Friendly customer support",
    "Help with orders & products",
    "Secure and reliable service",
  ];

  const inputClass =
    "w-full h-12 px-4 rounded-xl bg-background border border-border text-sm text-foreground placeholder:text-muted-foreground/70 outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all duration-200";

  return (
    <div className="min-h-screen bg-background text-foreground pt-20 transition-colors duration-300">
      <main className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-10 py-12 sm:py-16">

        {/* ================= HEADER ================= */}
        <section className="max-w-3xl mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 mb-5">
            <span className="w-8 h-[2px] rounded-full bg-primary" />

            <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
              Contact
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-[1.08]">
            Let's talk.
            <span className="block text-muted-foreground mt-2">
              We're here to help.
            </span>
          </h1>

          <p className="mt-5 max-w-2xl text-sm sm:text-base text-muted-foreground leading-7">
            Have a question, need help with an order, or simply want to share
            some feedback? Send us a message and our team will get back to you.
          </p>
        </section>

        {/* ================= MAIN GRID ================= */}
        <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-8 lg:gap-12 items-start">

          {/* ================= LEFT ================= */}
          <section>
            <div className="mb-7">
              <div className="relative w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-5">
                <div className="absolute inset-0 rounded-2xl bg-primary/10 blur-md opacity-60" />

                <MessageCircle className="relative w-5 h-5 text-primary" />
              </div>

              <h2 className="text-xl sm:text-2xl font-bold">
                Get in touch
              </h2>

              <p className="mt-2 text-sm text-muted-foreground leading-6">
                Pick the easiest way to reach our team.
              </p>
            </div>

            {/* ================= CONTACT ITEMS ================= */}
            <div className="space-y-2">
              {contactItems.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className="group flex items-center gap-4 p-3.5 rounded-2xl border border-transparent hover:border-border hover:bg-card transition-all duration-200"
                  >
                    <div className="shrink-0 w-10 h-10 rounded-xl bg-muted flex items-center justify-center group-hover:bg-primary transition-all duration-200">
                      <Icon className="w-4 h-4 text-muted-foreground group-hover:text-primary-foreground transition-colors duration-200" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-medium text-muted-foreground mb-1">
                        {item.title}
                      </p>

                      <p className="text-sm font-semibold break-words">
                        {item.value}
                      </p>

                      <p className="text-xs text-muted-foreground mt-1">
                        {item.description}
                      </p>
                    </div>

                    <ArrowUpRight className="w-4 h-4 text-muted-foreground/30 group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200" />
                  </div>
                );
              })}
            </div>

            {/* ================= RESPONSE TIME ================= */}
            <div className="relative mt-8 overflow-hidden flex gap-4 p-5 rounded-2xl bg-primary/[0.04] border border-primary/10">
              {/* Decorative glow */}
              <div className="absolute -right-10 -top-10 w-24 h-24 rounded-full bg-primary/10 blur-2xl" />

              <div className="relative shrink-0 w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
                <Clock3 className="w-4 h-4 text-primary" />
              </div>

              <div className="relative">
                <h3 className="text-sm font-bold">
                  Quick response
                </h3>

                <p className="mt-1 text-xs sm:text-sm text-muted-foreground leading-6">
                  Our team usually responds within 24 hours.
                </p>
              </div>
            </div>

            {/* ================= BENEFITS ================= */}
            <div className="mt-7 space-y-3">
              {benefits.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-2.5"
                >
                  <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />

                  <span className="text-xs sm:text-sm text-muted-foreground">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* ================= FORM ================= */}
          <section className="relative rounded-3xl border border-border bg-card overflow-hidden shadow-sm">

            {/* Top accent */}
            <div className="h-1 w-full bg-primary" />

            {/* ================= FORM HEADER ================= */}
            <div className="px-6 sm:px-8 pt-7 sm:pt-8 pb-6">
              <div className="flex items-start justify-between gap-5">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary mb-2">
                    Send a message
                  </p>

                  <h2 className="text-xl sm:text-2xl font-bold">
                    How can we help?
                  </h2>

                  <p className="mt-2 text-sm text-muted-foreground">
                    Fill out the form and we'll get back to you.
                  </p>
                </div>

                <div className="hidden sm:flex w-11 h-11 rounded-2xl bg-primary/10 items-center justify-center">
                  <Send className="w-4 h-4 text-primary" />
                </div>
              </div>
            </div>

            {/* ================= FORM ================= */}
            <form
              onSubmit={handleSubmit}
              className="px-6 sm:px-8 pb-7 sm:pb-8 space-y-5"
            >
              {/* Name + Email */}
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold mb-2">
                    Your name
                  </label>

                  <input
                    type="text"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        name: e.target.value,
                      })
                    }
                    className={inputClass}
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-2">
                    Email address
                  </label>

                  <input
                    type="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        email: e.target.value,
                      })
                    }
                    className={inputClass}
                    required
                  />
                </div>
              </div>

              {/* Subject */}
              <div>
                <label className="block text-xs font-semibold mb-2">
                  Subject
                </label>

                <input
                  type="text"
                  placeholder="What can we help you with?"
                  value={formData.subject}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      subject: e.target.value,
                    })
                  }
                  className={inputClass}
                  required
                />
              </div>

              {/* Message */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-semibold">
                    Your message
                  </label>

                  <span className="text-[11px] text-muted-foreground">
                    {formData.message.length}/500
                  </span>
                </div>

                <textarea
                  rows={6}
                  maxLength={500}
                  placeholder="Tell us what's on your mind..."
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      message: e.target.value,
                    })
                  }
                  className="w-full px-4 py-3.5 rounded-xl bg-background border border-border text-sm text-foreground placeholder:text-muted-foreground/70 outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all duration-200 resize-none"
                  required
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="group relative w-full h-12 flex items-center justify-center gap-2 rounded-xl bg-primary text-primary-foreground text-sm font-bold overflow-hidden hover:opacity-90 active:scale-[0.99] transition-all duration-200"
              >
                <span>Send Message</span>

                <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
              </button>

              <p className="text-center text-[11px] text-muted-foreground">
                Your information is safe and secure with us.
              </p>
            </form>
          </section>
        </div>

        {/* ================= BOTTOM ================= */}
        <div className="mt-12 sm:mt-16 pt-6 border-t border-border">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs sm:text-sm text-muted-foreground">
              Have feedback about AJ Shopping?
            </p>

            <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-primary">
              We'd love to hear it.
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Contact;