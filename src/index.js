const args = require("./args");
const { logIntro } = require("./logs");
const render = require("./render");

logIntro(args);
render(args);
