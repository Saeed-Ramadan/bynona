import React, { useEffect } from "react";
import Navbar from "../Navbar";
import Footer from "../Footer";
import { useThemeStore } from "../../store/useThemeStore";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

const MainLayout = ({ children }) => {
  const { theme } = useThemeStore();
  const { i18n } = useTranslation();
  const location = useLocation();
  const isAuthPage = ["/login", "/register"].includes(location.pathname);

  useEffect(() => {
    // Update theme class on document element
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    // Update language direction and lang attribute
    document.documentElement.dir = i18n.language === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = i18n.language;
  }, [theme, i18n.language]);

  return (
    <div className="flex flex-col grow bg-background text-foreground transition-colors duration-300">
      <Navbar />
      <main
        className={`grow container mx-auto px-4 pb-8 transition-all duration-300 ${
          isAuthPage ? "pt-24" : "pt-44 md:pt-36 lg:pt-32"
        }`}
      >
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
