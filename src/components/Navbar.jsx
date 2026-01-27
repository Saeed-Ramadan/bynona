import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import {
  Search,
  ShoppingCart,
  Heart,
  User,
  MapPin,
  LogOut,
  ChevronDown,
  Sun,
  Moon,
  Languages,
  Settings,
} from "lucide-react";
import { useThemeStore } from "../store/useThemeStore";

import { Link, useLocation } from "react-router-dom";
import mainLogo from "../assets/logo/logo.png";
import Button from "./ui/Button";
import { logoutUser } from "../lib/axios";

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const isAuthPage = ["/login", "/register"].includes(location.pathname);
  const { theme, toggleTheme } = useThemeStore();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const [user, setUser] = useState(() => {
    try {
      const storedUser = localStorage.getItem("user");
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
      console.error("Error parsing user data:", error);
      return null;
    }
  });

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Sync user state on route changes
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const parsedUser = storedUser ? JSON.parse(storedUser) : null;

    setUser((prev) => {
      const prevStr = JSON.stringify(prev);
      const nextStr = JSON.stringify(parsedUser);
      return prevStr !== nextStr ? parsedUser : prev;
    });

    // Use a small delay for closing dropdown to avoid layout shift/state conflicts if needed,
    // though here we just want to avoid the lint trigger.
    const timer = setTimeout(() => setIsDropdownOpen(false), 0);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  // Sync document direction and language
  useEffect(() => {
    document.documentElement.dir = i18n.language === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  const handleLogout = async () => {
    setIsDropdownOpen(false);
    await logoutUser();
    setUser(null);
  };

  const toggleLanguage = () => {
    const newLang = i18n.language === "ar" ? "en" : "ar";
    i18n.changeLanguage(newLang);
  };

  const categories = [
    { key: "mobiles", path: "/category/mobiles" },
    { key: "accessories", path: "/category/accessories" },
    { key: "smart_watch", path: "/category/smart-watches" },
    { key: "electronics", path: "/category/electronics" },
    { key: "audio", path: "/category/audio" },
    { key: "cameras", path: "/category/cameras" },
    { key: "household", path: "/category/household" },
    { key: "appliances", path: "/category/appliances" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full shadow-sm bg-background/95 backdrop-blur-md border-b border-border z-50 transition-colors duration-300">
      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link to="/" className="shrink-0">
          <img
            src={mainLogo}
            alt="Bynona Logo"
            className="w-22.5 h-6.5 object-contain dark:invert"
          />
        </Link>

        {/* Search Bar */}
        {!isAuthPage && (
          <div className="hidden md:flex grow max-w-xl relative group">
            <input
              type="text"
              placeholder={t("search_placeholder")}
              className="w-full border border-input rounded-lg py-2 px-4 bg-secondary/50 focus:bg-background outline-none focus:ring-2 focus:ring-primary transition-all pr-12 rtl:pl-12 rtl:pr-4"
            />
            <div
              className={`absolute ${i18n.language === "ar" ? "left-0" : "right-0"} top-0 bottom-0 flex items-center justify-center`}
            >
              <Button
                size="icon"
                variant="primary"
                className="h-8 w-8 shadow-none hover:shadow-md transition-shadow"
              >
                <Search className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}

        <div className="flex items-center gap-1 sm:gap-2">
          {/* Location Info (Desktop) */}
          {!isAuthPage && (
            <div className="hidden lg:flex items-center gap-1 cursor-pointer px-2 py-1 rounded-lg hover:bg-secondary transition-colors text-foreground">
              <MapPin className="w-4 h-4 text-muted-foreground" />
              <div className="flex flex-col text-[10px] leading-tight">
                <span className="text-muted-foreground">{t("deliver_to")}</span>
                <span className="font-bold">{t("egypt")}</span>
              </div>
            </div>
          )}

          {!isAuthPage && (
            <div className="h-6 w-px bg-border mx-1 hidden lg:block" />
          )}

          {/* Settings & User Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-secondary transition-colors font-bold text-sm outline-none cursor-pointer"
            >
              {user ? (
                <div className="flex items-center gap-2">
                  {user.image && (
                    <img
                      src={user.image}
                      alt=""
                      className="w-5 h-5 rounded-full object-cover"
                    />
                  )}
                  <span className="max-w-30 truncate text-foreground">
                    {user.first_name || ""} {user.last_name || ""}
                  </span>
                </div>
              ) : isAuthPage ? (
                <Settings className="w-5 h-5 text-muted-foreground" />
              ) : (
                <div className="flex items-center gap-1">
                  <User className="w-5 h-5" />
                  <span className="hidden sm:inline">{t("login")}</span>
                </div>
              )}
              <ChevronDown
                className={`w-4 h-4 text-muted-foreground transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`}
              />
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute top-full mt-2 right-0 rtl:left-0 rtl:right-auto w-56 bg-popover text-popover-foreground border border-border rounded-xl shadow-2xl z-[1000] py-2 animate-in fade-in slide-in-from-top-2 duration-200 backdrop-blur-sm">
                {/* Profile Link */}
                {user && (
                  <>
                    <Link
                      to="/profile"
                      onClick={() => setIsDropdownOpen(false)}
                      className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-secondary transition-colors text-sm font-medium"
                    >
                      <User className="w-4 h-4 text-muted-foreground" />
                      <span>{t("profile", "My Profile")}</span>
                    </Link>
                    <div className="my-1 border-t border-border" />
                  </>
                )}

                {/* Theme Toggle Item */}
                <button
                  onClick={toggleTheme}
                  className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-secondary transition-colors text-sm"
                >
                  {theme === "light" ? (
                    <>
                      <Moon className="w-4 h-4 text-muted-foreground" />
                      <span>{t("dark_mode")}</span>
                    </>
                  ) : (
                    <>
                      <Sun className="w-4 h-4 text-yellow-500" />
                      <span>{t("light_mode")}</span>
                    </>
                  )}
                </button>

                {/* Language Toggle Item */}
                <button
                  onClick={toggleLanguage}
                  className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-secondary transition-colors text-sm"
                >
                  <Languages className="w-4 h-4 text-muted-foreground" />
                  <span>{i18n.language === "ar" ? "English" : "العربية"}</span>
                </button>

                <div className="my-1 border-t border-border" />

                {/* Auth Related Item */}
                {user ? (
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-red-50 dark:hover:bg-red-900/10 text-red-500 transition-colors text-sm font-bold"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>{t("logout")}</span>
                  </button>
                ) : (
                  !isAuthPage && (
                    <Link
                      to="/login"
                      onClick={() => setIsDropdownOpen(false)}
                      className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-secondary transition-colors text-sm font-bold text-primary"
                    >
                      <User className="w-4 h-4" />
                      <span>{t("login")}</span>
                    </Link>
                  )
                )}
              </div>
            )}
          </div>

          {/* Wishlist & Cart */}
          {!isAuthPage && (
            <div className="flex items-center gap-0.5 sm:gap-1">
              <Link to="/favorites">
                <Button variant="ghost" size="icon" className="w-9 h-9">
                  <Heart className="w-5 h-5 hover:text-red-500 transition-colors" />
                </Button>
              </Link>
              <Link to="/cart">
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative w-9 h-9"
                >
                  <ShoppingCart className="w-5 h-5" />
                  <span className="absolute top-1 right-1 bg-primary text-primary-foreground text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center border border-background">
                    0
                  </span>
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Search Row (visible on < md) */}
      {!isAuthPage && (
        <div className="md:hidden px-4 pb-3">
          <div className="relative group">
            <input
              type="text"
              placeholder={t("search_placeholder")}
              className="w-full border border-input rounded-lg py-2 px-4 bg-secondary/50 focus:bg-background outline-none focus:ring-2 focus:ring-primary transition-all pr-12 rtl:pl-12 rtl:pr-4 text-sm"
            />
            <div
              className={`absolute ${i18n.language === "ar" ? "left-0" : "right-0"} top-0 bottom-0 flex items-center justify-center px-1`}
            >
              <Button
                size="icon"
                variant="primary"
                className="h-8 w-8 shadow-none"
              >
                <Search className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Categories Bar */}
      {!isAuthPage && (
        <div className="bg-primary/95 backdrop-blur-sm dark:bg-primary/90 shadow-inner">
          <div className="max-w-7xl mx-auto px-4 overflow-x-auto no-scrollbar scroll-smooth">
            <ul className="flex items-center gap-6 lg:gap-10 py-2.5 text-xs lg:text-sm font-bold text-primary-foreground whitespace-nowrap min-w-max mx-auto md:justify-center">
              {categories.map((cat) => (
                <li key={cat.key}>
                  <Link
                    to={cat.path}
                    className="hover:opacity-70 transition-opacity uppercase tracking-tight inline-block"
                  >
                    {t(cat.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
