const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PartSchema = new Schema({
    name: { type: String, required: true, maxLength: 50},
    type: {
        type: String,
        required: true,
        enum: ["CPU", "GPU", "RAM", "MotherBoard", "PSU"],
    },
    brand: { type: Schema.Types.ObjectId, ref: "Brand", },
    rating: { type: Number,min: 1, max: 5},
    desc: {type: String, required: true, maxLength: 1000},
});

PartSchema.virtual("url").get(function () {
    return `/part/${this._id}`;
});


module.exports = mongoose.model("Part", PartSchema);