import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { staggerContainer, staggerItem, fadeInUp } from "../utils/animations";
import {
  ShoppingCart,
  Heart,
  ShieldCheck,
  Truck,
  RefreshCw,
} from "lucide-react";
import Button from "../components/ui/Button";

function ProductDetails() {
  const { t } = useTranslation();

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="max-w-7xl mx-auto px-4 py-12"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Product Image */}
        <motion.div
          variants={fadeInUp}
          className="bg-card border border-border rounded-3xl overflow-hidden aspect-square flex items-center justify-center p-8 shadow-xl"
        >
          <div className="w-full h-full bg-secondary/50 rounded-2xl animate-pulse flex items-center justify-center">
            <span className="text-muted-foreground font-black uppercase tracking-widest opacity-20 text-4xl transform -rotate-12">
              Product Image
            </span>
          </div>
        </motion.div>

        {/* Product Info */}
        <div className="flex flex-col gap-8">
          <motion.div variants={staggerItem} className="space-y-4">
            <h1 className="text-4xl font-black text-foreground uppercase tracking-tight leading-tight">
              {t("product_name", "Luxury Fragrance Bottle")}
            </h1>
            <div className="flex items-center gap-4">
              <span className="text-3xl font-black text-primary">$129.99</span>
              <span className="text-lg text-muted-foreground line-through">
                $159.99
              </span>
              <span className="bg-primary/10 text-primary text-xs font-black px-2 py-1 rounded-full uppercase">
                20% OFF
              </span>
            </div>
            <p className="text-muted-foreground leading-relaxed text-lg italic">
              Experience the essence of elegance with our signature fragrance.
              Crafted with the finest ingredients from around the floral world.
            </p>
          </motion.div>

          <motion.div variants={staggerItem} className="space-y-6">
            <div className="flex items-center gap-4">
              <Button className="flex-1 h-14 text-lg font-black uppercase tracking-widest gap-3 shadow-xl shadow-primary/20">
                <ShoppingCart className="w-6 h-6" />
                {t("add_to_cart")}
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="w-14 h-14 rounded-xl border-2 hover:bg-red-50 hover:border-red-500 hover:text-red-500 transition-all group"
              >
                <Heart className="w-6 h-6 group-hover:fill-current" />
              </Button>
            </div>
          </motion.div>

          <motion.div
            variants={staggerItem}
            className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t border-border"
          >
            <div className="flex flex-col items-center gap-2 text-center">
              <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-primary mb-2">
                <Truck className="w-6 h-6" />
              </div>
              <span className="text-xs font-black uppercase tracking-wider">
                {t("free_shipping", "Free Shipping")}
              </span>
            </div>
            <div className="flex flex-col items-center gap-2 text-center">
              <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-primary mb-2">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <span className="text-xs font-black uppercase tracking-wider">
                {t("secure_payment", "Secure Payment")}
              </span>
            </div>
            <div className="flex flex-col items-center gap-2 text-center">
              <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-primary mb-2">
                <RefreshCw className="w-6 h-6" />
              </div>
              <span className="text-xs font-black uppercase tracking-wider">
                {t("easy_return", "Easy Returns")}
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

export default ProductDetails;
