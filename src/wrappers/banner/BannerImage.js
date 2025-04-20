import React from "react";
import { useTranslation } from "react-i18next";
import { Link, useParams } from "react-router-dom";

const ResponsiveBanner = () => {
    const { t } = useTranslation();
    const { lang } = useParams();
    return (
        <div className="banner">
            <div className="container" style={{ backgroundColor: "#d5efff" }}>
                <div className="row">
                    <div className="col-sm-5 text-center p-5">
                        <h1 className="fs-1">{t("responsive_banner.title")}</h1>
                        <p className="pt-3">{t("responsive_banner.description")}</p>
                        <Link to={`/${lang}/contact`}>
                            <button className="btn btn-success mt-4">{t("responsive_banner.button")}</button>
                        </Link>
                    </div>
                    <div className="col-sm-7">
                        <img className="img-fluid rounded" src="/assets/img/warhouse.jpeg" alt="Warehouse" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResponsiveBanner;
