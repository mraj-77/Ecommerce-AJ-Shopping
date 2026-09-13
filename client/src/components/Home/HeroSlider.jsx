import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      title: "Premium Electronics",
      subtitle: "Discover the latest tech innovations",
      description:
        "Up to 50% off on premium headphones, smartwatches, and more",
      image: "./electronics.png",
      cta: "Shop Electronics",
      url: "/products?category=Electronics",
    },
    {
      id: 2,
      title: "Fashion Forward",
      subtitle: "Style meets comfort",
      description:
        "New arrivals in designer clothing and accessories",
      image: "./fashion.jpg",
      cta: "Explore Fashion",
      url: "/products?category=Fashion",
    },
    {
      id: 3,
      title: "Refreshing Drinks",
      subtitle: "Refresh your every moment",
      description:
        "Discover refreshing juices, beverages, soft drinks, and more",
      image: "./drinks.png",
      cta: "Shop Drinks",
      url: "/products?category=Drinks",
    },
    {
      id: 4,
      title: "Delicious Food",
      subtitle: "Good food, great mood",
      description:
        "Explore delicious snacks, groceries, instant meals, and more",
      image: "./foods.png",
      cta: "Shop Food",
      url: "/products?category=Food",
    },
    {
      id: 5,
      title: "Fresh Fruits",
      subtitle: "Freshness you can taste",
      description:
        "Handpicked fresh fruits packed with natural goodness",
      image: "./fruits.png",
      cta: "Shop Fruits",
      url: "/products?category=Fruits",
    },
    {
      id: 6,
      title: "Sweet Treats",
      subtitle: "A little sweetness goes a long way",
      description:
        "Enjoy delicious chocolates, candies, desserts, and Indian sweets",
      image: "./sweets.png",
      cta: "Shop Sweets",
      url: "/products?category=Sweets",
    },
    {
      id: 7,
      title: "Kids Corner",
      subtitle: "Fun, learning, and endless smiles",
      description:
        "Discover toys, games, kids essentials, and fun learning products",
      image: "./kids.png",
      cta: "Shop for Kids",
      url: "/products?category=Kids",
    },
    {
      id: 8,
      title: "Books & Knowledge",
      subtitle: "Open a world of possibilities",
      description:
        "Explore bestselling books, novels, educational guides, and more",
      image: "./books.png",
      cta: "Explore Books",
      url: "/products?category=Books",
    },
    {
      id: 9,
      title: "Sports & Fitness",
      subtitle: "Stay active, stay strong",
      description:
        "Everything you need for workouts, sports, fitness, and an active lifestyle",
      image: "./sports.png",
      cta: "Shop Sports",
      url: "/products?category=Sports",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 8000);

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const slide = slides[currentSlide];

  return (
    <div className="relative h-[70vh] mt-16 overflow-hidden rounded-b-2xl">

      {/* Background Image */}
      <div
        key={slide.id}
        className="absolute inset-0 bg-cover bg-center transition-all duration-700 scale-[1.02]"
        style={{
          backgroundImage: `url(${slide.image})`,
        }}
      />

      {/* Light Dark Overlay - NO HEAVY BLUR */}
      <div className="absolute inset-0 bg-black/35" />

      {/* Subtle Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/20 to-transparent" />

      {/* Content */}
      <div className="relative h-full flex items-center justify-center text-center px-6">

        <div className="max-w-3xl">

          {/* Small Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm">
            <Sparkles className="w-4 h-4 text-primary" />
            <span>{slide.subtitle}</span>
          </div>

          {/* Heading */}
          <h1
            key={slide.id}
            className="text-5xl md:text-7xl font-extrabold text-white mb-5 tracking-tight drop-shadow-2xl"
          >
            {slide.title}
          </h1>

          {/* Description */}
          <p className="text-lg md:text-xl text-white/85 mb-8 max-w-2xl mx-auto leading-relaxed">
            {slide.description}
          </p>

          {/* CTA */}
          <Link
            to={slide.url}
            className="inline-flex items-center px-8 py-4 gradient-primary text-primary-foreground rounded-xl hover:scale-105 hover:glow-on-hover animate-smooth font-semibold text-lg shadow-xl"
          >
            {slide.cta}
            <ChevronRight className="w-5 h-5 ml-2" />
          </Link>

        </div>
      </div>

      {/* Left Arrow */}
      <button
        onClick={prevSlide}
        className="hidden sm:flex absolute left-6 top-1/2 -translate-y-1/2 
        w-12 h-12 items-center justify-center rounded-full
        bg-white/10 backdrop-blur-sm border border-white/20
        hover:bg-white/20 hover:scale-110 transition-all duration-300"
      >
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>

      {/* Right Arrow */}
      <button
        onClick={nextSlide}
        className="hidden sm:flex absolute right-6 top-1/2 -translate-y-1/2
        w-12 h-12 items-center justify-center rounded-full
        bg-white/10 backdrop-blur-sm border border-white/20
        hover:bg-white/20 hover:scale-110 transition-all duration-300"
      >
        <ChevronRight className="w-6 h-6 text-white" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`rounded - full transition - all duration - 300 ${index === currentSlide
              ? "w-8 h-2 bg-primary shadow-lg"
              : "w-2 h-2 bg-white/40 hover:bg-white/70"
              } `}
          />
        ))}
      </div>

    </div>
  );
};

export default HeroSlider;