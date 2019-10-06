const { resolve } = require("path");
const yargs = require("yargs");
const { removeEndingSlash, addStartingSlash } = require("./utils");

const sanatiseRoot = value => removeEndingSlash(value);
const sanatiseRoutes = values =>
  values
    .split(",")
    .map(value => addStartingSlash(removeEndingSlash(value.trim())));
const sanatiseOutput = value => resolve(".", removeEndingSlash(value));

const { argv } = yargs
  .example(
    'watermelon --root http://localhost:4200 --routes "/,/login,/register" --output ./dist'
  )
  .option("root", {
    demandOption: true,
    describe: "The URL to your root index.html",
    type: "string"
  })
  .option("routes", {
    demandOption: true,
    describe: "A comma-separated list of application routes to pre-render",
    type: "string"
  })
  .option("output", {
    demandOption: true,
    describe: "The directory to output the pre-rendered routes",
    type: "string"
  })
  .coerce({
    root: sanatiseRoot,
    routes: sanatiseRoutes,
    output: sanatiseOutput
  });

module.exports = argv;
