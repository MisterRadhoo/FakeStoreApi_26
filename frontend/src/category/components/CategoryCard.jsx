import { Link } from "react-router-dom";

const CategoryCard = ({ category }) => {
    return (
        <Link
            to={`/categories/${category._id}`}
            className="block border-4 border-[#030712] bg-white p-5 shadow-[6px_6px_0_#030712] transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-none dark:border-white dark:bg-[#1f2937] dark:text-white dark:shadow-[6px_6px_0_#ffffff]"
        >
            <h3 className="text-lg text-[#ff3040] drop-shadow-[2px_2px_0_#030712] dark:drop-shadow-[2px_2px_0_#ffffff]">
                {category.name}
            </h3>

            {category.slug ? (
                <p className="mt-3 text-xs break-all">
                    SLUG: {category.slug}
                </p>
            ) : null}
        </Link>
    );
};

export default CategoryCard;