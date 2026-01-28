// Observer pattern for toast notifications
const toastListeners = new Set();

export const subscribe = (listener) => {
  toastListeners.add(listener);
  return () => toastListeners.delete(listener);
};

const notify = (message, type = "info") => {
  const id = Math.random().toString(36).substr(2, 9);
  toastListeners.forEach((listener) => listener({ id, message, type }));
  return id;
};

export const toast = {
  success: (msg) => notify(msg, "success"),
  error: (msg) => notify(msg, "error"),
  warning: (msg) => notify(msg, "warning"),
  info: (msg) => notify(msg, "info"),
};

export default toast;
