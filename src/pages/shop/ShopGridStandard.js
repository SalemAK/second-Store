import { Fragment, useState, useEffect } from "react";
import Paginator from "react-hooks-paginator";
import { useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { getSortedProducts } from "../../helpers/product";
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import ShopSidebar from "../../wrappers/product/ShopSidebar";
import ShopTopbar from "../../wrappers/product/ShopTopbar";
import ShopProducts from "../../wrappers/product/ShopProducts";
import { useTranslation } from "react-i18next";

const ShopGridStandard = () => {
    const { t } = useTranslation();
    const [layout, setLayout] = useState("grid three-column");
    const [sortType, setSortType] = useState("");
    const [sortValue, setSortValue] = useState("");
    const [sortMax, setSortMax] = useState("");
    const [priceSortType, setPriceSortType] = useState("");
    const [priceSortValue, setPriceSortValue] = useState("");
    const [filterSortType, setFilterSortType] = useState("");
    const [filterSortValue, setFilterSortValue] = useState("");
    const [searchSortType, setSearchSortType] = useState("");
    const [searchSortValue, setSearchSortValue] = useState("");
    const [offset, setOffset] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentData, setCurrentData] = useState([]);
    const [sortedProducts, setSortedProducts] = useState([]);
    const { products } = useSelector((state) => state.product);

    const pageLimit = 15;
    let { pathname } = useLocation();

    const getLayout = (layout) => {
        setLayout(layout);
    };

    const getSortPrice = (sortType, sortValue, sortMax) => {
        setPriceSortType(sortType);
        setPriceSortValue(sortValue);
        setSortMax(sortMax);
    };

    const getSortParams = (sortType, sortValue, sortMax) => {
        setSortType(sortType);
        setSortValue(sortValue);
        setSortMax(sortMax);
    };

    const getFilterSortParams = (sortType, sortValue, sortMax) => {
        setFilterSortType(sortType);
        setFilterSortValue(sortValue);
        setSortMax(sortMax);
    };

    const getSearchSortParams = (sortType, sortValue) => {
        setSearchSortType(sortType);
        setSearchSortValue(sortValue);
        setSortMax(sortMax);
    };
    useEffect(() => {
        let updatedProducts = [...products]; // Start with all products
        // Step 1: Sort by the selected type and value
        updatedProducts = getSortedProducts(products, sortType, sortValue, sortMax);

        // Step 2: Sort by price if a price filter is applied
        updatedProducts = getSortedProducts(updatedProducts, priceSortType, priceSortValue, sortMax);

        // Step 3: Apply additional filter sorting if necessary
        updatedProducts = getSortedProducts(updatedProducts, filterSortType, filterSortValue, sortMax);
        updatedProducts = getSortedProducts(updatedProducts, searchSortType, searchSortValue, sortMax);

        // Step 4: Update the sorted products and current data
        setSortedProducts(updatedProducts);
        setCurrentData(updatedProducts.slice(offset, offset + pageLimit));
    }, [offset, products, sortType, sortValue, sortMax, filterSortType, filterSortValue, priceSortType, priceSortValue, searchSortType, searchSortValue]);
    const location = useLocation();

    useEffect(() => {
        if (!location.search) {
            setSortedProducts(products); // Reset to all products if no filters are present
            setCurrentData(products.slice(offset, offset + pageLimit));
        }
    }, [location.search, products]); // Depend on location.search and products
    const { lang } = useParams();
    return (
        <Fragment>
            <SEO titleTemplate="Shop Page" description="Shop page of flone react minimalist eCommerce template." />

            <LayoutOne headerTop="visible">
                {/* breadcrumb */}
                <Breadcrumb
                    pages={[
                        { label: t("breadcrumb.home"), path: `/${lang}/` },
                        { label: t("breadcrumb.shop"), path: `/${lang}${pathname}` },
                    ]}
                />

                <div className="shop-area pt-95 pb-100">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-3 order-2 order-lg-1">
                                {/* shop sidebar */}
                                <ShopSidebar products={products} getSortParams={getSortParams} getSortPrice={getSortPrice} getSearchSortParams={getSearchSortParams} sideSpaceClass="mr-30" />
                            </div>
                            <div className="col-lg-9 order-1 order-lg-2">
                                {/* shop topbar default */}
                                <ShopTopbar getLayout={getLayout} getFilterSortParams={getFilterSortParams} productCount={products.length} sortedProductCount={currentData.length} />

                                {/* shop page content default */}
                                <ShopProducts layout={layout} products={currentData} />

                                {/* shop product pagination */}
                                <div className="pro-pagination-style text-center mt-30">
                                    <Paginator
                                        totalRecords={sortedProducts.length}
                                        pageLimit={pageLimit}
                                        pageNeighbours={2}
                                        setOffset={setOffset}
                                        currentPage={currentPage}
                                        setCurrentPage={setCurrentPage}
                                        pageContainerClass="mb-0 mt-0"
                                        pagePrevText="«"
                                        pageNextText="»"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </LayoutOne>
        </Fragment>
    );
};

export default ShopGridStandard;
