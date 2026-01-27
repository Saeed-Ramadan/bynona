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
import footerLogo from "../assets/logo/logo.png";
import Button from "./ui/Button";
import Input from "./ui/Input";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { getSubscriptionSchema } from "../utils/validation";
import { toast } from "sonner";

const Footer = () => {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(getSubscriptionSchema(t)),
  });

  const onSubscribe = (data) => {
    console.log("Subscription Data:", data);
    toast.success(t("footer_subscribe_success", "Subscribed successfully!"));
    reset();
  };

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
    <footer className="w-full bg-secondary transition-colors duration-300">
      {/* Newsletter Section */}
      <div className="bg-primary/10 dark:bg-primary/5 py-12 px-4 border-b border-border">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="flex flex-col lg:flex-row items-center gap-6 text-center lg:text-start">
            <img
              src={footerLogo}
              alt="Bynona Logo"
              className="w-24 h-auto dark:invert"
            />
            <div className="space-y-1">
              <h2 className="text-xl lg:text-2xl font-bold">
                {t("footer_subscribe_title")}
              </h2>
              <p className="text-muted-foreground max-w-xl">
                {t("footer_subscribe_sub")}
              </p>
            </div>
          </div>

          <form
            onSubmit={handleSubmit(onSubscribe)}
            className="flex flex-col sm:flex-row items-start gap-3 w-full max-w-md"
          >
            <div className="relative w-full">
              <Input
                type="email"
                placeholder={t("footer_search_placeholder")}
                className="pr-10 rtl:pl-10 rtl:pr-4"
                {...register("email")}
                error={errors.email?.message}
              />
              <Search className="absolute right-3 top-2.5 text-muted-foreground w-5 h-5 rtl:left-3 rtl:right-auto pointer-events-none" />
            </div>
            <Button
              type="submit"
              className="w-full sm:w-auto h-10 px-8 whitespace-nowrap"
            >
              {t("shop_now")}
            </Button>
          </form>
        </div>
      </div>

      {/* Links Section */}
      <div className="py-12 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Contact Info */}
          <div className="flex flex-col gap-6">
            <div>
              <h3 className="font-bold text-lg mb-4">{t("contact_us")}</h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                  <Phone className="w-4 h-4 text-primary" />
                  <span>0100000000</span>
                </li>
                <li className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                  <Mail className="w-4 h-4 text-primary" />
                  <span>info@company.com</span>
                </li>
                <li className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
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
                    className="hover:text-primary transition-colors"
                  >
                    <Icon className="w-5 h-5" />
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Dynamic Link Groups */}
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

        {/* Bottom Section */}
        <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-border flex flex-col items-center">
          <h3 className="font-bold mb-6 text-lg">حمّل تطبيقنا الآن</h3>
          <div className="flex flex-wrap justify-center gap-4 mb-8">
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
          <p className="text-muted-foreground text-sm text-center">
            © {new Date().getFullYear()} جميع الحقوق محفوظة | جميع الحقوق محفوظة
            لموقعنا
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
