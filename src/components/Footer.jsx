import { useTranslation } from "react-i18next";
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Search,
} from "lucide-react";
import { useLocation } from "react-router-dom";
import footerLogo from "../assets/logo/logo.png";
import Button from "./ui/Button";

const Footer = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const isAuthPage = ["/login", "/register"].includes(location.pathname);

  const footerLinks = [
    {
      title: t("quick_links"),
      links: [
        "الرئيسية",
        "العروض",
        "وصل حديثاً / جديدنا",
        "الأكثر مبيعاً",
        "لماذا نحن",
      ],
    },
    {
      title: "الأقسام",
      links: [
        "الهواتف المحمولة",
        "الشواحن والإكسسوارات",
        "الصوتيات والسماعات",
        "أجهزة الكمبيوتر واللابتوب",
        "أجهزة التابلت",
      ],
    },
    {
      title: "المطبخ والأجهزة المنزلية",
      links: [
        "الثلاجات والفريزر",
        "الغسالات والمجففات",
        "الأفران والميكروويف",
        "الأجهزة الصغيرة (خلاطات، مكواة...)",
        "أجهزة المطبخ الذكية",
      ],
    },
    {
      title: "افضل الماركات",
      links: ["سامسونج", "إل جي", "شاومي", "فيليبس", "باناسونيك", "كينوود"],
    },
  ];

  return (
    <footer className="w-full transition-colors duration-300 bg-(--footer-bg) border-t border-border/50">
      <div className="py-12 px-4 text-foreground">
        {/* Links Section - Hidden on Auth Pages */}
        {!isAuthPage && (
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
            <div className="flex flex-col gap-6">
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
                    <Button
                      key={idx}
                      variant="ghost"
                      size="icon"
                      className="hover:text-primary transition-colors text-muted-foreground"
                    >
                      <Icon className="w-5 h-5" />
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            {footerLinks.map((group, idx) => (
              <div key={idx}>
                <h3 className="font-bold text-lg mb-6">{group.title}</h3>
                <ul className="space-y-3">
                  {group.links.map((link, lIdx) => (
                    <li key={lIdx}>
                      <a
                        href="#"
                        className="text-muted-foreground hover:text-primary transition-colors text-sm"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {/* Bottom Section: Apps & Logo */}
        <div className="max-w-7xl mx-auto pt-8 border-t border-border/30 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex flex-col items-center md:items-start text-center md:text-start">
            <h3 className="font-bold mb-4 text-lg text-foreground">
              {t("download_app")}
            </h3>
            <div className="flex flex-wrap justify-center md:justify-start gap-4">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg"
                className="h-10 cursor-pointer object-contain transition-transform hover:scale-105"
                alt="App Store"
              />
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                className="h-10 cursor-pointer object-contain transition-transform hover:scale-105"
                alt="Google Play"
              />
            </div>
          </div>

          <img
            src={footerLogo}
            alt="Bynona Logo"
            className="w-48 md:w-56 h-auto border border-background  dark:border-foreground "
          />
        </div>

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
