const { connect, disconnect } = require("../config/db.config");
const { Pokemon } = require("../model/pokemon.model");

class PokemonController {
  constructor() {
    connect();
  }
  async getPokemons() {
    const pokemons = await Pokemon.find({});
    //console.log("pokemons:::", pokemons);
    return pokemons;
  }

  async createPokemon(newPokemon) {
    let data = {};
    try {
      data = await Pokemon.create(newPokemon);
    } catch (err) {
      console.log("Error::" + err);
    }
    return data;
  }

  async updatePokemon(pokemon) {
    let data = {};
    try {
      console.log(pokemon);
      data = await Pokemon.updateOne(pokemon);
    } catch (err) {
      console.log("Error::" + err);
    }
    return data;
  }

  async deletePokemon(id) {
    let data = {};
    try {
      data = await Pokemon.deleteOne({ _id: id });
    } catch (err) {
      console.log("Error::" + err);
    }
    return { status: `${data.deletedCount > 0 ? true : false}` };
  }
}
module.exports = new PokemonController();
