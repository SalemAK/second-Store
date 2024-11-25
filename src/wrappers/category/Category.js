import CategoryPage from "../../components/category/CategoryPage";
import categoryData from "../../data/category/category.json";
import clsx from "clsx";

const Category = ({ spaceBottomClass }) => {
    return (
        <div className={clsx("cat", spaceBottomClass)}>
            <div className="container">
                <div className="row">
                    <div className="box p-1 pr-2">
                        <h2 className="text-uppercase">Header !!!!!!</h2>
                        <p>Text-paragraph</p>
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
