const CustomApiError = require("../../utils/ApiError");
const { Category } = require("../../models/index");

// Middleware Param for request object (Nested Route)
const categoryById = async (req, res, next, id) => {

    const category = await Category.findById(id);
    if (!category) {
        throw CustomApiError.notFound(`Category id: ${id}`, "id");
    }

    req.category = category;
    next();
};


module.exports = categoryById;