/**
 * Created by coffee on 08/02/2017.
 */

var path = require("path"),
    UglifyJsPlugin = require('uglifyjs-webpack-plugin'),
    fs = require("fs");


module.exports = {

    entry: {
        "modal": "./src/modal.ts"
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, "build"),
        publicPath: "/build/",

        // export to AMD, CommonJS, or window
        libraryTarget: 'umd',

        // set the following name if exporting to window
        library: 'Modal',
        libraryExport: "default",

    },

    module: {
        loaders: [
            {
                test: /\.js|/,
                loaders: ["babel-loader"],
                exclude: /node_modules/
            },
            {
                test: /\.ts/,
                loaders: ["ts-loader"],
                exclude: /node_modules/
            },
            {
                test: /\.(css|scss)$/,
                loaders: ["style-loader", "css-loader", "sass-loader"]
            },
            {
                test: /\.html$/,
                loaders: ['html-loader?exportAsEs6Default']
            },
            {
                test: /\.(png|jpg|jpeg|svg)$/,
                loaders: ["url-loader?limit=50000"]
            }
        ]
    },

    watch: false,

    devtool: "source-map",

    plugins: [
        new UglifyJsPlugin({
            sourceMap: true
        })
    ],

    devServer: {
        contentBase: path.join(__dirname),
        compress: false,
        host: "0.0.0.0",
        port: 9010
    }

};