import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useLocation } from "react-router-dom";
import { resetPassword } from "../lib/axios";
import Card, {
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/Card";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { motion } from "framer-motion";
import { toast } from "../lib/toast";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { getResetPasswordSchema } from "../utils/validation";
import logo from "../assets/logo/logo.png";
import { Lock, Mail } from "lucide-react";

function ResetPassword() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  const email = location.state?.email;
  const reset_token = location.state?.reset_token;

  useEffect(() => {
    if (!email || !reset_token) {
      toast.error(
        i18n.language === "ar" ? "خطأ في الوصول للمعلومات" : "Access error",
      );
      navigate("/forgot-password");
    }
  }, [email, reset_token, navigate, i18n.language]);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(getResetPasswordSchema(t)),
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await resetPassword({
        email,
        reset_token,
        password: data.password,
        password_confirmation: data.password_confirmation,
      });

      if (
        response.success ||
        response.status === "success" ||
        response.status === 200
      ) {
        toast.success(t("reset_password_success"));
        navigate("/login");
      }
    } catch (error) {
      console.error("Password reset failed", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center py-12 px-4 min-h-[calc(100vh-80px)]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
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
            <CardTitle className="text-2xl font-black text-primary uppercase tracking-tight">
              {t("reset_password_title")}
            </CardTitle>
            <p className="text-muted-foreground mt-2 text-sm font-medium">
              {t("reset_password_sub")}
            </p>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-4">
              {/* Display email (read-only) */}
              <div className="relative">
                <Input
                  type="email"
                  value={email || ""}
                  icon={Mail}
                  disabled
                  className="bg-secondary/30 cursor-not-allowed opacity-80"
                />
              </div>

              <Input
                type="password"
                placeholder={t("new_password")}
                icon={Lock}
                {...register("password")}
                error={errors.password?.message}
              />

              <Input
                type="password"
                placeholder={t("confirm_new_password")}
                icon={Lock}
                {...register("password_confirmation")}
                error={errors.password_confirmation?.message}
              />

              <Button
                type="submit"
                className="w-full h-12 text-lg font-bold shadow-lg shadow-primary/20 transition-all hover:shadow-primary/40 active:scale-[0.98]"
                disabled={loading || !isValid}
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    <span>{t("reset_password_btn")}...</span>
                  </div>
                ) : (
                  t("reset_password_btn")
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

export default ResetPassword;
