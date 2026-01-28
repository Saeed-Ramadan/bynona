import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import Button from "../ui/Button";

const BANNERS = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=2070",
    titleKey: "hero_fashion_title",
    subKey: "hero_fashion_sub",
    link: "/products",
    color: "from-purple-900/50",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=1999",
    titleKey: "hero_watch_title",
    subKey: "hero_watch_sub",
    link: "/products",
    color: "from-blue-900/50",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=1944",
    titleKey: "hero_perfume_title",
    subKey: "hero_perfume_sub",
    link: "/products",
    color: "from-amber-900/50",
  },
  {
    id: 4,
    image:
      "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&q=80&w=1974",
    titleKey: "hero_skincare_title",
    subKey: "hero_skincare_sub",
    link: "/products",
    color: "from-emerald-900/50",
  },
  {
    id: 5,
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=2070",
    titleKey: "hero_shoes_title",
    subKey: "hero_shoes_sub",
    link: "/products",
    color: "from-rose-900/50",
  },
  {
    id: 6,
    image:
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&q=80&w=1935",
    titleKey: "hero_bags_title",
    subKey: "hero_bags_sub",
    link: "/products",
    color: "from-stone-900/50",
  },
];

const Hero = () => {
  const { t, i18n } = useTranslation();
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 6000);
    return () => clearInterval(timer);
  }, [current]);

  const nextSlide = () => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % BANNERS.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + BANNERS.length) % BANNERS.length);
  };

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
      scale: 1.1,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.5 },
        scale: { duration: 1.2 },
      },
    },
    exit: (direction) => ({
      x: direction < 0 ? "100%" : "-100%",
      opacity: 0,
      scale: 0.9,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.5 },
      },
    }),
  };

  return (
    <div className="relative h-[65vh] sm:h-[80vh] w-full overflow-hidden bg-black">
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={current}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          className="absolute inset-0 w-full h-full"
        >
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-2000"
            style={{ backgroundImage: `url(${BANNERS[current].image})` }}
          />

          {/* Overlays */}
          <div
            className={`absolute inset-0 bg-linear-to-r ${BANNERS[current].color} to-transparent opacity-70`}
          />
          <div className="absolute inset-0 bg-black/40" />

          {/* Content */}
          <div className="relative h-full max-w-7xl mx-auto px-6 sm:px-12 flex flex-col justify-center items-start text-white rtl:items-end">
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="max-w-2xl space-y-6 sm:space-y-8"
            >
              <div className="space-y-2">
                <motion.span
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                  className="inline-block px-4 py-1.5 rounded-full bg-primary/20 backdrop-blur-md border border-primary/30 text-primary font-bold text-xs sm:text-sm uppercase tracking-[0.2em]"
                >
                  {t("new_collection", "New Collection 2026")}
                </motion.span>
                <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-[0.9] drop-shadow-2xl">
                  {t(BANNERS[current].titleKey)}
                </h1>
              </div>

              <p className="text-lg sm:text-2xl font-medium opacity-90 drop-shadow-lg max-w-xl leading-relaxed">
                {t(BANNERS[current].subKey)}
              </p>

              <div className="pt-6">
                <Link to="/products">
                  <Button className="h-16 px-10 text-xl font-black group bg-primary hover:bg-primary/90 text-primary-foreground shadow-[0_20px_50px_rgba(var(--primary-rgb),0.3)] transition-all hover:scale-105">
                    <span className="flex items-center gap-2">
                      {t("shop_now")}
                      <ArrowRight className="w-6 h-6 transition-transform group-hover:translate-x-2 rtl:rotate-180 rtl:group-hover:-translate-x-2" />
                    </span>
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Controls */}
      <div className="absolute bottom-12 left-6 sm:left-12 flex items-center gap-3 z-30 rtl:left-auto rtl:right-6 sm:rtl:right-12">
        {BANNERS.map((_, idx) => (
          <button
            key={idx}
            onClick={() => {
              setDirection(idx > current ? 1 : -1);
              setCurrent(idx);
            }}
            className="group relative h-10 w-2 flex items-center outline-none"
          >
            <div
              className={`transition-all duration-500 rounded-full ${
                idx === current
                  ? "h-10 w-2 bg-primary"
                  : "h-4 w-1 bg-white/30 group-hover:bg-white/60"
              }`}
            />
          </button>
        ))}
        <div className="ml-4 font-mono text-white/50 text-sm font-bold rtl:ml-0 rtl:mr-4">
          0{current + 1} / 0{BANNERS.length}
        </div>
      </div>

      {/* Arrows */}
      <div className="absolute bottom-12 right-6 sm:right-12 flex items-center gap-4 z-30 rtl:right-auto rtl:left-6 sm:rtl:left-12">
        <button
          onClick={prevSlide}
          className="w-14 h-14 rounded-full border border-white/20 hover:border-white flex items-center justify-center text-white transition-all backdrop-blur-sm group hover:bg-white/10"
        >
          <ChevronLeft className="w-8 h-8 transition-transform group-hover:-translate-x-1" />
        </button>
        <button
          onClick={nextSlide}
          className="w-14 h-14 rounded-full border border-white/20 hover:border-white flex items-center justify-center text-white transition-all backdrop-blur-sm group hover:bg-white/10"
        >
          <ChevronRight className="w-8 h-8 transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </div>
  );
};

export default Hero;
