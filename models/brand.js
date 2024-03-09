const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BrandSchema = new Schema({
    name: { type: String },
    location: { type: String, required: true, maxLength: 20},
    CEO: {type: String, maxLength: 40},
    foundYear: {type: Number},
});

BrandSchema.virtual("url").get(function () {
    return `/brand/${this._id}`;
});


module.exports = mongoose.model("Brand", BrandSchema);