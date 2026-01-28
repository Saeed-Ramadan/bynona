import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useLocation } from "react-router-dom";
import { verifyResetOtp, resendResetOtp } from "../lib/axios";
import Card, {
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "../components/ui/Card";
import Button from "../components/ui/Button";
import { motion } from "framer-motion";
import { toast } from "../lib/toast";
import logo from "../assets/logo/logo.png";
import { ShieldCheck, RefreshCcw } from "lucide-react";

function VerifyResetOtp() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const email = location.state?.email;

  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else {
      setCanResend(true);
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timer]);

  useEffect(() => {
    if (!email) {
      toast.error(
        i18n.language === "ar" ? "خطأ في الوصول للمعلومات" : "Access error",
      );
      navigate("/forgot-password");
    }
  }, [email, navigate, i18n.language]);

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;

    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

    if (element.nextElementSibling && element.value !== "") {
      element.nextElementSibling.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (
      e.key === "Backspace" &&
      !otp[index] &&
      e.target.previousElementSibling
    ) {
      e.target.previousElementSibling.focus();
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    const otpValue = otp.join("");
    if (otpValue.length !== 6) {
      toast.error(t("otp_invalid"));
      return;
    }

    setLoading(true);
    try {
      const response = await verifyResetOtp(email, otpValue);
      // Assuming success if error is not thrown, or check response.data
      if (
        response.success ||
        response.status === "success" ||
        response.status === 200
      ) {
        toast.success(
          i18n.language === "ar"
            ? "تم التحقق بنجاح!"
            : "Verified successfully!",
        );
        navigate("/reset-password", {
          state: {
            email,
            otp: otpValue,
            reset_token: response.reset_token,
          },
        });
      }
    } catch (error) {
      console.error("Verification failed", error);
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (!canResend) return;

    setResending(true);
    try {
      const response = await resendResetOtp(email);
      if (response.success || response.status === "success") {
        toast.success(t("resend_otp_success"));
        setTimer(60);
        setCanResend(false);
      }
    } catch (error) {
      console.error("Resend OTP failed", error);
    } finally {
      setResending(false);
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
            <div className="flex justify-center mb-4 text-primary">
              <ShieldCheck size={48} className="animate-pulse" />
            </div>
            <CardTitle className="text-2xl font-black text-primary uppercase tracking-tight">
              {t("otp_verification")}
            </CardTitle>
            <p className="text-muted-foreground mt-2 text-sm font-medium">
              {t("enter_otp")}
            </p>
            <p className="text-primary text-xs font-bold mt-1 opacity-80">
              {email}
            </p>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleVerify} className="space-y-8 mt-6">
              <div className="flex justify-center gap-2 dir-ltr">
                {otp.map((data, index) => (
                  <input
                    key={index}
                    type="text"
                    maxLength="1"
                    className="w-12 h-14 border-2 rounded-xl bg-background text-center text-xl font-bold text-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    value={data}
                    onChange={(e) => handleChange(e.target, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    onFocus={(e) => e.target.select()}
                  />
                ))}
              </div>

              <Button
                type="submit"
                className="w-full h-12 text-lg font-bold shadow-lg shadow-primary/20 transition-all hover:shadow-primary/40 active:scale-[0.98]"
                disabled={loading || otp.join("").length !== 6}
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    <span>{t("verify")}...</span>
                  </div>
                ) : (
                  t("verify")
                )}
              </Button>
            </form>
          </CardContent>

          <CardFooter className="flex flex-col gap-4 pt-0">
            <div className="flex flex-col items-center justify-center gap-2 w-full">
              <p className="text-xs text-muted-foreground font-medium">
                {t("resend_otp_msg")}
              </p>
              <button
                type="button"
                onClick={handleResend}
                disabled={!canResend || resending}
                className="flex items-center gap-2 text-primary hover:underline font-bold text-sm disabled:text-muted-foreground disabled:no-underline transition-all"
              >
                {resending ? (
                  <RefreshCcw size={14} className="animate-spin" />
                ) : (
                  <RefreshCcw size={14} />
                )}
                {canResend ? t("resend_otp") : `${t("resend_otp")} (${timer}s)`}
              </button>
            </div>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}

export default VerifyResetOtp;
