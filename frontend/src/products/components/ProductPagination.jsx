const ProductPagination = ({ paginationResult, changePage }) => {
    if (!paginationResult) {
        return null;
    }

    const buttonClass =
        "border-4 border-[#030712] px-4 py-3 text-xs text-[#030712] shadow-[5px_5px_0_#030712] active:translate-x-1.25 active:translate-y-1.25 active:shadow-none dark:border-white dark:text-white dark:shadow-[5px_5px_0_#ffffff]";

    return (
        <div className="mt-12 flex items-center justify-center gap-6">
            <button
                type="button"
                disabled={!paginationResult.prevPage}
                onClick={() => changePage(paginationResult.prevPage)}
                className={`${buttonClass} bg-[#8ec5ff] disabled:cursor-not-allowed disabled:bg-gray-300 disabled:opacity-60 dark:bg-blue-700 dark:disabled:bg-gray-700`}
            >
                PREV
            </button>

            <span className="text-xs">
                {paginationResult.currentPage} /{" "}
                {paginationResult.numberOfPages}
            </span>

            <button
                type="button"
                disabled={!paginationResult.nextPage}
                onClick={() => changePage(paginationResult.nextPage)}
                className={`${buttonClass} bg-[#8ec5ff] disabled:cursor-not-allowed disabled:bg-gray-300 disabled:opacity-60 dark:bg-blue-700 dark:disabled:bg-gray-700`}
            >
                NEXT
            </button>
        </div>
    );
};

export default ProductPagination;