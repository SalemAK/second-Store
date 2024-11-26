import { Fragment } from "react";
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import BannerEighteen from "../../wrappers/banner/BannerEighteen";
import Category from "../../wrappers/category/Category";
import BrandLogoSliderThree from "../../wrappers/brand-logo/BrandLogoSliderThree";
import CategoryProductsHome from "../../wrappers/category/CategoryProductsHome";

const HomePage = () => {
    return (
        <Fragment>
            <SEO titleTemplate="Home" description="retail store home page" />
            <LayoutOne headerTop="visible">
                {/* banner */}
                <BannerEighteen spaceBottomClass="pb-85" />
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
