import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../lib/axios";
import Card, {
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "../components/ui/Card";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { motion } from "framer-motion";
import { toast } from "../lib/toast";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { getRegisterSchema } from "../utils/validation";
import { staggerContainer, staggerItem } from "../utils/animations";
import logo from "../assets/logo/logo.png";
import { User, Mail, Phone, Lock, CheckCircle2 } from "lucide-react";

function Register() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(getRegisterSchema(t)),
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await registerUser(data);
      if (response.success || response.status === "success") {
        toast.success(t("register_success"));
        navigate("/verify-otp", { state: { email: data.email } });
      }
    } catch (error) {
      console.error("Registration failed", error);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    toast.info(
      i18n.language === "ar"
        ? "جاري التحويل إلى جوجل..."
        : "Redirecting to Google...",
    );
  };

  return (
    <div className="flex items-center justify-center py-12 px-4 min-h-[calc(100vh-80px)]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg"
      >
        <div className="flex justify-center mb-8">
          <div className="bg-card border border-border rounded-xl p-2 shadow-sm">
            <img
              src={logo}
              alt="Bynona Logo"
              className="h-12 object-contain dark:invert"
            />
          </div>
        </div>

        <Card className="border-none shadow-2xl bg-card/80 backdrop-blur-md">
          <CardHeader className="text-center pb-2">
            <CardTitle className="text-3xl font-black text-primary uppercase tracking-tight">
              {t("create_account")}
            </CardTitle>
          </CardHeader>

          <CardContent>
            <motion.form
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-5"
            >
              <motion.div
                variants={staggerItem}
                className="grid grid-cols-1 sm:grid-cols-2 gap-4"
              >
                <Input
                  placeholder={t("first_name")}
                  icon={User}
                  {...register("first_name")}
                  error={errors.first_name?.message}
                />
                <Input
                  placeholder={t("last_name")}
                  icon={User}
                  {...register("last_name")}
                  error={errors.last_name?.message}
                />
              </motion.div>

              <motion.div variants={staggerItem}>
                <Input
                  type="email"
                  placeholder={t("email")}
                  icon={Mail}
                  {...register("email")}
                  error={errors.email?.message}
                />
              </motion.div>

              <motion.div variants={staggerItem}>
                <Input
                  placeholder={t("phone")}
                  icon={Phone}
                  {...register("phone")}
                  error={errors.phone?.message}
                />
              </motion.div>

              <motion.div
                variants={staggerItem}
                className="grid grid-cols-1 sm:grid-cols-2 gap-4"
              >
                <Input
                  type="password"
                  placeholder={t("password")}
                  icon={Lock}
                  {...register("password")}
                  error={errors.password?.message}
                />
                <Input
                  type="password"
                  placeholder={t("password_confirmation", "Confirm Password")}
                  icon={Lock}
                  {...register("password_confirmation")}
                  error={errors.password_confirmation?.message}
                />
              </motion.div>

              <motion.div
                variants={staggerItem}
                className="flex items-center gap-2 px-1"
              >
                <label className="flex items-center gap-3 cursor-pointer group select-none">
                  <div className="relative flex items-center justify-center">
                    <input
                      type="checkbox"
                      className="peer sr-only"
                      {...register("terms")}
                    />
                    <div className="h-5 w-5 rounded border-2 border-muted-foreground transition-all peer-checked:border-primary peer-checked:bg-primary group-hover:border-primary" />
                    <CheckCircle2 className="absolute h-3.5 w-3.5 text-white opacity-0 transition-opacity peer-checked:opacity-100" />
                  </div>
                  <span
                    className={`text-sm font-medium transition-colors ${errors.terms ? "text-red-500" : "text-muted-foreground group-hover:text-foreground"}`}
                  >
                    {t("agree_terms")}
                  </span>
                </label>
              </motion.div>

              <motion.div variants={staggerItem}>
                <Button
                  type="submit"
                  className="w-full h-12 text-lg font-bold shadow-lg shadow-primary/20 transition-all hover:shadow-primary/40 active:scale-[0.98]"
                  disabled={loading || !isValid}
                >
                  {loading ? (
                    <div className="flex items-center gap-2">
                      <div className="h-5 w-5 animate-spin rounded-full border-2 border-current border-t-transparent" />
                      <span>{t("create_account")}...</span>
                    </div>
                  ) : (
                    t("create_account")
                  )}
                </Button>
              </motion.div>
            </motion.form>
          </CardContent>

          <CardFooter className="flex flex-col gap-6 pt-0">
            <motion.div
              variants={staggerItem}
              initial="hidden"
              animate="visible"
              className="w-full space-y-6"
            >
              <div className="relative w-full">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-4 text-muted-foreground font-bold tracking-widest">
                    {t("or_continue_with")}
                  </span>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleGoogleLogin}
                className="w-full flex items-center justify-center gap-3 bg-background border border-border text-foreground font-bold py-3 px-4 rounded-xl hover:bg-secondary/50 transition-all shadow-sm"
              >
                <svg width="20" height="20" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                <span>{t("google")}</span>
              </motion.button>

              <p className="text-center text-sm text-muted-foreground font-medium">
                {t("already_have_account")}{" "}
                <Link
                  to="/login"
                  className="text-primary hover:underline font-black decoration-2 underline-offset-4"
                >
                  {t("login")}
                </Link>
              </p>
            </motion.div>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}

export default Register;
