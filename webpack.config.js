module.exports = {
  entry: "./landing-page/src/js/app.js",
  output: {
    path: __dirname,
    filename: "main.js"
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      }
    ]
  }
};
