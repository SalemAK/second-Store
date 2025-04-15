import { Suspense, lazy } from "react";
import ScrollToTop from "./helpers/scroll-top";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PlaceOrder from "./pages/other/PlaceOrder";
import AdminProducts from "./pages/admin/AdminProducts";
import AdminLogin from "./pages/admin/AdminLogin";

const HomePage = lazy(() => import("./pages/home/HomePage"));

// shop pages
const ShopGridStandard = lazy(() => import("./pages/shop/ShopGridStandard"));

// product pages
const Product = lazy(() => import("./pages/shop-product/Product"));

// blog pages
const BlogStandard = lazy(() => import("./pages/blog/BlogStandard"));
const BlogNoSidebar = lazy(() => import("./pages/blog/BlogNoSidebar"));
const BlogRightSidebar = lazy(() => import("./pages/blog/BlogRightSidebar"));
const BlogDetailsStandard = lazy(() => import("./pages/blog/BlogDetailsStandard"));

// other pages
const About = lazy(() => import("./pages/other/About"));
const Contact = lazy(() => import("./pages/other/Contact"));

const Cart = lazy(() => import("./pages/other/Cart"));
const Wishlist = lazy(() => import("./pages/other/Wishlist"));
const Compare = lazy(() => import("./pages/other/Compare"));
const Checkout = lazy(() => import("./pages/other/Checkout"));

const NotFound = lazy(() => import("./pages/other/NotFound"));

const App = () => {
    return (
        <Router>
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
                        <Route path={process.env.PUBLIC_URL + "/"} element={<HomePage />} />
                        <Route path={process.env.PUBLIC_URL + "/shop-grid-standard"} element={<ShopGridStandard />} />
                        <Route path={process.env.PUBLIC_URL + "/product/:id"} element={<Product />} />
                        <Route path={process.env.PUBLIC_URL + "/cart"} element={<Cart />} />
                        <Route path={process.env.PUBLIC_URL + "/checkout"} element={<Checkout />} />
                        <Route path={process.env.PUBLIC_URL + "/contact"} element={<Contact />} />
                        <Route path={process.env.PUBLIC_URL + "/about"} element={<About />} />
                        <Route path={process.env.PUBLIC_URL + "/PlaceOrder"} element={<PlaceOrder />} />
                        <Route path={process.env.PUBLIC_URL + "/admin/products"} element={<AdminProducts />} />
                        <Route path={process.env.PUBLIC_URL + "/admin-login-page"} element={<AdminLogin />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </Suspense>
            </ScrollToTop>
        </Router>
    );
};

export default App;
