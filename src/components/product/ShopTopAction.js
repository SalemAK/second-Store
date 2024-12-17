import PropTypes from "prop-types";
import { setActiveLayout } from "../../helpers/product";
import { useLocation, useNavigate } from "react-router-dom";

const ShopTopAction = ({
    getLayout,
    getFilterSortParams,
    productCount,
    sortedProductCount,
}) => {
    const location = useLocation();
    const navigate = useNavigate();
    const searchParams = new URLSearchParams(location.search);
    const activeFilter = searchParams.get("filter") || "default";

    const handleFilter = (value) => {
        const newSearchParams = new URLSearchParams(location.search);
        if (value && value !== "default") {
            newSearchParams.set("filter", value);
        } else {
            newSearchParams.delete("filter");
        }
        navigate({ search: newSearchParams.toString() });
        getFilterSortParams("filterSort", value);
    };

    return (
        <div className="shop-top-bar mb-35">
            <div className="select-shoing-wrap">
                <div className="shop-select">
                    <select
                        value={activeFilter}
                        onChange={(e) => handleFilter(e.target.value)}
                    >
                        <option value="default">Default</option>
                        <option value="priceHighToLow">
                            Price - High to Low
                        </option>
                        <option value="priceLowToHigh">
                            Price - Low to High
                        </option>
                        <option value="NewestArrivals">Newest Arrivals</option>
                    </select>
                </div>
                <p>
                    Showing {sortedProductCount} of {productCount} result
                </p>
            </div>

            <div className="shop-tab">
                <button
                    onClick={(e) => {
                        getLayout("grid two-column");
                        setActiveLayout(e);
                    }}
                >
                    <i className="fa fa-th-large" />
                </button>
                <button
                    onClick={(e) => {
                        getLayout("grid three-column");
                        setActiveLayout(e);
                    }}
                >
                    <i className="fa fa-th" />
                </button>
                <button
                    onClick={(e) => {
                        getLayout("list");
                        setActiveLayout(e);
                    }}
                >
                    <i className="fa fa-list-ul" />
                </button>
            </div>
        </div>
    );
};

ShopTopAction.propTypes = {
    getFilterSortParams: PropTypes.func,
    getLayout: PropTypes.func,
    productCount: PropTypes.number,
    sortedProductCount: PropTypes.number,
};

export default ShopTopAction;
