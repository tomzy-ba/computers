const Part = require("../models/part");
const Brand = require("../models/brand");

const asyncHandler = require("express-async-handler");


exports.index = asyncHandler(async (req, res, next) => {
    // get parts, and brands
    const [
        numParts,
        numBrands,
    ] = await Promise.all([
        Part.countDocuments({}).exec(),
        Brand.countDocuments({}).exec(),
    ]);

    res.render("index", {
        title: "Computers Home",
        part_count: numParts,
        brand_count: numBrands,
    });
});

exports.part_create_get = asyncHandler(async (req, res, next) => {
    const [allParts, allBrands] = await Promise.all([
        Part.find().sort({ name: 1 }).exec(),
        Brand.find().sort({ name: 1 }).exec(),
    ]);

    res.render("part_form", {
        title: "Add a Part",
        type: allParts,
        brand: allBrands,
    });
});


exports.part_list = asyncHandler(async (req, res, next) => {
    const allParts = await Part.find({}, "name type")
    .sort({ name: 1 })
    .populate("type")
    .exec();

    res.render("part_list", {title: "Part List", part_list: allParts});
});


exports.part_detail = asyncHandler(async (req, res, next) => {
    const part = await Promise.all(
        Part.findById(req.params.id).populate("type").populate("name").exec(),
    );
    if (part === null) {
        const err = new Error("not found");
        err.status = 404;
        return next(err);
    }
    res.render("part_detail", {
        name: part.name,

    })
})

