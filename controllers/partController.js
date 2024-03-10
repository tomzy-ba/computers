const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

const Part = require("../models/part");
const Brand = require("../models/brand");

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
    const [allTypes, allBrands] = await Promise.all([
        Part.find().sort({ name: 1 }).exec(),
        Brand.find().sort({ name: 1 }).exec(),
    ]);

    res.render("part_form", {
        title: "Add a Part",
        types: allTypes,
        brands: allBrands,
    });
});


exports.part_create_post = [

    body("name", "Name must not be empty")
        .trim()
        .isLength({ min:1 })
        .escape(),

    body("type", "Type must not be empty")
        .trim()
        .isLength({ min:1 })
        .escape(),

    body("Brand", "Brand must not be empty")
        .trim()
        .isLength({ min: 1})
        .escape(),
    


    asyncHandler(async (req, res, next) => {

        const part = new Part({
            name: req.body.name,
            type: req.body.type,
            brand: req.body.brand,
            rating: req.body.rating,
            desc: req.body.desc,
        });

        await part.save();
        res.redirect(part.url);
    }),


];


exports.part_list = asyncHandler(async (req, res, next) => {
    const allParts = await Part.find()
    .populate("brand")
    .exec()

    res.render("part_list", { title: "Parts", parts: allParts });
});


exports.part_detail = asyncHandler(async (req, res, next) => {
    const part = await Part.findById(req.params.id).populate("brand").exec()

    res.render("part_detail", {
        name: part.name,
        type: part.type,
        brand: part.brand,
        rating: part.rating,
        desc: part.desc,
        id: part._id,
    })
})




exports.part_delete_get = asyncHandler(async (req, res, next) => {
    await Part.findByIdAndDelete(req.params.id);

    res.redirect("/parts")
})


exports.part_update_get = asyncHandler(async (req, res, next) => {
    const part = await Part.findById(req.params.id).populate("brand").exec();
    const brands = await Brand.find();

    res.render("part_form", {
        title: "Update Part",
        brands: brands,
        part: part,
    })
})


exports.part_update_post = [

    body("name", "Name must not be empty")
        .trim()
        .isLength({ min:1 })
        .escape(),

    body("type", "Type must not be empty")
        .trim()
        .isLength({ min:1 })
        .escape(),

    body("Brand", "Brand must not be empty")
        .trim()
        .isLength({ min: 1})
        .escape(),
    


    asyncHandler(async (req, res, next) => {

        const part = new Part({
            name: req.body.name,
            type: req.body.type,
            brand: req.body.brand,
            rating: req.body.rating,
            desc: req.body.desc,
            _id: req.params.id,
        });

        await Part.findByIdAndUpdate(req.params.id, part);
        res.redirect(part.url);
    }),


];


exports.brand_list = asyncHandler(async (req, res, next) => {
    const allBrands = await Brand.find().sort({name: 1}).exec();
    res.render("brand_list", {
        title: "Brand List",
        brand_list: allBrands, 
    });
});


exports.brand_detail = asyncHandler(async (req, res, next) => {
    const brand = await Brand.findById(req.params.id).exec();
    const parts = await Part.find({brand: req.params.id});

    res.render("brand_detail", {
        brand: brand,
        parts: parts,
    });
});


exports.brand_create_get = (req, res, next) => {
    res.render("brand_form", {title: "Add Brand"});
};


exports.brand_create_post = 

[
    body("name")
        .trim()
        .isLength({ min: 3 })
        .escape(),

    asyncHandler(async (req, res, next) => {
        const brand = new Brand({
            name: req.body.name,
            location: req.body.location,
            CEO: req.body.CEO,
            foundYear: req.body.foundYear,
        })

        await brand.save();
        res.redirect(brand.url);
    })

]