import React, { useEffect } from "react";
import Navbar from "../Navbar";
import Footer from "../Footer";
import { useThemeStore } from "../../store/useThemeStore";
import { useTranslation } from "react-i18next";

const MainLayout = ({ children }) => {
  const { theme } = useThemeStore();
  const { i18n } = useTranslation();

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
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <Navbar />
      <main className="container mx-auto px-4 pt-32 pb-8">{children}</main>
      <Footer />
    </div>
  );
};

export default MainLayout;
