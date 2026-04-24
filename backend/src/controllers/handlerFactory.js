const CustomApiError = require("../utils/ApiError");

// @desc Create one document
const createOne = (Model, name = "document") => async (req, res) => {
    const document = await Model.create(req.body);
    return res.status(201).json({ message: `Document ${name} has been created!`, data: document });
};

// @desc Update one document by Id
const updateOne = (Model, name = "document") => async (req, res) => {
    const document = await Model.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        context: "query",
    });

    if (!document) {
        throw CustomApiError.notFound(`${name} for this id: ${req.params.id}`, "document");
    }

    return res.status(200).json({ message: `Document ${name} has been updated successfully!`, data: document });
};

// @desc Delete one document by Id
const deleteOne = (Model, name = "document") => async (req, res) => {
    const id = req.params.id;
    const document = await Model.findByIdAndDelete(id);

    if (!document) {
        throw CustomApiError.notFound(`${name} for this id: ${id}`, "document");
    }
    return res.status(200).json({ message: `Document ${name} has been deleted successfully!`, data: document });
};

// @desc Read/Get one document by Id
const getOne = (Model, populationOpt, name = "document") => async (req, res) => {
    const id = req.params.id;
    let query = Model.findById(id);
    if (populationOpt) {
        query = query.populate(populationOpt);
    }
    const document = await query;
    if (!document) {
        throw CustomApiError.notFound(`${name} for this id: ${id}`, "document");
    }

    return res.status(200).json({ message: `Query document ${name} retrieved!`, data: document });
};

// @desc Get All documents by Model
const getAll = (Model) => async (req, res) => {
    // Filtering (price, ratingsAverage)
    const queryStringObject = { ...req.query };
    const excludedFields = ["sortedBy", "order", "limit", "page", "keyword", "fields"];
    excludedFields.forEach((field) => delete queryStringObject[field]);

    // Apply filteration using [gte, gt, le, lte]
    let queryStr = JSON.stringify(queryStringObject);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
    queryStr = JSON.parse(queryStr);

    // Pagination part 1.
    const limit = req.query.limit ? Number(req.query.limit) : 100;
    const page = req.query.page * 1 || 1;
    const skip = (page - 1) * limit;

    // Sorting
    let sortedBy = "-createdAt"; // sorted by newest
    if (req.query.sortedBy) {
        // change "price, -sold" => [price, -sold] => "price -sold";
        sortedBy = req.query.sortedBy.split(",").join(" ");
    }

    // Apply field limiting feature
    let fields = "-__v -images -createdAt -updatedAt";
    if (req.query.fields) {
        fields = req.query.fields.split(",").join(" ");
    }

    // Apply Search Feature
    let Search = {};
    if (req.query.keyword) {
        Search.$or = [
            { title: { $regex: req.query.keyword, $options: "i" } },
            { description: { $regex: req.query.keyword, $options: "i" } },
            { name: { $regex: req.query.keyword, $options: "i" } },
            { slug: { $regex: req.query.keyword, $options: "i" } },
            { country: { $regex: req.query.keyword, $options: "i" } },
            { acronymCode: { $regex: req.query.keyword, $options: "i" } }
        ];
    }

    const filterAndSearch = Search.$or ? { $and: [queryStr, Search] } : queryStr;

    // Pagination part 2.
    const totalResult = await Model.countDocuments(filterAndSearch);
    const numberOfPages = Math.max(1, Math.ceil(totalResult / limit));
    const paginationResult = {
        currentPage: page,
        limit,
        numberOfPages,
        totalResult
    };

    if (page < numberOfPages) paginationResult.nextPage = page + 1;
    if (page > 1 && page <= numberOfPages) paginationResult.prevPage = page - 1;

    const documents = await Model
        .find(filterAndSearch)
        .select(fields)
        .sort(sortedBy)
        .skip(skip)
        .limit(limit);

    return res.json({ result: documents.length, paginationResult, data: documents });
};

module.exports = { createOne, updateOne, deleteOne, getOne, getAll };



