const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: String,
    descripion: String,
    price: Number,
    priority: Number,
});

module.exports = mongoose.model("Product", productSchema);