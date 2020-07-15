const path = require("path");

module.exports = {
  entry: {
      index: "./Scripts/src/index.jsx",
      header: "./Scripts/src/Component/Header.jsx",
      productDetail: "./Scripts/src/ProductDetail.jsx",
      productByCategory: "./Scripts/src/ProductByCategory.jsx",
      footer: "./Scripts/src/Component/Footer.jsx",
      dashboard: "./Scripts/src/Dashboard.jsx",
      cart: "./Scripts/src/Cart.jsx"
  },
  output: {
    path: path.resolve(__dirname, "../dist"),
    filename: "[name].js"
  },
  module: {
    rules: [
        {
          use: {
            loader: "babel-loader"
          },
          test: /\.jsx$/,
          exclude: /node_modules/ //excludes node_modules folder from being transpiled by babel. We do this because it's a waste of resources to do so.
        },
        { use: ["style-loader", "css-loader"], test: /\.css$/, }
    ]
  }
}