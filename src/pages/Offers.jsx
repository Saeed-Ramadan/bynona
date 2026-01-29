import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Heart, ChevronRight, ShoppingCart, Home } from "lucide-react";
import { motion } from "framer-motion";
import axiosInstance from "../lib/axios";
import Button from "../components/ui/Button";
import { useNavigate, Link } from "react-router-dom";
import { usePriceModeStore } from "../store/usePriceModeStore";
import { staggerContainer, staggerItem, fadeInUp } from "../utils/animations";

const Offers = () => {
  const { t, i18n } = useTranslation();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { priceMode } = usePriceModeStore();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        setLoading(true);
        setProducts([]); // Clear current products to show skeletons immediately
        const response = await axiosInstance.get(
          "/filter/product?sort=offers&page=1",
        );
        if (response.data.status || response.data.success) {
          // Comprehensive check for all possible backend response structures - MUST find an array
          const rawData = response.data;
          const productList =
            (Array.isArray(rawData.data?.data) ? rawData.data.data : null) ||
            (Array.isArray(rawData.data?.products)
              ? rawData.data.products
              : null) ||
            (Array.isArray(rawData.data) ? rawData.data : null) ||
            (Array.isArray(rawData.products) ? rawData.products : null) ||
            (Array.isArray(rawData) ? rawData : []);

          setProducts(productList);
        }
      } catch (error) {
        console.error("Error fetching offers:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOffers();
    window.scrollTo(0, 0);
  }, [i18n.language, priceMode]);

  const isLoadingInitial = loading && products.length === 0;

  return (
    <div className="min-h-screen bg-background pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <nav className="flex mb-8 text-sm font-medium text-muted-foreground/60">
          <ol className="flex items-center space-x-2 md:space-x-4 rtl:space-x-reverse">
            <li className="flex items-center">
              <Link
                to="/"
                className="flex items-center hover:text-[#FFD700] transition-colors gap-2"
              >
                <Home className="w-4 h-4" />
                <span>{t("home")}</span>
              </Link>
            </li>
            <li className="flex items-center">
              <ChevronRight className="w-4 h-4 mx-1 rtl:rotate-180" />
              <span className="text-foreground font-bold">{t("offers")}</span>
            </li>
          </ol>
        </nav>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          viewport={{ once: true, amount: 0.1 }}
          className="space-y-12 min-h-150"
        >
          {/* Header */}
          <motion.div variants={fadeInUp} className="text-center space-y-4">
            <h1 className="text-4xl sm:text-6xl font-black text-[#FFD700] uppercase tracking-tighter">
              {t("offers", "Special Offers")}
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto font-medium">
              {t("featured_products_sub")}
            </p>
          </motion.div>

          {/* Grid */}
          {isLoadingInitial ? (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="aspect-[3/4] bg-secondary/20 rounded-2xl animate-pulse"
                />
              ))}
            </div>
          ) : (
            <motion.div
              variants={staggerContainer}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
            >
              {products.map((product) => {
                const originalPrice = parseFloat(product.price);
                const discountPercent =
                  product.offers?.[0]?.disscount_price || 0;
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
                    className="group bg-card border border-border rounded-lg p-5 shadow-sm hover:shadow-2xl transition-all relative flex flex-col overflow-hidden"
                  >
                    {/* Badge & Favorite */}
                    <div className="absolute top-6 left-6 right-6 flex justify-between items-start z-10 pointer-events-none">
                      <motion.button
                        whileHover={{ scale: 1.2, rotate: 10 }}
                        whileTap={{ scale: 0.8 }}
                        className="p-2.5 rounded-full bg-background/80 backdrop-blur-md border border-border text-muted-foreground hover:text-red-500 hover:bg-white transition-all shadow-sm pointer-events-auto"
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

                        <div className="grid grid-cols-2 gap-2">
                          <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Button
                              onClick={() => navigate(`/product/${product.id}`)}
                              variant="outline"
                              className="w-full h-11 border-2 border-[#FFD700] text-[#FFD700] hover:bg-[#FFD700] hover:text-black font-black uppercase text-[10px] rounded-xl transition-all"
                            >
                              {t("view_details")}
                            </Button>
                          </motion.div>
                          <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Button className="w-full h-11 bg-[#FFD700] hover:bg-[#FFD700]/90 text-black font-black uppercase text-[10px] rounded-xl shadow-lg shadow-[#FFD700]/10 hover:shadow-[#FFD700]/20 transition-all active:scale-95">
                              {t("add_to_cart")}
                            </Button>
                          </motion.div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Offers;
