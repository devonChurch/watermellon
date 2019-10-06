const chalk = require("chalk");

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

const createTitle = value => chalk.hex(PINK).bold(`${EMOJI} ${value}:`);
const createHeading = (heading, value) =>
  chalk.hex(PINK)(`${BULLET}${heading}: `) + chalk.hex(MINT)(encodeURI(value));
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

module.exports.logTitle = value => {
  console.log(SPACER);
  console.log(createTitle(value));
};

module.exports.logIntro = ({ root, routes, output }) => {
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
};

module.exports.logRender = (url, path) => {
  console.log(SPACER);
  console.log(createHeading("From", url));
  console.log(createHeading("To", path));
};
