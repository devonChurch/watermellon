const plugins = ["@babel/plugin-transform-runtime"];

const presets = [
  [
    "@babel/env",
    {
      targets: {
        node: "10"
      }
    }
  ]
];

module.exports = { plugins, presets };
