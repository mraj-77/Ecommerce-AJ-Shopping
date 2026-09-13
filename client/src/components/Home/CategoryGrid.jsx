import { Link } from "react-router-dom";
import { categories } from "../../data/products";

const CategoryGrid = () => {
    return (
        <section className="py-10">
            {/* Heading */}
            <div className="text-center mb-7">

                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
                    Explore Collections
                </h2>

                <p className="text-base text-muted-foreground max-w-xl mx-auto">
                    Discover thoughtfully selected collections made to match your style.
                </p>
            </div>

            {/* Categories */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {categories.map((category, index) => (
                    <Link
                        key={category.id}
                        to={`/products?category=${category.name}`}
                        className="group glass-card relative h-48 md:h-56 overflow-hidden rounded-2xl border border-border/50"
                    >
                        {/* Image */}
                        <img
                            src={category.image}
                            alt={category.name}
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        />

                        {/* Dark Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

                        {/* Number */}
                        <div className="absolute top-4 left-4">
                            <span className="text-xs font-medium tracking-[0.2em] text-white/70">
                                0{index + 1}
                            </span>
                        </div>

                        {/* Content */}
                        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                            <p className="text-[9px] uppercase tracking-[0.25em] text-white/60 mb-1">
                                Collection
                            </p>

                            <h3 className="text-lg font-bold mb-1.5">
                                {category.name}
                            </h3>

                            <div className="flex items-center gap-2">
                                <span className="h-px w-6 bg-white/70 transition-all duration-300 group-hover:w-10" />

                                <span className="text-[11px] font-medium text-white/80 group-hover:text-white transition-colors">
                                    Discover
                                </span>
                            </div>
                        </div>

                        {/* Hover Border */}
                        <div className="absolute inset-0 rounded-2xl border border-white/0 group-hover:border-white/30 transition-colors duration-300" />
                    </Link>
                ))}
            </div>
        </section>
    );
};

export default CategoryGrid;