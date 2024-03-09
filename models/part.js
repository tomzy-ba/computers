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
});

PartSchema.virtual("url").get(function () {
    return `/part/${this._id}`;
});


module.exports = mongoose.model("Part", PartSchema);