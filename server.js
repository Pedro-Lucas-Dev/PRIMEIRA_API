require("dotenv/config");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const pokemonController = require("./controller/pokemon.controller");

const app = express();
const port = 3001;

const FormValidation = (fields) => {
  const errors = [];

  if (fields.id === "" || isNaN(fields.id)) {
    errors.push({
      message: "Campo id está null",
      field: "id",
    });
  }
  if (fields.name === "") {
    errors.push({
      message: "Campo name está null",
      field: "name",
    });
  }
  if (fields.type === "") {
    errors.push({
      message: "Campo type está null",
      field: "type",
    });
  }
  if (fields.color === "") {
    errors.push({
      message: "Campo color está null",
      field: "color",
    });
  }
  return errors;
};

app.use(bodyParser.json());
app.use(cors());

app.get("/api/pokemon", (req, res) => {
  pokemonController.getPokemons().then((data) => res.json(data));
});

app.post("/api/pokemon", (req, res) => {
  const hasErrors = FormValidation(req.body.pokemon);
  if (hasErrors.length) {
    return res.status(422).json({ errors: hasErrors });
  }
  console.log(req.body);
  pokemonController
    .createPokemon(req.body.pokemon)
    .then((data) => res.json(data));
});

app.put("/api/pokemon", (req, res) => {
  console.log(req.body);
  pokemonController
    .updatePokemon(req.body.pokemon)
    .then((data) => res.json(data));
});

app.delete("/api/pokemon/:id", (req, res) => {
  pokemonController.deletePokemon(req.params.id).then((data) => res.json(data));
});

app.get("/", (req, res) => {
  res.send(`API Works !!!`);
});

app.listen(port, () => {
  console.log(`Server listening on the port  ${port}`);
});
