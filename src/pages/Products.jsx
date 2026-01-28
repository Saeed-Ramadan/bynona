import React from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { fadeInUp } from "../utils/animations";

function Products() {
  const { t } = useTranslation();
  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-[60vh]"
      variants={fadeInUp}
      initial="hidden"
      animate="visible"
    >
      <motion.h1
        className="text-4xl font-black uppercase"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        {t("products", "Products")}
      </motion.h1>
      <motion.p
        className="text-muted-foreground mt-4"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        {t("products_coming_soon", "Our collection is coming soon...")}
      </motion.p>
    </motion.div>
  );
}

export default Products;
