import React, { useState, useEffect, useRef } from "react";
import Hero from "../components/home/Hero";
import FeaturedProducts from "../components/home/FeaturedProducts";
import axiosInstance from "../lib/axios";
import { useTranslation } from "react-i18next";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { usePriceModeStore } from "../store/usePriceModeStore";
import {
  staggerContainer,
  staggerItem,
  fadeInUp,
  viewportSettings,
} from "../utils/animations";

function Home() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { priceMode } = usePriceModeStore();

  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const brandsRef = useRef(null);
  const categoriesRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [brandsRes, categoriesRes] = await Promise.all([
          axiosInstance.get("/brands"),
          axiosInstance.get("/categories"),
        ]);

        if (brandsRes.data.status) {
          setBrands(brandsRes.data.status ? brandsRes.data.data : []);
        }
        if (categoriesRes.data.success) {
          setCategories(categoriesRes.data.data);
        }
      } catch (error) {
        console.error("Error fetching home data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [i18n.language, priceMode]);

  // Auto-scroll logic
  useEffect(() => {
    if (loading) return;

    const autoScroll = (ref) => {
      if (!ref.current) return;
      const { scrollLeft, scrollWidth, clientWidth } = ref.current;

      // If we reached the end, go back to start, else move forward
      let nextScroll =
        i18n.language === "ar"
          ? scrollLeft - 250 // Scroll left for Arabic
          : scrollLeft + 250; // Scroll right for English

      // Reset if at ends
      if (i18n.language === "ar") {
        if (Math.abs(scrollLeft) + clientWidth >= scrollWidth - 10) {
          nextScroll = 0;
        }
      } else {
        if (scrollLeft + clientWidth >= scrollWidth - 10) {
          nextScroll = 0;
        }
      }

      ref.current.scrollTo({ left: nextScroll, behavior: "smooth" });
    };

    const brandsInterval = setInterval(() => autoScroll(brandsRef), 4000);
    const categoriesInterval = setInterval(
      () => autoScroll(categoriesRef),
      5000,
    );

    return () => {
      clearInterval(brandsInterval);
      clearInterval(categoriesInterval);
    };
  }, [loading, i18n.language]);

  const handleBrandClick = (id) => {
    navigate(`/products?brand_id=${id}`);
  };

  const handleCategoryClick = (id) => {
    navigate(`/products?category_id=${id}`);
  };

  const scroll = (ref, direction) => {
    if (ref.current) {
      const { scrollLeft, clientWidth } = ref.current;
      const scrollTo =
        direction === "left"
          ? scrollLeft - clientWidth / 2
          : scrollLeft + clientWidth / 2;
      ref.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  const SectionHeader = ({ title, subtitle, onPrev, onNext }) => (
    <div className="flex items-center justify-between mb-8">
      <div className="flex flex-col gap-1 text-right rtl:text-right ltr:text-left">
        <h2 className="text-2xl font-black text-[#FFD700] dark:text-[#FFD700]">
          {title}
        </h2>
        <p className="text-muted-foreground text-sm font-medium">{subtitle}</p>
      </div>
      <div className="flex items-center gap-3">
        <button
          onClick={onPrev}
          className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-foreground hover:bg-secondary transition-all"
        >
          <ChevronLeft size={20} className="rtl:rotate-0 ltr:rotate-180" />
        </button>
        <button
          onClick={onNext}
          className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-foreground hover:bg-secondary transition-all"
        >
          <ChevronRight size={20} className="rtl:rotate-0 ltr:rotate-180" />
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col w-full pb-20 bg-background overflow-x-hidden">
      {/* Hero Section */}
      <Hero />

      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 space-y-20 mt-16">
        {/* Commercial Brands Section */}
        <motion.section
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
        >
          <SectionHeader
            title={t("commercial_brands_title")}
            subtitle={t("commercial_brands_sub")}
            onPrev={() =>
              scroll(brandsRef, i18n.language === "ar" ? "right" : "left")
            }
            onNext={() =>
              scroll(brandsRef, i18n.language === "ar" ? "left" : "right")
            }
          />
          {loading ? (
            <div className="flex gap-4 overflow-hidden py-4">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="min-w-50 h-24 bg-secondary/50 rounded-xl animate-pulse"
                />
              ))}
            </div>
          ) : (
            <div
              ref={brandsRef}
              className="flex gap-4 overflow-x-auto scrollbar-hide snap-x no-scrollbar py-8 px-2 -mx-2"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {brands.map((brand) => (
                <motion.div
                  key={brand.id}
                  variants={staggerItem}
                  whileHover={{ y: -10, scale: 1.02 }}
                  onClick={() => handleBrandClick(brand.id)}
                  className="min-w-[180px] sm:min-w-[220px] snap-start flex items-center justify-center p-6 bg-card border border-border rounded-xl cursor-pointer hover:shadow-xl transition-all shadow-sm"
                >
                  <img
                    src={brand.image_path}
                    alt={brand.name}
                    className="max-h-12 w-auto object-contain dark:invert"
                  />
                </motion.div>
              ))}
            </div>
          )}
        </motion.section>

        {/* Categories Section */}
        <motion.section
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
        >
          <SectionHeader
            title={t("shop_by_category_title")}
            subtitle={t("shop_by_category_sub")}
            onPrev={() =>
              scroll(categoriesRef, i18n.language === "ar" ? "right" : "left")
            }
            onNext={() =>
              scroll(categoriesRef, i18n.language === "ar" ? "left" : "right")
            }
          />
          {loading ? (
            <div className="flex gap-6 overflow-hidden py-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="min-w-[160px] space-y-4">
                  <div className="aspect-square bg-secondary/50 rounded-2xl animate-pulse" />
                  <div className="h-4 w-2/3 mx-auto bg-secondary/50 rounded animate-pulse" />
                </div>
              ))}
            </div>
          ) : (
            <div
              ref={categoriesRef}
              className="flex gap-6 overflow-x-auto scrollbar-hide snap-x no-scrollbar py-8 px-2 -mx-2"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {categories.map((category) => (
                <motion.div
                  key={category.id}
                  variants={staggerItem}
                  whileHover={{ scale: 1.08, y: -5 }}
                  onClick={() => handleCategoryClick(category.id)}
                  className="group flex flex-col items-center gap-4 cursor-pointer min-w-[150px] sm:min-w-[180px] snap-start"
                >
                  <div className="w-full aspect-square bg-card border border-border rounded-2xl overflow-hidden p-2 group-hover:border-[#FFD700] transition-colors shadow-sm">
                    <img
                      src={category.image_path}
                      alt={category.name}
                      className="w-full h-full object-contain transition-transform group-hover:scale-110"
                    />
                  </div>
                  <span className="font-bold text-sm text-foreground group-hover:text-primary transition-colors text-center px-2">
                    {category.name}
                  </span>
                </motion.div>
              ))}
            </div>
          )}
        </motion.section>

        {/* Featured Products Section */}
        <FeaturedProducts />
      </div>
    </div>
  );
}

export default Home;
