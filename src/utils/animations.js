// Framer Motion Animation Variants and Utilities

/**
 * Common animation variants for Framer Motion
 * Usage: <motion.div variants={fadeInUp} initial="hidden" animate="visible">
 */

// Fade animations
export const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export const fadeInDown = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

// Slide animations
export const slideInLeft = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export const slideInRight = {
  hidden: { opacity: 0, x: 20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

// Scale animations
export const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

export const scaleUp = {
  hidden: { scale: 0 },
  visible: {
    scale: 1,
    transition: { type: "spring", stiffness: 200, damping: 15 },
  },
};

// Stagger children animations
export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

export const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

// Hover and tap animations
export const hoverScale = {
  scale: 1.05,
  transition: { duration: 0.3, ease: "easeInOut" },
};

export const hoverLift = {
  y: -4,
  boxShadow:
    "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
  transition: { duration: 0.3, ease: "easeInOut" },
};

export const tapScale = {
  scale: 0.95,
  transition: { duration: 0.1 },
};

// Page transition animations
export const pageTransition = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: "easeInOut" },
  },
  exit: {
    opacity: 0,
    x: 20,
    transition: { duration: 0.3, ease: "easeInOut" },
  },
};

// Rotate animations
export const rotateIn = {
  hidden: { opacity: 0, rotate: -10 },
  visible: {
    opacity: 1,
    rotate: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

// Bounce animation
export const bounceIn = {
  hidden: { opacity: 0, scale: 0.3 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 10,
    },
  },
};

/**
 * Animation presets for common use cases
 */
export const animationPresets = {
  // Card animations
  card: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
    whileHover: { y: -4, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" },
  },

  // Button animations
  button: {
    whileHover: { scale: 1.05 },
    whileTap: { scale: 0.95 },
    transition: { duration: 0.2 },
  },

  // Image animations
  image: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.5 },
    whileHover: { scale: 1.05 },
  },

  // List item animations
  listItem: {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.4 },
  },
};

/**
 * Utility function to create stagger animations
 * @param {number} staggerDelay - Delay between each child animation
 * @param {number} delayChildren - Initial delay before children start animating
 */
export const createStagger = (staggerDelay = 0.1, delayChildren = 0.2) => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: staggerDelay,
      delayChildren: delayChildren,
    },
  },
});

/**
 * Utility function to create custom fade animation
 * @param {number} duration - Animation duration in seconds
 * @param {number} delay - Animation delay in seconds
 */
export const createFadeIn = (duration = 0.5, delay = 0) => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration, delay, ease: "easeOut" },
  },
});

/**
 * Viewport animation settings
 * Use with whileInView prop
 */
export const viewportSettings = {
  once: true,
  amount: 0.3,
  margin: "0px 0px -100px 0px",
};
