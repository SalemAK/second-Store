import React from "react";
import CategoryPage from "../../components/category/CategoryPage";
import categoryData from "../../data/ourData/Category.json";
import clsx from "clsx";
import { useTranslation } from "react-i18next";

const Category = ({ spaceBottomClass }) => {
    const { t } = useTranslation();

    return (
        <div className={clsx("cat", spaceBottomClass)}>
            <div className="container">
                <div className="row">
                    <div className="box p-4">
                        <h2 className="text-uppercase">{t("category.title")}</h2>
                        <p>{t("category.description")}</p>
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
