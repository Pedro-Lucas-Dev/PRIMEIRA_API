const mongoose = require("mongoose");

const pokemonSchema = new mongoose.Schema(
  {
    id: "string",
    name: "string",
    types: "object",
    color: "string",
    evolutions: [],
    createDate: "date",
    updatedDate: "date",
    createdBy: "string",
    updatedBy: "string",
  },
  { timestamps: { createDate: "created_at", updatedDate: "updated_at" } }
);

const Pokemon = mongoose.model("pokemon", pokemonSchema);

module.exports = {
  Pokemon,
};
