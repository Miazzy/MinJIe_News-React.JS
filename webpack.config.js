var debug = process.env.NODE_ENV !== "production";
var webpack = require('webpack');
var path = require('path');

const BabiliPlugin = require("babili-webpack-plugin");

module.exports = {
    devServer: {
        historyApiFallback: true,
    },
    context: path.join(__dirname),
    entry: {
        app: "./src/js/root.js",
        vendor: ['react'],
    },
    module: {
        loaders: [{
            test: /\.js?$/,
            exclude: /(node_modules)/,
            loader: 'babel-loader',
            query: {
                presets: ['react', 'es2015'],
                plugins: ['react-html-attrs'],
            }
        }, {
            test: /\.css$/,
            loader: 'style-loader!css-loader'
        }, {
            test: /\.less$/,
            loader: "style-loader!css-loader!less-loader"
        }]
    },
    output: {
        path: __dirname,
        filename: 'common/[name].js'
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
        }),
        new BabiliPlugin()
    ],
};