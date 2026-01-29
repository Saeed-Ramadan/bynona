import { useEffect, Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "./components/ui/Toast";
import { useTranslation } from "react-i18next";
import { usePriceModeStore } from "./store/usePriceModeStore";
import axiosInstance from "./lib/axios";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import VerifyOtp from "./pages/VerifyOtp";
import ForgotPassword from "./pages/ForgotPassword";
import VerifyResetOtp from "./pages/VerifyResetOtp";
import ResetPassword from "./pages/ResetPassword";
import Cart from "./pages/Cart";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Checkout from "./pages/Checkout";
import Profile from "./pages/Profile";
import Orders from "./pages/Orders";
import Favorites from "./pages/Favorites";
import Offers from "./pages/Offers";
import NotFound from "./pages/NotFound";
import MainLayout from "./components/layout/MainLayout";
function App() {
  const { priceMode } = usePriceModeStore();
  const { i18n } = useTranslation();

  useEffect(() => {
    // Sync headers globally whenever mode or language changes
    axiosInstance.defaults.headers.common["Price-Mode"] = priceMode;
    axiosInstance.defaults.headers.common["Accept-Language"] = i18n.language;
  }, [priceMode, i18n.language]);

  return (
    <Router>
      <Toaster />
      <MainLayout>
        <Routes>
          {/* general ways */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verify-otp" element={<VerifyOtp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/verify-reset-otp" element={<VerifyResetOtp />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/offers" element={<Offers />} />
          <Route path="/cart" element={<Cart />} />

          {/* ways that want to protect */}
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/favorites" element={<Favorites />} />

          {/* page 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </MainLayout>
    </Router>
  );
}

export default App;
