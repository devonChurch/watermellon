const hasStartingSlash = value => value[0] === "/";
const hasEndingSlash = value => value.substr(-1) === "/";

module.exports.removeStartingSlash = value =>
  hasStartingSlash(value) ? value.substr(1) : value;

module.exports.removeEndingSlash = value =>
  hasEndingSlash(value) ? value.substr(0, value.length - 1) : value;

module.exports.addStartingSlash = value =>
  hasStartingSlash(value) ? value : `/${value}`;
