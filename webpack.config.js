const path = require("path");
const webpack = require("webpack");

module.exports = {
    target: "web",

    devtool: "inline-cheap-module-source-map",
    entry: [
        path.join(__dirname, "/client/App.jsx")
    ],
    output: {
        path: path.resolve(__dirname, "assets", "js"),
        filename: "bundle.js"
    },
    plugins: [
        new webpack.SourceMapDevToolPlugin({
            filename: "[file].map",
            moduleFilenameTemplate: path.relative(path.join(__dirname, "/client/"), "[resourcePath]")
        }),
    ],
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                include: path.join(__dirname, "/client"),
                loaders: ["babel-loader"]
            },
        ]
    },
    resolve: {
        extensions: [".js", ".jsx"]
    }
};
