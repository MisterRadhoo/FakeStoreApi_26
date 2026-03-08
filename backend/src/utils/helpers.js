const CustomApiError = require("./ApiError");

/**
 * // Check the ids exist in database and check duplicates in array of ids
 * @param {mongoose Model} Model 
 * @param {string|ObjectId|Array[string ObjectId] } ids 
 * @param {string} fieldName 
 * @returns {Promise<void>}
 * @throws {CustomApiError} - When duplicates are found (400) or one/more ids do not exist (404)
 */

const checkExists = async (Model, ids, fieldName) => {
    if (!ids) return;

    if (Array.isArray(ids)) {
        if (!ids.length) return;

        const uniqueIds = Array.from(new Set(ids.map((id) => String(id))));
        if (uniqueIds.length !== ids.length) {
            throw CustomApiError.badRequest(`${fieldName} contains duplicates!`, fieldName);
        }

        const count = await Model.countDocuments({ _id: { $in: uniqueIds } });
        if (count !== uniqueIds.length) {
            throw CustomApiError.notFound(`One or more ${fieldName}`, fieldName);
        }
        return;
    }

    const exist = await Model.exists({ _id: ids });
    if (!exist) {
        throw CustomApiError.notFound(`${fieldName} for this id: ${ids}`, fieldName);
    }
};


module.exports = { checkExists };


