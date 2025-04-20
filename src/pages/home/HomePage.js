import { Fragment } from "react";
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import BannerEighteen from "../../wrappers/banner/BannerEighteen";
import Category from "../../wrappers/category/Category";
import BrandLogoSliderThree from "../../wrappers/brand-logo/BrandLogoSliderThree";
import CategoryProductsHome from "../../wrappers/category/CategoryProductsHome";
import ResponsiveBanner from "../../wrappers/banner/BannerImage";
import { useTranslation } from "react-i18next";

const HomePage = () => {
    const { t } = useTranslation();
    return (
        <Fragment>
            <SEO titleTemplate={t("home_page.seo_title")} description={t("home_page.seo_description")} />
            <LayoutOne headerTop="visible">
                {/* banner */}
                <BannerEighteen spaceBottomClass="" />
                {/* home banner */}
                <ResponsiveBanner />
                {/* <Categories /> */}
                <Category spaceBottomClass="pb-85" />
                {/* OUR Clients */}
                <BrandLogoSliderThree spaceBottomClass="pb-85" />
                {/* Category Product */}
                <CategoryProductsHome spaceBottomClass="pb-85" />
            </LayoutOne>
        </Fragment>
    );
};

export default HomePage;
