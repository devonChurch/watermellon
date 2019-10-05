#!/usr/bin/env node

const { resolve } = require("path");
const chalk = require("chalk");

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

const {
  argv: { root, routes, output }
} = require("yargs")
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

const PINK = "#ff7bb1";
const MINT = "#cefbb7";
const EMOJI = "🍉";
const BULLET = "  • ";
const SPACER = " ";

const logo = chalk.hex(PINK).bgHex(MINT).bold(`
                 _                          _              
  __ __ __ __ _ | |_  ___  _ _  _ __   ___ | | ___  _ _    
  \\ V  V // _' ||  _|/ -_)| '_|| '  \\ / -_)| |/ _ \\| ' \\   
   \\_/\\_/ \\__,_| \\__|\\___||_|  |_|_|_|\\___||_|\\___/|_||_|  
                                                           
`);

const createTitle = value => chalk.hex(PINK)(`${EMOJI} ${value}:`);
const createArg = values =>
  chalk.hex(MINT)(
    values.reduce(
      (acc, value) =>
        // prettier-ignore
        `${acc}
${BULLET}${encodeURI(value)}`,
      ""
    )
  );

console.log(SPACER);
console.log(logo);
console.log(SPACER);
console.log(createTitle("Root"));
console.log(createArg([root]));
console.log(SPACER);
console.log(createTitle("Routes"));
console.log(createArg(routes));
console.log(SPACER);
console.log(createTitle("Output"));
console.log(createArg([output]));
console.log(SPACER);
