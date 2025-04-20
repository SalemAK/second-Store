import React from "react";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const CustomBreadcrumb = ({ pages }) => {
    const { i18n } = useTranslation();
    const isRTL = i18n.language === "ar";

    // Reverse pages for RTL languages
    const displayPages = isRTL ? pages : pages;

    return (
        <div className="breadcrumb-area pt-35 pb-35 bg-gray-3">
            <div className="container text-center">
                <Breadcrumb className={`d-inline-flex ${isRTL ? "flex-row-reverse rtl-breadcrumb" : ""} justify-content-center`}>
                    {displayPages.map(({ label, path }, index) => {
                        const isLast = index === displayPages.length - 1;
                        return (
                            <Breadcrumb.Item key={label} linkAs={!isLast ? Link : undefined} linkProps={!isLast ? { to: path } : undefined} active={isLast}>
                                {label}
                            </Breadcrumb.Item>
                        );
                    })}
                </Breadcrumb>
            </div>
        </div>
    );
};

export default CustomBreadcrumb;
