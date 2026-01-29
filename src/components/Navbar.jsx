import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import {
  Search as SearchIcon,
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
  Menu,
  Grid,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useThemeStore } from "../store/useThemeStore";
import { usePriceModeStore } from "../store/usePriceModeStore";

import { Link, useLocation } from "react-router-dom";
import mainLogo from "../assets/logo/logo.png";
import Button from "./ui/Button";
import { logoutUser } from "../lib/axios";
import axiosInstance from "../lib/axios";
import PriceModeToggle from "./ui/PriceModeToggle";
import Search from "./ui/Search";

const Navbar = () => {
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
  const { theme, toggleTheme } = useThemeStore();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const dropdownRef = useRef(null);
  const categoriesRef = useRef(null);
  const scrollRef = useRef(null);

  const handleScroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 200;
      scrollRef.current.scrollBy({
        left: direction === "right" ? scrollAmount : -scrollAmount,
        behavior: "smooth",
      });
    }
  };

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
      if (
        categoriesRef.current &&
        !categoriesRef.current.contains(event.target)
      ) {
        setIsCategoriesOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Sync user state on route changes
  useEffect(() => {
    // Only update if value actually changed
    const storedUser = localStorage.getItem("user");
    const parsedUser = storedUser ? JSON.parse(storedUser) : null;

    if (JSON.stringify(user) !== JSON.stringify(parsedUser)) {
      setUser(parsedUser);
    }

    setIsDropdownOpen(false);
  }, [location.pathname]); // Removed 'user' to break circularity

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

  const [categories, setCategories] = useState([]);

  const { priceMode } = usePriceModeStore();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axiosInstance.get("/categories");
        if (response.data.success) {
          setCategories(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, [i18n.language, priceMode]);

  return (
    <nav className="fixed top-0 left-0 w-full shadow-sm bg-background border-b border-border z-50 transition-colors duration-300">
      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        {/* Logo */}
        <div className="shrink-0">
          <Link to="/">
            <img
              src={mainLogo}
              alt="Bynona Logo"
              className="w-22.5 h-6.5 object-contain dark:invert"
            />
          </Link>
        </div>

        {/* Search Bar */}
        {!isAuthPage && (
          <div className="grow max-w-xl hidden md:block">
            <Search />
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
            <div className="hidden lg:block h-6 w-px bg-border mx-1" />
          )}

          {!isAuthPage && (
            <div className="hidden sm:block">
              <PriceModeToggle />
            </div>
          )}

          {/* Settings & User Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-2 px-2 py-1.5 rounded-lg transition-colors font-bold text-sm outline-none cursor-pointer"
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
                <div className="flex items-center gap-1 text-foreground">
                  <User className="w-5 h-5" />
                  <span className="hidden sm:inline">{t("login")}</span>
                </div>
              )}
              <div
                style={{
                  transform: isDropdownOpen ? "rotate(180deg)" : "rotate(0deg)",
                  transition: "transform 0.2s",
                }}
              >
                <ChevronDown className="w-4 h-4 text-muted-foreground" />
              </div>
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute top-full mt-2 right-0 rtl:left-0 rtl:right-auto w-56 bg-background text-foreground border border-border rounded-xl shadow-2xl z-1000 py-2">
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

                <div className="px-4 py-2 sm:hidden">
                  <PriceModeToggle />
                </div>

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
                <div>
                  <Button variant="ghost" size="icon" className="w-9 h-9">
                    <Heart className="w-5 h-5 hover:text-red-500 transition-colors" />
                  </Button>
                </div>
              </Link>
              <Link to="/cart">
                <div>
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
                </div>
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Search Row (visible on < md) */}
      {!isAuthPage && (
        <div className="md:hidden px-4 pb-3">
          <Search />
        </div>
      )}

      {/* Categories Bar */}
      {!isAuthPage && (
        <div className="bg-primary shadow-lg border-t border-white/10 relative">
          <div className="max-w-7xl mx-auto px-4">
            {/* Mobile Dropdown View */}
            <div className="md:hidden py-3" ref={categoriesRef}>
              <button
                onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
                className="w-full flex items-center justify-between px-4 py-2.5 bg-white/10 rounded-lg text-primary-foreground font-bold transition-all hover:bg-white/20"
              >
                <div className="flex items-center gap-3">
                  <Grid className="w-5 h-5" />
                  <span>{t("all_categories")}</span>
                </div>
                <div
                  style={{
                    transform: isCategoriesOpen
                      ? "rotate(180deg)"
                      : "rotate(0deg)",
                    transition: "transform 0.3s",
                  }}
                >
                  <ChevronDown className="w-5 h-5" />
                </div>
              </button>

              {/* Mobile Categories Menu */}
              {isCategoriesOpen && (
                <div className="absolute left-4 right-4 top-full mt-2 bg-background border border-border rounded-xl shadow-2xl z-50 overflow-hidden">
                  <div className="grid grid-cols-1 divide-y divide-border max-h-[60vh] overflow-y-auto no-scrollbar">
                    {categories.map((cat) => (
                      <Link
                        key={cat.id}
                        to={`/category/${cat.id}`}
                        onClick={() => setIsCategoriesOpen(false)}
                        className="flex items-center gap-4 px-5 py-4 hover:bg-secondary transition-colors group"
                      >
                        {cat.image_path ? (
                          <img
                            src={cat.image_path}
                            alt=""
                            className="w-10 h-10 object-contain rounded-lg bg-secondary group-hover:scale-110 transition-transform"
                          />
                        ) : (
                          <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center">
                            <Grid className="w-5 h-5 text-muted-foreground" />
                          </div>
                        )}
                        <span className="font-bold text-foreground">
                          {cat.name}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Desktop Horizontal View */}
            <div className="hidden md:flex items-center relative group/scroll">
              <button
                onClick={() => handleScroll("left")}
                className="absolute left-0 z-10 p-1 bg-primary text-primary-foreground rounded-full shadow-md hover:scale-110 transition-transform opacity-0 group-hover/scroll:opacity-100 -translate-x-1/2"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <div
                ref={scrollRef}
                className="grow overflow-x-auto no-scrollbar scroll-smooth"
              >
                <ul className="flex items-center justify-start md:justify-center gap-6 lg:gap-10 py-2.5 text-xs lg:text-sm font-bold text-primary-foreground min-w-max mx-auto px-10">
                  {categories.map((cat) => (
                    <li key={cat.id} className="shrink-0">
                      <Link
                        to={`/category/${cat.id}`}
                        className="flex items-center gap-2 hover:opacity-80 transition-all group"
                      >
                        {cat.image_path && (
                          <img
                            src={cat.image_path}
                            alt=""
                            className="w-4 h-4 lg:w-5 lg:h-5 object-contain rounded-full bg-white/20 p-0.5 group-hover:scale-110 transition-transform"
                          />
                        )}
                        <span className="tracking-tight whitespace-nowrap">
                          {cat.name}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => handleScroll("right")}
                className="absolute right-0 z-10 p-1 bg-primary text-primary-foreground rounded-full shadow-md hover:scale-110 transition-transform opacity-0 group-hover/scroll:opacity-100 translate-x-1/2"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
