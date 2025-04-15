import PropTypes from "prop-types";
import clsx from "clsx";
import ProductgridList from "./ProductgridList";

const ShopProducts = ({ products, layout }) => {
    return (
        <div className="shop-bottom-area ">
            <div className={clsx("row row-cols-1 row-cols-md-2 g-2", layout)}>
                <ProductgridList products={products} spaceBottomClass="" />
            </div>
        </div>
    );
};

ShopProducts.propTypes = {
    layout: PropTypes.string,
    products: PropTypes.array,
};

export default ShopProducts;
