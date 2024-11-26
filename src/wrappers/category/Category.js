import CategoryPage from "../../components/category/CategoryPage";
import categoryData from "../../data/ourData/Category.json";
import clsx from "clsx";

const Category = ({ spaceBottomClass }) => {
    return (
        <div className={clsx("cat", spaceBottomClass)}>
            <div className="container">
                <div className="row">
                    <div className="box p-1 pr-2">
                        <h2 className="text-uppercase">
                            Hello Welcome to our website
                        </h2>
                        <p>
                            Here you can see our beautiful categories that have
                            tons tons of products i hope you enjoy and find what
                            you need
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
