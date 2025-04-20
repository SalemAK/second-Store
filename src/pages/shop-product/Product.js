import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { useParams, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import RelatedProductSlider from "../../wrappers/product/RelatedProductSlider";
import ProductDescriptionTab from "../../wrappers/product/ProductDescriptionTab";
import ProductImageDescription from "../../wrappers/product/ProductImageDescription";

const Product = () => {
    const { t } = useTranslation();
    const { lang } = useParams();
    let { pathname } = useLocation();
    let { id } = useParams();
    const { products } = useSelector((state) => state.product);
    const product = products.find((product) => product.id === parseInt(id));

    return (
        <Fragment>
            <SEO titleTemplate={t("product_page.product_title")} description={t("product_page.product_description")} />
            <LayoutOne headerTop="visible">
                {/* breadcrumb */}
                <Breadcrumb
                    pages={[
                        { label: t("breadcrumb.home"), path: `/${lang}/` },
                        {
                            label: t("breadcrumb.collection"),
                            path: `/${lang}/shop-grid-standard`,
                        },
                        {
                            label: t("breadcrumb.product"),
                            path: `/${lang}${pathname}`,
                        },
                    ]}
                />

                {/* product image with description */}
                <ProductImageDescription spaceTopClass="pt-100" spaceBottomClass="pb-100" product={product} />

                {/* product description tab */}
                <ProductDescriptionTab spaceBottomClass="pb-90" productFullDesc={product.fullDescription} product={product} />

                {/* related products */}
                <RelatedProductSlider spaceBottomClass="pb-95" category={product.category[0]} />
            </LayoutOne>
        </Fragment>
    );
};

export default Product;
