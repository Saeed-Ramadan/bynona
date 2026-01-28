import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { sendResetEmail } from "../lib/axios";
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
import * as yup from "yup";
import { staggerContainer, staggerItem } from "../utils/animations";
import logo from "../assets/logo/logo.png";
import { Mail, ArrowLeft } from "lucide-react";

function ForgotPassword() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const schema = yup.object().shape({
    email: yup
      .string()
      .email(t("validation.email_invalid"))
      .required(t("validation.required")),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await sendResetEmail(data.email);
      if (
        response.success ||
        response.status === "success" ||
        response.status === 200
      ) {
        toast.success(
          i18n.language === "ar"
            ? "تم إرسال الرمز بنجاح"
            : "Reset code sent successfully",
        );
        navigate("/verify-reset-otp", { state: { email: data.email } });
      }
    } catch (error) {
      console.error("Forgot password failed", error);
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
              {t("forgot_password_title")}
            </CardTitle>
            <p className="text-muted-foreground mt-2 text-sm font-medium">
              {t("forgot_password_sub")}
            </p>
          </CardHeader>

          <CardContent>
            <motion.form
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-6 mt-4"
            >
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
                <Button
                  type="submit"
                  className="w-full h-12 text-lg font-bold shadow-lg shadow-primary/20 transition-all hover:shadow-primary/40 active:scale-[0.98]"
                  disabled={loading || !isValid}
                >
                  {loading ? (
                    <div className="flex items-center gap-2">
                      <div className="h-5 w-5 animate-spin rounded-full border-2 border-current border-t-transparent" />
                      <span>{t("send_code")}...</span>
                    </div>
                  ) : (
                    t("send_code")
                  )}
                </Button>
              </motion.div>
            </motion.form>
          </CardContent>

          <CardFooter className="flex flex-col gap-4 pt-0">
            <Link
              to="/login"
              className="flex items-center justify-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm font-bold group"
            >
              <ArrowLeft
                size={16}
                className="transition-transform group-hover:-translate-x-1 rtl:rotate-180 rtl:group-hover:translate-x-1"
              />
              {t("back_to_login")}
            </Link>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}

export default ForgotPassword;
