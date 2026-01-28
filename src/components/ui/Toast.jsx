import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, XCircle, AlertCircle, Info, X } from "lucide-react";
import { subscribe } from "../../lib/toast";
import { useTranslation } from "react-i18next";
import "./Toast.css";

const ToastItem = ({ toast, onRemove }) => {
  const { t } = useTranslation();
  const duration = 4000;

  useEffect(() => {
    const timer = setTimeout(() => {
      onRemove(toast.id);
    }, duration);
    return () => clearTimeout(timer);
  }, [toast.id, onRemove, duration]);

  const icons = {
    success: <CheckCircle size={20} />,
    error: <XCircle size={20} />,
    warning: <AlertCircle size={20} />,
    info: <Info size={20} />,
  };

  const titles = {
    success: t("toast_success", "Success"),
    error: t("toast_error", "Error"),
    warning: t("toast_warning", "Warning"),
    info: t("toast_info", "Info"),
  };

  // Fallback localized titles for Arabic if not in i18n files yet
  const getTitle = () => {
    const lang = document.documentElement.lang || "ar";
    if (lang === "ar") {
      const arTitles = {
        success: "تم بنجاح",
        error: "فشل العملية",
        warning: "تنبيه",
        info: "ملاحظة",
      };
      return arTitles[toast.type] || arTitles.info;
    }
    return titles[toast.type] || titles.info;
  };

  return (
    <motion.div
      layout
      initial={{
        opacity: 0,
        x: document.documentElement.dir === "rtl" ? -50 : 50,
        scale: 0.9,
      }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
      className={`toast-item ${toast.type}`}
    >
      <div className="toast-content">
        <div className="toast-icon-wrapper">{icons[toast.type]}</div>
        <div className="toast-message-container">
          <span
            className="toast-title"
            style={{
              fontSize: "0.75rem",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              opacity: 0.6,
              marginBottom: "2px",
              fontWeight: 700,
            }}
          >
            {getTitle()}
          </span>
          <span className="toast-message">{toast.message}</span>
        </div>
      </div>
      <button
        onClick={() => onRemove(toast.id)}
        className="toast-close"
        aria-label="Close"
      >
        <X size={16} />
      </button>

      <motion.div
        className="toast-progress"
        initial={{ scaleX: 1 }}
        animate={{ scaleX: 0 }}
        transition={{ duration: duration / 1000, ease: "linear" }}
      />
    </motion.div>
  );
};

export const Toaster = () => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback(({ id, message, type }) => {
    setToasts((prev) => [...prev, { id, message, type }]);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  useEffect(() => {
    return subscribe(addToast);
  }, [addToast]);

  return (
    <div className="toast-container">
      <AnimatePresence mode="popLayout">
        {toasts.map((t) => (
          <ToastItem key={t.id} toast={t} onRemove={removeToast} />
        ))}
      </AnimatePresence>
    </div>
  );
};
