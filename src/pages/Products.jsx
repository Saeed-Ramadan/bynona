import React from "react";
import { useTranslation } from "react-i18next";

function Products() {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <h1 className="text-4xl font-black uppercase">
        {t("products", "Products")}
      </h1>
      <p className="text-muted-foreground mt-4">
        {t("products_coming_soon", "Our collection is coming soon...")}
      </p>
    </div>
  );
}

export default Products;
