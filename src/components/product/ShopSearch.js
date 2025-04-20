import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const ShopSearch = ({ getSortParams, getSearchSortParams }) => {
    const { t } = useTranslation();
    const location = useLocation();
    const navigate = useNavigate();
    const searchParams = new URLSearchParams(location.search);
    const activeSearch = searchParams.get("search") || "";

    const handleFilter = (value) => {
        const newSearchParams = new URLSearchParams(location.search);
        if (value) {
            newSearchParams.set("search", value);
        } else {
            newSearchParams.delete("search");
        }
        navigate({ search: newSearchParams.toString() });

        getSearchSortParams("search", value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    useEffect(() => {
        if (activeSearch) {
            getSearchSortParams("search", activeSearch);
        }
    }, [activeSearch, getSearchSortParams]);

    return (
        <div className="sidebar-widget">
            <h4 className="pro-sidebar-title">{t("shop.search")}</h4>
            <div className="pro-sidebar-search mb-50 mt-25">
                <form className="pro-sidebar-search-form" onSubmit={handleSubmit}>
                    <input type="text" value={activeSearch} placeholder={t("shop.search_placeholder")} onChange={(e) => handleFilter(e.target.value)} />
                    <button>
                        <i className="pe-7s-search" />
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ShopSearch;
