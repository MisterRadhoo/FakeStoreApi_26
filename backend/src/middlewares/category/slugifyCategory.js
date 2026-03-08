const { buildUniqueSlug } = require("../../utils/customSlugify");
const { Category } = require("../../models/index");

// slugify: A and B to => a-and-b
const slugifyCategory = async (req, res, next) => {
    if (!req.body) return next();
    const reqBodySlug = req.body.slug || req.body.name;
    if (!reqBodySlug) return next();

    const excludeId = req.params.id || null;
    const uniqueSlug = await buildUniqueSlug(Category, reqBodySlug, { excludeId, maxLen: 90 });

    if (uniqueSlug) {
        req.body.slug = uniqueSlug;
    }
    return next();
};

module.exports = slugifyCategory;
