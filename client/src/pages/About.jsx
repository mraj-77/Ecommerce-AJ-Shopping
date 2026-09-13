import {
  Users,
  Target,
  Award,
  Heart,
  ArrowRight,
  Check,
  ShoppingBag,
  Sparkles,
} from "lucide-react";

const About = () => {
  const values = [
    {
      icon: Heart,
      title: "Customer First",
      description:
        "We put our customers at the heart of everything we do and aim to create a smooth shopping experience.",
    },
    {
      icon: Award,
      title: "Quality Products",
      description:
        "Every product is carefully selected for quality, value, and reliability.",
    },
    {
      icon: Users,
      title: "Community",
      description:
        "We're building genuine and lasting relationships with our growing community.",
    },
    {
      icon: Target,
      title: "Innovation",
      description:
        "We continuously improve our platform and services with better ideas.",
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground pt-20 transition-colors duration-300">

      {/* ================= HERO ================= */}
      <section className="border-b border-border">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-10 py-14 sm:py-20">

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

            {/* Content */}
            <div>
              <div className="flex items-center gap-2 mb-5">
                <span className="w-7 h-px bg-primary" />

                <span className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
                  About AJ Shopping
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-[1.08]">
                Shopping made
                <span className="block text-primary mt-1">
                  simple & enjoyable.
                </span>
              </h1>

              <p className="mt-5 max-w-xl text-sm sm:text-base text-muted-foreground leading-7">
                Welcome to{" "}
                <span className="font-semibold text-foreground">
                  AJ Shopping
                </span>
                . A simple destination for quality products, fair prices, and
                an experience designed around you.
              </p>

              {/* Highlights */}
              <div className="flex flex-wrap gap-2 mt-7">
                {["Quality Products", "Fair Prices", "Customer Focused"].map(
                  (item) => (
                    <div
                      key={item}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg bg-muted/60"
                    >
                      <span className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">
                        <Check
                          className="w-3 h-3 text-primary"
                          strokeWidth={3}
                        />
                      </span>

                      <span className="text-xs sm:text-sm font-medium">
                        {item}
                      </span>
                    </div>
                  )
                )}
              </div>
            </div>

            {/* Simple Visual */}
            <div className="max-w-sm w-full mx-auto lg:ml-auto">
              <div className="aspect-square rounded-3xl bg-muted/50 border border-border flex items-center justify-center">

                <div className="text-center px-8">
                  <div className="mx-auto w-20 h-20 rounded-2xl bg-background border border-border flex items-center justify-center shadow-sm">
                    <ShoppingBag
                      className="w-9 h-9 text-primary"
                      strokeWidth={1.5}
                    />
                  </div>

                  <h2 className="mt-5 text-xl font-black">
                    AJ Shopping
                  </h2>

                  <p className="mt-2 text-sm text-muted-foreground">
                    Everything you need, in one place.
                  </p>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= VALUES ================= */}
      <section>
        <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-10 py-16 sm:py-20">

          <div className="max-w-2xl mb-10">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-7 h-px bg-primary" />

              <span className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
                What we stand for
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight">
              Built around what matters.
            </h2>

            <p className="mt-4 text-sm sm:text-base text-muted-foreground leading-7">
              A few simple values guide everything we do at AJ Shopping.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {values.map((value) => {
              const Icon = value.icon;

              return (
                <div
                  key={value.title}
                  className="group p-5 sm:p-6 rounded-2xl border border-border bg-card hover:border-primary/30 transition-all duration-200"
                >
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary transition-colors duration-200">
                    <Icon
                      className="w-5 h-5 text-primary group-hover:text-primary-foreground transition-colors"
                      strokeWidth={1.8}
                    />
                  </div>

                  <h3 className="mt-5 text-base font-bold">
                    {value.title}
                  </h3>

                  <p className="mt-2.5 text-sm text-muted-foreground leading-6">
                    {value.description}
                  </p>

                  <div className="mt-5 flex items-center gap-1.5 text-xs font-semibold text-primary">
                    Learn more
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= STORY ================= */}
      <section className="border-y border-border bg-muted/30">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-10 py-16 sm:py-20">

          <div className="grid lg:grid-cols-2 gap-10 lg:gap-20 items-center">

            {/* Story */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="w-7 h-px bg-primary" />

                <span className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
                  Our Story
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight leading-tight">
                More than just an
                <span className="block text-primary">
                  online store.
                </span>
              </h2>

              <p className="mt-5 text-sm sm:text-base text-muted-foreground leading-7">
                Founded with a vision to make online shopping simple and
                enjoyable, AJ Shopping brings quality products and fair prices
                together in one convenient place.
              </p>

              <p className="mt-4 text-sm sm:text-base text-muted-foreground leading-7">
                We believe everyone deserves a great shopping experience,
                backed by reliable service and genuine customer care.
              </p>

              <div className="mt-6 flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-primary" />
                </div>

                <p className="text-sm font-semibold">
                  Better shopping starts with better experiences.
                </p>
              </div>
            </div>

            {/* Simple Stats */}
            <div className="grid grid-cols-2 gap-3">

              <div className="p-5 rounded-2xl border border-border bg-card">
                <p className="text-2xl sm:text-3xl font-black text-primary">
                  01
                </p>

                <h3 className="mt-3 text-sm font-bold">
                  Quality
                </h3>

                <p className="mt-1 text-xs text-muted-foreground">
                  Always our priority
                </p>
              </div>

              <div className="p-5 rounded-2xl border border-border bg-card">
                <p className="text-2xl sm:text-3xl font-black text-primary">
                  02
                </p>

                <h3 className="mt-3 text-sm font-bold">
                  Simplicity
                </h3>

                <p className="mt-1 text-xs text-muted-foreground">
                  Easy shopping
                </p>
              </div>

              <div className="col-span-2 p-5 rounded-2xl bg-primary text-primary-foreground">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-black">
                      You first.
                    </h3>

                    <p className="mt-1 text-xs sm:text-sm text-primary-foreground/70">
                      Everything we build starts with our customers.
                    </p>
                  </div>

                  <Heart
                    className="w-8 h-8 opacity-70"
                    strokeWidth={1.5}
                  />
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section>
        <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-10 py-16 sm:py-20">

          <div className="max-w-2xl mx-auto text-center">

            <div className="mx-auto w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center">
              <ShoppingBag className="w-5 h-5 text-primary" />
            </div>

            <h2 className="mt-5 text-2xl sm:text-3xl font-black tracking-tight">
              Ready to discover something great?
            </h2>

            <p className="mt-3 text-sm sm:text-base text-muted-foreground leading-7">
              Explore our collection and find something made for you.
            </p>

            <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary">
              Happy shopping
              <Heart className="w-4 h-4 fill-current" />
            </div>

          </div>
        </div>
      </section>

    </div>
  );
};

export default About;