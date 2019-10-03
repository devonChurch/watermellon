#!/usr/bin/env node

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
  });

console.log(
  argv.root,
  argv.routes.split(",").map(route => route.trim()),
  argv.output
);
