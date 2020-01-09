module.exports = {
  js: [{
    source: "./index.js",
    target: "./dist/bundle.js"
  }],
  sass: [{
    source: "./src/styles/base.sass",
    target: "./dist/base.css"
  },
  {
    source: "./src/styles/bootstrap-4.sass",
    target: "./dist/bootstrap-4.css"
  }]
};
