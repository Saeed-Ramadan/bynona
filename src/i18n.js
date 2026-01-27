import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      ar: {
        translation: {
          // for navbar
          search_placeholder: "البحث في Bynona",
          login: "تسجيل الدخول",
          deliver_to: "توصيل إلى",
          egypt: "مصر",
          mobiles: "موبايلات",
          accessories: "اكسسوارات الموبايل",
          smart_watch: "ساعة ذكية",
          electronics: "الإلكترونيات الصغيرة",
          audio: "الصوتيات",
          cameras: "منتجات التصوير",
          household: "الأدوات المنزلية",
          appliances: "الأجهزة الكهربائية",
          logout: "تسجيل الخروج",
          dark_mode: "الوضع الداكن",
          light_mode: "الوضع الفاتح",
          // for footer
          footer_subscribe_title: "كن أول من يعرف عروضنا الحصرية!",
          footer_subscribe_sub:
            "اشترك الآن لتصلك أحدث المنتجات والعروض مباشرة في بريدك الإلكتروني.",
          footer_search_placeholder: "ادخل بريدك الإلكتروني",
          shop_now: "تسوق الآن",
          footer_subscribe_success: "تم الاشتراك بنجاح!",
          quick_links: "روابط سريعة",
          contact_us: "تواصل معنا",
          follow_us: "تابعنا",
          footer_all_rights: "جميع الحقوق محفوظة لموقعنا",
          designed_by: "صُمم ونُفذ بواسطة",
          download_app: "حمّل تطبيقنا الآن",
          // for login page
          welcome_back: "مرحباً بعودتك إلى Bynona",
          email: "البريد الإلكتروني",
          password: "كلمة المرور",
          remember_me: "تذكرني",
          forgot_password: "نسيت كلمة المرور؟",
          or_continue_with: "أو الاستمرار بواسطة",
          dont_have_account: "ليس لديك حساب؟",
          register_now: "سجل الآن",
          google: "تسجيل الدخول باستخدام جوجل",
          // validation
          validation: {
            required: "هذا الحقل مطلوب",
            email_invalid: "البريد الإلكتروني غير صالح",
            min_length: "يجب أن يكون {{count}} أحرف على الأقل",
            password_match: "كلمات المرور غير متطابقة",
          },
        },
      },
      en: {
        translation: {
          // for navbar
          search_placeholder: "Search in Bynona",
          login: "Sign In",
          deliver_to: "Deliver to",
          egypt: "Egypt",
          mobiles: "Mobiles",
          accessories: "Mobile Accessories",
          smart_watch: "Smart Watch",
          electronics: "Small Electronics",
          audio: "Audio",
          cameras: "Cameras",
          household: "Household",
          appliances: "Electric Appliances",
          logout: "Logout",
          dark_mode: "Dark Mode",
          light_mode: "Light Mode",
          // for footer
          footer_subscribe_title: "Be the first to know our exclusive offers!",
          footer_subscribe_sub:
            "Subscribe now to get the latest products and offers directly in your email.",
          footer_search_placeholder: "Enter your email",
          shop_now: "Shop Now",
          footer_subscribe_success: "Subscribed successfully!",
          quick_links: "Quick Links",
          contact_us: "Contact Us",
          follow_us: "Follow Us",
          footer_all_rights: "All rights reserved for our site",
          designed_by: "Designed and Developed by",
          download_app: "Download our app now",
          // for login page
          welcome_back: "Welcome back to Bynona",
          email: "Email Address",
          password: "Password",
          remember_me: "Remember me",
          forgot_password: "Forgot password?",
          or_continue_with: "Or continue with",
          dont_have_account: "Don't have an account?",
          register_now: "Register Now",
          google: "Sign In with Google",
          // validation
          validation: {
            required: "This field is required",
            email_invalid: "Invalid email address",
            min_length: "Must be at least {{count}} characters",
            password_match: "Passwords do not match",
          },
        },
      },
    },
    fallbackLng: "ar",
    interpolation: { escapeValue: false },
  });

export default i18n;
