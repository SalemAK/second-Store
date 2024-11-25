import { Fragment } from "react";
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import HeroSliderTwentyOne from "../../wrappers/hero-slider/HeroSliderTwentyOne";
import TabProductThirteen from "../../wrappers/product/TabProductThirteen";
import BannerEighteen from "../../wrappers/banner/BannerEighteen";
import CountDownThree from "../../wrappers/countdown/CountDownThree";
import FeatureIconFour from "../../wrappers/feature-icon/FeatureIconFour";
import NewsletterThree from "../../wrappers/newsletter/NewsletterThree";
import Category from "../../wrappers/category/Category";
import BrandLogoSliderThree from "../../wrappers/brand-logo/BrandLogoSliderThree";
import CategoryProductsHome from "../../wrappers/category/CategoryProductsHome";

const HomeAutoParts = () => {
    return (
        <Fragment>
            <SEO
                titleTemplate="Auto parts Home"
                description="Auto parts home of flone react minimalist eCommerce template."
            />
            <LayoutOne headerTop="visible">
                {/* banner */}
                <BannerEighteen spaceBottomClass="pb-85" />
                {/* <Categories /> */}
                <Category spaceBottomClass="pb-85" />
                {/* OUR Clients */}
                <BrandLogoSliderThree spaceBottomClass="pb-85" />
                <CategoryProductsHome
                    spaceBottomClass="pb-85"
                    categoryName="Electronics"
                />
                {/* tab product */}
                <TabProductThirteen
                    spaceBottomClass="pb-60"
                    spaceTopClass="pt-100"
                    category="auto parts"
                />
                {/* countdown */}
                <CountDownThree
                    spaceBottomClass="pb-100"
                    dateTime="November 13, 2023 12:12:00"
                    countDownImage="/assets/img/banner/deal-7.png"
                />
                {/* feature icon */}
                <FeatureIconFour
                    bgImg="/assets/img/bg/shape.png"
                    containerClass="container-fluid"
                    gutterClass="padding-10-row-col"
                    spaceTopClass="pt-50"
                    spaceBottomClass="pb-40"
                />
                {/* newsletter */}
                <NewsletterThree
                    spaceTopClass="pt-100"
                    spaceBottomClass="pb-100"
                    subscribeBtnClass="dark-red-subscribe"
                />
            </LayoutOne>
        </Fragment>
    );
};

export default HomeAutoParts;
