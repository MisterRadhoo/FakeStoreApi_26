const { buildUniqueSlug } = require("../../utils/customSlugify");
const { Product } = require("../../models/index");

// slugify: A and B to => a-and-b
const slugifyProduct = async (req, res, next) => {
    if (!req.body) return next();
    const reqBodySlug = req.body.slug || req.body.title;
    if (!reqBodySlug) return next();

    const excludeId = req.params.id || null;
    const uniqueSlug = await buildUniqueSlug(Product, reqBodySlug, { excludeId, maxLen: 90 });

    if (uniqueSlug) {
        req.body.slug = uniqueSlug;
    }
    return next();
};

module.exports = slugifyProduct;
