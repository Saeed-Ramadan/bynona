import { useTranslation } from "react-i18next";
import Button from "./Button";
import { Languages } from "lucide-react";
import { useEffect } from "react";

const LanguageToggle = () => {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === "ar" ? "en" : "ar";
    i18n.changeLanguage(newLang);
  };

  useEffect(() => {
    document.documentElement.dir = i18n.language === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleLanguage}
      className="gap-2"
    >
      <Languages className="h-4 w-4" />
      <span>{i18n.language === "ar" ? "English" : "عربي"}</span>
    </Button>
  );
};

export default LanguageToggle;
