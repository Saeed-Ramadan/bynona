import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Heart, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import axiosInstance from "../../lib/axios";
import Button from "../ui/Button";
import {
  staggerContainer,
  staggerItem,
  fadeInUp,
  viewportSettings,
} from "../../utils/animations";
import { usePriceModeStore } from "../../store/usePriceModeStore";

const FeaturedProducts = () => {
  const { t, i18n } = useTranslation();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const { priceMode } = usePriceModeStore();

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const response = await axiosInstance.get(
          "/filter/product?sort=offers&page=1",
        );
        if (response.data.success) {
          setProducts(response.data.data.data);
        }
      } catch (error) {
        console.error("Error fetching featured products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchFeatured();
  }, [i18n.language, priceMode]);

  if (loading && products.length === 0) {
    return (
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 py-10">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="aspect-[3/4] bg-secondary/20 rounded-2xl animate-pulse"
          />
        ))}
      </div>
    );
  }

  if (products.length === 0) return null;

  return (
    <motion.section
      key={`${i18n.language}-${priceMode}`}
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ ...viewportSettings, once: false, amount: 0.2 }}
      className="py-12"
    >
      <div className="flex items-center justify-between mb-10 flex-row-reverse">
        <motion.button
          whileHover={{ scale: 1.05, x: i18n.language === "ar" ? -5 : 5 }}
          whileTap={{ scale: 0.95 }}
          className="px-5 py-2.5 border-2 border-[#FFD700] text-[#FFD700] rounded-[0.5rem] text-sm font-black flex items-center gap-2 hover:bg-[#FFD700] hover:text-white transition-all group shadow-sm hover:shadow-lg shadow-[#FFD700]/10"
        >
          {t("view_more")}
          <ChevronRight
            size={18}
            className="transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1"
          />
        </motion.button>
        <motion.div
          variants={fadeInUp}
          className="flex flex-col gap-1 text-right rtl:text-right ltr:text-left"
        >
          <h2 className="text-3xl font-black text-[#FFD700] dark:text-[#FFD700] uppercase tracking-tight">
            {t("featured_products_title")}
          </h2>
          <p className="text-muted-foreground text-sm font-medium">
            {t("featured_products_sub")}
          </p>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {products.map((product) => {
          const originalPrice = parseFloat(product.price);
          const discountPercent = product.offers?.[0]?.disscount_price || 0;
          const finalPrice =
            discountPercent > 0
              ? originalPrice - (originalPrice * discountPercent) / 100
              : originalPrice;

          return (
            <motion.div
              key={product.id}
              variants={staggerItem}
              whileHover={{ y: -15, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="group bg-card border border-border rounded-4xl p-5 shadow-sm hover:shadow-2xl transition-all relative flex flex-col overflow-hidden"
            >
              {/* Badge & Favorite */}
              <div className="absolute top-6 left-6 right-6 flex justify-between items-start z-10 pointer-events-none">
                <motion.button
                  whileHover={{ scale: 1.2, rotate: 10 }}
                  whileTap={{ scale: 0.8 }}
                  className="p-2.5 rounded-full bg-background/80 backdrop-blur-md border border-border text-muted-foreground hover:text-red-500 hover:scale-110 transition-all shadow-sm pointer-events-auto"
                >
                  <Heart className="w-5 h-5" />
                </motion.button>
                {discountPercent > 0 && (
                  <motion.span
                    initial={{ scale: 0, rotate: -20 }}
                    animate={{ scale: 1, rotate: 0 }}
                    className="bg-[#FFD700] text-black text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider shadow-lg"
                  >
                    {t("off")} {discountPercent}%
                  </motion.span>
                )}
              </div>

              {/* Image Container */}
              <div className="aspect-square bg-secondary/10 rounded-3xl overflow-hidden mb-6 flex items-center justify-center group-hover:bg-secondary/20 transition-colors">
                <motion.img
                  whileHover={{ scale: 1.15 }}
                  transition={{ duration: 0.5 }}
                  src={product.image_path}
                  alt={product.name}
                  className="w-3/4 h-3/4 object-contain transition-transform duration-500"
                />
              </div>

              {/* Product Info */}
              <div className="flex flex-col flex-grow text-center">
                <h3 className="font-black text-xl text-foreground mb-1 line-clamp-1 uppercase tracking-tight">
                  {product.name}
                </h3>
                <p className="text-muted-foreground text-xs font-medium mb-6 line-clamp-2 leading-relaxed h-8">
                  {product.description}
                </p>

                <div className="mt-auto space-y-4">
                  <div className="flex flex-col items-center gap-1">
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-black text-foreground">
                        {finalPrice.toFixed(2)}{" "}
                        <span className="text-xs">{t("currency")}</span>
                      </span>
                    </div>
                    {discountPercent > 0 && (
                      <span className="text-sm text-muted-foreground line-through font-bold opacity-60">
                        {originalPrice.toFixed(2)} {t("currency")}
                      </span>
                    )}
                  </div>

                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button className="w-full h-12 bg-[#FFD700] hover:bg-[#FFD700]/90 text-black font-black uppercase tracking-widest text-xs gap-3 rounded-2xl shadow-lg shadow-[#FFD700]/10 hover:shadow-[#FFD700]/20 transition-all active:scale-95">
                      {t("add_to_cart")}
                    </Button>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.section>
  );
};

export default FeaturedProducts;
