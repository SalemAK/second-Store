import PropTypes from "prop-types";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useMemo } from "react";
import clsx from "clsx";
import { useTranslation } from "react-i18next";

const ShopCategories = ({ categories = [], getSortParams }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const { lang } = useParams();
    const { t } = useTranslation();

    // Parse the URL query to get selected categories as an array
    const searchParams = new URLSearchParams(location.search);

    const activeCategories = useMemo(() => {
        return searchParams.get("category")?.split(",").map(decodeURIComponent) || [];
    }, [location.search]);

    // Update product filter only when categories are selected
    useEffect(() => {
        if (activeCategories.length > 0) {
            getSortParams("category", activeCategories);
        } else {
            getSortParams("category", null); // Show all products when no category is selected
        }
    }, [activeCategories, getSortParams]);

    // Handle category toggle (add/remove categories)
    const handleCategoryClick = (category) => {
        const newSearchParams = new URLSearchParams(location.search);
        let updatedCategories;

        if (activeCategories.includes(category)) {
            // Remove category if already selected
            updatedCategories = activeCategories.filter((c) => c !== category);
        } else {
            // Add category if not selected
            updatedCategories = [...activeCategories, category];
        }

        // Update the URL query string with the new categories
        if (updatedCategories.length > 0) {
            newSearchParams.set("category", updatedCategories.join(","));
        } else {
            newSearchParams.delete("category");
        }

        navigate({ search: newSearchParams.toString() });

        // Update sort params (for product filtering)
        getSortParams("category", updatedCategories.length > 0 ? updatedCategories : null);
    };

    return (
        <div className="sidebar-widget">
            <h4 className="pro-sidebar-title">Categories</h4>
            <div className="sidebar-widget-list mt-30">
                {categories.length > 0 ? (
                    <ul>
                        {categories.map((cat) => {
                            const nameEn = cat["name-en"];
                            const nameLocalized = cat[`name-${lang}`] || nameEn;

                            return (
                                <li key={nameEn}>
                                    <div className="sidebar-widget-list-left">
                                        <button className={clsx({ active: activeCategories.includes(nameEn) })} onClick={() => handleCategoryClick(nameEn)}>
                                            <span className="checkmark" />
                                            {nameLocalized}
                                        </button>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                ) : (
                    <p>
                        <p>{t("shop.no_categories")}</p>
                    </p>
                )}
            </div>
        </div>
    );
};

ShopCategories.propTypes = {
    categories: PropTypes.array.isRequired,
    getSortParams: PropTypes.func.isRequired,
};

export default ShopCategories;
