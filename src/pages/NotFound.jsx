import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Home } from "lucide-react";
import { motion } from "framer-motion";
import { staggerContainer, staggerItem } from "../utils/animations";

function NotFound() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <motion.div
      className="flex items-center justify-center min-h-[calc(100vh-400px)] px-4 mt-10"
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
    >
      <div className="max-w-2xl w-full text-center">
        {/* 404 Robot Illustration */}
        <motion.div className="mb-8 relative" variants={staggerItem}>
          <div className="inline-block relative">
            {/* 404 Text Background */}
            <motion.div
              className="text-[120px] sm:text-[160px] md:text-[200px] font-bold text-primary/20 select-none leading-none"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              404
            </motion.div>

            {/* Robot Character */}
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <div className="relative w-24 h-32 sm:w-32 sm:h-40 md:w-40 md:h-48">
                {/* Robot Head */}
                <motion.div
                  className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-linear-to-b from-slate-600 to-slate-700 dark:from-slate-500 dark:to-slate-600 rounded-2xl shadow-lg"
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                >
                  {/* Antenna */}
                  <motion.div
                    className="absolute -top-3 left-1/2 -translate-x-1/2 w-1 h-3 bg-slate-600 dark:bg-slate-500"
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    transition={{ delay: 0.7, duration: 0.3 }}
                  >
                    <motion.div
                      className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-primary rounded-full"
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [1, 0.7, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    ></motion.div>
                  </motion.div>

                  {/* Eyes */}
                  <div className="absolute top-1/3 left-1/2 -translate-x-1/2 flex gap-2 sm:gap-3">
                    <motion.div
                      className="w-3 h-3 sm:w-4 sm:h-4 bg-cyan-400 rounded-full"
                      animate={{
                        opacity: [1, 0.3, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    ></motion.div>
                    <motion.div
                      className="w-3 h-3 sm:w-4 sm:h-4 bg-cyan-400 rounded-full"
                      animate={{
                        opacity: [1, 0.3, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 0.2,
                      }}
                    ></motion.div>
                  </div>

                  {/* Mouth */}
                  <motion.div
                    className="absolute bottom-3 left-1/2 -translate-x-1/2 w-8 sm:w-10 h-1 bg-slate-800 dark:bg-slate-900 rounded-full"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.8, duration: 0.3 }}
                  ></motion.div>
                </motion.div>

                {/* Robot Body */}
                <motion.div
                  className="absolute top-14 sm:top-18 md:top-22 left-1/2 -translate-x-1/2 w-20 h-16 sm:w-24 sm:h-20 md:w-28 md:h-24 bg-linear-to-b from-slate-700 to-slate-800 dark:from-slate-600 dark:to-slate-700 rounded-xl shadow-lg"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
                >
                  {/* Body Details */}
                  <motion.div
                    className="absolute top-2 left-1/2 -translate-x-1/2 flex gap-1"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.9 }}
                  >
                    <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                    <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                    <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                  </motion.div>

                  {/* Arms */}
                  <motion.div
                    className="absolute top-2 -left-4 sm:-left-5 w-3 h-10 sm:h-12 bg-slate-600 dark:bg-slate-500 rounded-full transform -rotate-12"
                    initial={{ x: 10, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.7, type: "spring" }}
                  ></motion.div>
                  <motion.div
                    className="absolute top-2 -right-4 sm:-right-5 w-3 h-10 sm:h-12 bg-slate-600 dark:bg-slate-500 rounded-full transform rotate-12"
                    initial={{ x: -10, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.7, type: "spring" }}
                  ></motion.div>
                </motion.div>

                {/* Robot Legs */}
                <motion.div
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 flex gap-2"
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  <div className="w-3 h-8 sm:h-10 bg-slate-600 dark:bg-slate-500 rounded-b-lg"></div>
                  <div className="w-3 h-8 sm:h-10 bg-slate-600 dark:bg-slate-500 rounded-b-lg"></div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Error Message */}
        <motion.div className="space-y-4 mb-8" variants={staggerItem}>
          <motion.h1
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            {t("not_found_title")}
          </motion.h1>
          <motion.p
            className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-md mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            {t("not_found_description")}
          </motion.p>
        </motion.div>

        {/* Back to Home Button */}
        <motion.button
          onClick={() => navigate("/")}
          className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-lg shadow-lg cursor-pointer"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          whileHover={{
            scale: 1.05,
            boxShadow:
              "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
          }}
          whileTap={{ scale: 0.95 }}
        >
          <Home className="w-5 h-5" />
          <span className="text-base sm:text-lg">{t("back_to_home")}</span>
        </motion.button>

        {/* Decorative Elements */}
        <motion.div
          className="mt-12 flex justify-center gap-2 opacity-30"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ delay: 0.8 }}
        >
          <motion.div
            className="w-2 h-2 bg-primary rounded-full"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
          ></motion.div>
          <motion.div
            className="w-2 h-2 bg-primary rounded-full"
            animate={{ y: [0, -10, 0] }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.1,
            }}
          ></motion.div>
          <motion.div
            className="w-2 h-2 bg-primary rounded-full"
            animate={{ y: [0, -10, 0] }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.2,
            }}
          ></motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default NotFound;
