import { Fragment } from "react";
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";

import BannerOne from "../../wrappers/banner/BannerOne";
import BannerTwo from "../../wrappers/banner/BannerTwo";
import BannerThree from "../../wrappers/banner/BannerThree";
import BannerFour from "../../wrappers/banner/BannerFour";
import BannerFive from "../../wrappers/banner/BannerFive";
import BannerSix from "../../wrappers/banner/BannerSix";
import BannerSeven from "../../wrappers/banner/BannerSeven";
import BannerEight from "../../wrappers/banner/BannerEight";
import BannerNine from "../../wrappers/banner/BannerNine";
import BannerTen from "../../wrappers/banner/BannerTen";
import BannerEleven from "../../wrappers/banner/BannerEleven";
import BannerTwelve from "../../wrappers/banner/BannerTwelve";
import BannerThirteen from "../../wrappers/banner/BannerThirteen";
import BannerFourteen from "../../wrappers/banner/BannerFourteen";
import BannerFifteen from "../../wrappers/banner/BannerFifteen";
import BannerSixteen from "../../wrappers/banner/BannerSixteen";
import BannerSeventeen from "../../wrappers/banner/BannerSeventeen";
import BannerEighteen from "../../wrappers/banner/BannerEighteen";
import BannerNineteen from "../../wrappers/banner/BannerNineteen";
import BannerTwenty from "../../wrappers/banner/BannerTwenty";
import BannerTwentyOne from "../../wrappers/banner/BannerTwentyOne";
import BannerTwentyTwo from "../../wrappers/banner/BannerTwentyTwo";
import BannerTwentyThree from "../../wrappers/banner/BannerTwentyThree";
import BannerTwentyFour from "../../wrappers/banner/BannerTwentyFour";
import BannerTwentyFive from "../../wrappers/banner/BannerTwentyFive";
import BannerTwentySix from "../../wrappers/banner/BannerTwentySix";
import BannerTwentySeven from "../../wrappers/banner/BannerTwentySeven";
import BannerTwentyEight from "../../wrappers/banner/BannerTwentyEight";
import BannerTwentyNine from "../../wrappers/banner/BannerTwentyNine";
import BannerThirty from "../../wrappers/banner/BannerThirty";
import BannerThirtyOne from "../../wrappers/banner/BannerThirtyOne";
import BannerThirtyTwo from "../../wrappers/banner/BannerThirtyTwo";
import BannerThirtyThree from "../../wrappers/banner/BannerThirtyThree";
import BannerThirtyFour from "../../wrappers/banner/BannerThirtyFour";
import BannerThirtyFive from "../../wrappers/banner/BannerThirtyFive";
import BannerThirtySix from "../../wrappers/banner/BannerThirtySix";
import BannerThirtySeven from "../../wrappers/banner/BannerThirtySeven";
import BannerThirtyEight from "../../wrappers/banner/BannerThirtyEight";

const banners = [
    BannerOne,
    BannerTwo,
    BannerThree,
    BannerFour,
    BannerFive,
    BannerSix,
    BannerSeven,
    BannerEight,
    BannerNine,
    BannerTen,
    BannerEleven,
    BannerTwelve,
    BannerThirteen,
    BannerFourteen,
    BannerFifteen,
    BannerSixteen,
    BannerSeventeen,
    BannerEighteen,
    BannerNineteen,
    BannerTwenty,
    BannerTwentyOne,
    BannerTwentyTwo,
    BannerTwentyThree,
    BannerTwentyFour,
    BannerTwentyFive,
    BannerTwentySix,
    BannerTwentySeven,
    BannerTwentyEight,
    BannerTwentyNine,
    BannerThirty,
    BannerThirtyOne,
    BannerThirtyTwo,
    BannerThirtyThree,
    BannerThirtyFour,
    BannerThirtyFive,
    BannerThirtySix,
    BannerThirtySeven,
    BannerThirtyEight,
];

const BannersPage = () => {
    return (
        <Fragment>
            <SEO
                titleTemplate="Auto parts Home"
                description="Auto parts home of flone react minimalist eCommerce template."
            />
            <LayoutOne headerTop="visible">
                {banners.map((BannerComponent, index) => (
                    <div key={index} className="section-title text-center">
                        <h1>{`Banner ${index + 1}`}</h1>
                        <BannerComponent spaceBottomClass="pb-85" />
                    </div>
                ))}
            </LayoutOne>
        </Fragment>
    );
};

export default BannersPage;
