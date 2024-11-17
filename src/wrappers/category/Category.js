import CategoryPage from "../../pages/check/CategoryPage";
import categoryData from "../../data/category/category.json";
import clsx from "clsx";

const Category = ({ spaceBottomClass }) => {
    return (
        <div className={clsx("cat", spaceBottomClass)}>
            <div className="container">
                <div className="row">
                    <div className="box p-1 pr-2">
                        <h2 className="text-uppercase">
                            BUILDING CONSTRUCTION MATERIAL SUPPLIERS IN SAUDI
                            ARABIA - YOUMATS
                        </h2>
                        <p>
                            YouMats is one of the biggest building materials
                            suppliers in Saudi Arabia. Providing you with a wide
                            range of construction material supplies at the best
                            prices. Contact us!
                        </p>
                    </div>
                    {categoryData?.map((single, key) => (
                        <div className="box" key={key}>
                            <CategoryPage data={single} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
export default Category;
