import React from "react";
import { useTranslation } from "react-i18next";
import { usePriceModeStore } from "../../store/usePriceModeStore";
import { ShoppingBag, Truck } from "lucide-react";
import { motion } from "framer-motion";

const PriceModeToggle = () => {
  const { t } = useTranslation();
  const { priceMode, setPriceMode } = usePriceModeStore();

  return (
    <div className="flex items-center bg-secondary/80 dark:bg-card border border-border p-1 rounded-xl shadow-sm h-10 w-fit">
      <button
        onClick={() => setPriceMode("retail")}
        className={`relative flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-300 outline-none cursor-pointer ${
          priceMode === "retail"
            ? "text-primary-foreground"
            : "text-muted-foreground hover:text-foreground"
        }`}
      >
        {priceMode === "retail" && (
          <motion.div
            layoutId="activeTab"
            className="absolute inset-0 bg-primary rounded-lg shadow-sm"
            initial={false}
            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
          />
        )}
        <span className="relative z-10 flex items-center gap-2">
          <ShoppingBag size={14} />
          {t("retail")}
        </span>
      </button>

      <button
        onClick={() => setPriceMode("wholesale")}
        className={`relative flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-300 outline-none cursor-pointer ${
          priceMode === "wholesale"
            ? "text-primary-foreground"
            : "text-muted-foreground hover:text-foreground"
        }`}
      >
        {priceMode === "wholesale" && (
          <motion.div
            layoutId="activeTab"
            className="absolute inset-0 bg-primary rounded-lg shadow-sm"
            initial={false}
            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
          />
        )}
        <span className="relative z-10 flex items-center gap-2">
          <Truck size={14} />
          {t("wholesale")}
        </span>
      </button>
    </div>
  );
};

export default PriceModeToggle;
