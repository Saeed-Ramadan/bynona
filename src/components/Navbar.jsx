import { useTranslation } from "react-i18next";
import { Search, ShoppingCart, Heart, User, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import i18n from "../i18n";
import mainLogo from "../assets/logo/logo.png";
import ThemeToggle from "./ui/ThemeToggle";
import LanguageToggle from "./ui/LanguageToggle";
import Button from "./ui/Button";

const Navbar = () => {
  const { t } = useTranslation();

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
        <div className="hidden md:flex flex-grow max-w-xl relative group">
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

        <div className="flex items-center gap-2 lg:gap-4">
          {/* Location Info (Desktop) */}
          <div className="hidden lg:flex items-center gap-1 cursor-pointer px-2 py-1 rounded-lg hover:bg-secondary transition-colors">
            <MapPin className="w-4 h-4 text-muted-foreground" />
            <div className="flex flex-col text-[10px] leading-tight">
              <span className="text-muted-foreground">{t("deliver_to")}</span>
              <span className="font-bold">{t("egypt")}</span>
            </div>
          </div>

          <div className="h-6 w-px bg-border mx-1 hidden lg:block" />

          <LanguageToggle />
          <ThemeToggle />

          <div className="h-6 w-px bg-border mx-1" />

          {/* User Account */}
          <Link to="/login">
            <Button variant="ghost" size="sm" className="gap-2 font-bold">
              <User className="w-5 h-5" />
              <span className="hidden sm:inline">{t("login")}</span>
            </Button>
          </Link>

          {/* Wishlist & Cart */}
          <div className="flex items-center gap-1">
            <Link to="/favorites">
              <Button variant="ghost" size="icon">
                <Heart className="w-5 h-5 hover:text-red-500 transition-colors" />
              </Button>
            </Link>
            <Link to="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center border-2 border-background">
                  0
                </span>
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Categories Bar */}
      <div className="bg-primary/95 backdrop-blur-sm dark:bg-primary/90 shadow-inner">
        <div className="max-w-7xl mx-auto px-4 overflow-x-auto no-scrollbar">
          <ul className="flex items-center lg:justify-center gap-6 lg:gap-10 py-2.5 text-xs lg:text-sm font-bold text-primary-foreground whitespace-nowrap">
            {categories.map((cat) => (
              <li key={cat.key}>
                <Link
                  to={cat.path}
                  className="hover:opacity-70 transition-opacity uppercase tracking-tight"
                >
                  {t(cat.key)}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
