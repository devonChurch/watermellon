#!/usr/bin/env node

const { resolve } = require("path");

const hasStartingSlash = value => value[0] === "/";
const hasEndingSlash = value => value.substr(-1) === "/";

const removeStartingSlash = value =>
  hasStartingSlash(value) ? value.substr(1) : value;
const removeEndingSlash = value =>
  hasEndingSlash(value) ? value.substr(0, value.length - 1) : value;
const addStartingSlash = value =>
  hasStartingSlash(value) ? value : `/${value}`;

const sanatiseRoot = value => removeEndingSlash(value);
const sanatiseRoutes = values =>
  values
    .split(",")
    .map(value => addStartingSlash(removeEndingSlash(value.trim())));
const sanatiseOutput = value => resolve(__dirname, removeEndingSlash(value));

const { argv } = require("yargs")
  .example(
    'watermellon --root http://localhost:4200 --routes "/,/login,/register" --output ./dist'
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

console.log(
  argv.root,
  argv.routes.split(",").map(route => route.trim()),
  argv.output
);
