import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
} from "lucide-react";
import { useLocation, Link } from "react-router-dom";
import footerLogo from "../assets/logo/logo.png";
import Button from "./ui/Button";
import axiosInstance from "../lib/axios";
import { motion, AnimatePresence } from "framer-motion";
import {
  staggerContainer,
  staggerItem,
  viewportSettings,
} from "../utils/animations";

const Footer = () => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const isAuthPage = [
    "/login",
    "/register",
    "/verify-otp",
    "/forgot-password",
    "/verify-reset-otp",
    "/reset-password",
  ].includes(location.pathname);

  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesRes, brandsRes] = await Promise.all([
          axiosInstance.get("/categories"),
          axiosInstance.get("/brands"),
        ]);

        if (categoriesRes.data.success) {
          setCategories(categoriesRes.data.data);
        }
        if (brandsRes.data.status) {
          setBrands(brandsRes.data.data);
        }
      } catch (error) {
        console.error("Error fetching footer data:", error);
      }
    };

    if (!isAuthPage) {
      fetchData();
    }
  }, [isAuthPage, i18n.language]);

  const quickLinks = [
    { name: t("home", "الرئيسية"), path: "/" },
    { name: t("offers", "العروض"), path: "/offers" },
    { name: t("new_arrivals", "وصل حديثاً / جديدنا"), path: "/new-arrivals" },
    { name: t("best_sellers", "الأكثر مبيعاً"), path: "/best-sellers" },
    { name: t("why_us", "لماذا نحن"), path: "/about" },
  ];

  const categoriesLinks = categories.map((cat) => ({
    name: cat.name,
    path: `/category/${cat.id}`,
  }));

  const brandsLinks = brands.map((brand) => ({
    name: brand.name,
    path: `/brand/${brand.id}`,
  }));

  const footerLinkGroups = [
    {
      title: t("quick_links"),
      links: quickLinks,
    },
    {
      title: t("categories_title", "الأقسام"),
      links: categoriesLinks,
      split: categoriesLinks.length > 6,
    },
    {
      title: t("best_brands", "افضل الماركات"),
      links: brandsLinks,
      split: brandsLinks.length > 6,
    },
  ];

  return (
    <footer className="w-full transition-colors duration-300 bg-(--footer-bg) border-t border-border/50">
      <div className="py-12 px-4 text-foreground">
        {/* Links Section - Hidden on Auth Pages */}
        {!isAuthPage && (
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportSettings}
            className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16"
          >
            <motion.div variants={staggerItem} className="flex flex-col gap-6">
              <div>
                <h3 className="font-bold text-lg mb-4">{t("contact_us")}</h3>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors cursor-pointer text-sm">
                    <Phone className="w-4 h-4 text-primary" />
                    <span>0100000000</span>
                  </li>
                  <li className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors cursor-pointer text-sm">
                    <Mail className="w-4 h-4 text-primary" />
                    <span>info@company.com</span>
                  </li>
                  <li className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors cursor-pointer text-sm">
                    <MapPin className="w-4 h-4 text-primary" />
                    <span>القاهرة، مصر</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-bold text-lg mb-4">{t("follow_us")}</h3>
                <div className="flex items-center gap-4">
                  {[Youtube, Facebook, Instagram, Twitter].map((Icon, idx) => (
                    <motion.div
                      key={idx}
                      whileHover={{ y: -5, scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Button
                        variant="ghost"
                        size="icon"
                        className="hover:text-primary text-muted-foreground"
                      >
                        <Icon className="w-5 h-5" />
                      </Button>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {footerLinkGroups.map((group, idx) => (
              <motion.div key={idx} variants={staggerItem}>
                <h3 className="font-bold text-lg mb-6">{group.title}</h3>
                <div className={group.split ? "grid grid-cols-2 gap-x-4" : ""}>
                  <ul className="space-y-3">
                    {group.links
                      .slice(
                        0,
                        group.split
                          ? Math.ceil(group.links.length / 2)
                          : group.links.length,
                      )
                      .map((link, lIdx) => (
                        <li key={lIdx}>
                          <Link
                            to={link.path}
                            className="text-muted-foreground hover:text-primary text-sm hover:translate-x-1 rtl:hover:-translate-x-1 inline-block"
                          >
                            {link.name}
                          </Link>
                        </li>
                      ))}
                  </ul>
                  {group.split && (
                    <ul className="space-y-3">
                      {group.links
                        .slice(Math.ceil(group.links.length / 2))
                        .map((link, lIdx) => (
                          <li key={lIdx}>
                            <Link
                              to={link.path}
                              className="text-muted-foreground hover:text-primary transition-colors text-sm hover:translate-x-1 rtl:hover:-translate-x-1 inline-block transition-transform"
                            >
                              {link.name}
                            </Link>
                          </li>
                        ))}
                    </ul>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Bottom Section: Apps & Logo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportSettings}
          className="max-w-7xl mx-auto pt-8 border-t border-border/30 flex flex-col md:flex-row items-center justify-between gap-8"
        >
          <div className="flex flex-col items-center md:items-start text-center md:text-start">
            <h3 className="font-bold mb-4 text-lg text-foreground">
              {t("download_app")}
            </h3>
            <div className="flex flex-wrap justify-center md:justify-start gap-4">
              <motion.img
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg"
                className="h-10 cursor-pointer object-contain transition-transform"
                alt="App Store"
              />
              <motion.img
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                className="h-10 cursor-pointer object-contain transition-transform"
                alt="Google Play"
              />
            </div>
          </div>

          <motion.img
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={viewportSettings}
            src={footerLogo}
            alt="Bynona Logo"
            className="w-48 md:w-56 h-auto border border-background  dark:border-foreground "
          />
        </motion.div>

        {/* Rights & Credits Section */}
        <div className="max-w-7xl mx-auto flex flex-col items-center gap-4 w-full mt-8">
          <div className="flex flex-col md:flex-row items-center justify-between w-full border-t border-border/20 pt-6 gap-4">
            <div className="text-sm text-muted-foreground text-center">
              {t("designed_by")}{" "}
              <a
                href="https://fourthpyramidagcy.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-primary hover:underline transition-all"
              >
                Fourth Pyramid Agency
              </a>
            </div>
            <p className="text-muted-foreground text-sm text-center">
              © {new Date().getFullYear()} {t("footer_all_rights")}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
