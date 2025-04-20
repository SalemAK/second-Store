import { Suspense, lazy, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useParams, Navigate } from "react-router-dom";
import ScrollToTop from "./helpers/scroll-top";
import { useTranslation } from "react-i18next";

// Lazy-loaded pages
const HomePage = lazy(() => import("./pages/home/HomePage"));
const ShopGridStandard = lazy(() => import("./pages/shop/ShopGridStandard"));
const Product = lazy(() => import("./pages/shop-product/Product"));
const BlogStandard = lazy(() => import("./pages/blog/BlogStandard"));
const BlogNoSidebar = lazy(() => import("./pages/blog/BlogNoSidebar"));
const BlogRightSidebar = lazy(() => import("./pages/blog/BlogRightSidebar"));
const BlogDetailsStandard = lazy(() => import("./pages/blog/BlogDetailsStandard"));
const About = lazy(() => import("./pages/other/About"));
const Contact = lazy(() => import("./pages/other/Contact"));
const Cart = lazy(() => import("./pages/other/Cart"));
const Wishlist = lazy(() => import("./pages/other/Wishlist"));
const Compare = lazy(() => import("./pages/other/Compare"));
const Checkout = lazy(() => import("./pages/other/Checkout"));
const PlaceOrder = lazy(() => import("./pages/other/PlaceOrder"));
const AdminProducts = lazy(() => import("./pages/admin/AdminProducts"));
const AdminLogin = lazy(() => import("./pages/admin/AdminLogin"));
const NotFound = lazy(() => import("./pages/other/NotFound"));

const SupportedLanguages = ["en", "ar"];

const LangRoutes = () => {
    const { lang } = useParams();
    const { i18n } = useTranslation();

    useEffect(() => {
        if (SupportedLanguages.includes(lang)) {
            i18n.changeLanguage(lang);
            document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
        }
    }, [lang, i18n]);

    if (!SupportedLanguages.includes(lang)) {
        return <Navigate to="/en" replace />;
    }

    return (
        <ScrollToTop>
            <Suspense
                fallback={
                    <div className="flone-preloader-wrapper">
                        <div className="flone-preloader">
                            <span></span>
                            <span></span>
                        </div>
                    </div>
                }
            >
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="shop-grid-standard" element={<ShopGridStandard />} />
                    <Route path="product/:id" element={<Product />} />
                    <Route path="cart" element={<Cart />} />
                    <Route path="checkout" element={<Checkout />} />
                    <Route path="contact" element={<Contact />} />
                    <Route path="about" element={<About />} />
                    <Route path="PlaceOrder" element={<PlaceOrder />} />
                    <Route path="admin/products" element={<AdminProducts />} />
                    <Route path="admin-login-page" element={<AdminLogin />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Suspense>
        </ScrollToTop>
    );
};

const App = () => (
    <Router>
        <Routes>
            <Route path="/:lang/*" element={<LangRoutes />} />
            {/* Fallback redirect to /en if no lang is specified */}
            <Route path="*" element={<Navigate to="/en" replace />} />
        </Routes>
    </Router>
);

export default App;
