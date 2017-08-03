const
    path = require('path'),
    fs = require('fs'),
    webpack = require('webpack');

// npm dependencies
const
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    CleanWebpackPlugin = require('clean-webpack-plugin');

const debug = process.env.NODE_ENV !== 'production';

module.exports = {
    entry: "./example/src/index.tsx",

    devServer: {
        publicPath: "/",
        contentBase: './example/web',
        noInfo: false,
        hot: true,
        inline: true,
        open: true,
        historyApiFallback: true,
        port: 8088,
    },

    output: {
        filename: '[name].[hash:6].js',
        path: path.resolve('./example/web'),
        publicPath: "/",
    },

    devtool: debug ? "source-map" : null,

    resolve: {
        extensions: [".ts", ".tsx", ".js", ".json", ".jsx",],
        modules: [
            path.resolve('node_modules'),
            path.resolve('src'),
        ],
    },

    module: {
        loaders: [
            {
                test: /\.tsx?$/,
                loaders: [
                    "awesome-typescript-loader"
                ],
            },
            {
                test: /\.jsx?$/,
                exclude: [/node_modules/],
                loader: "babel-loader",
                query: {
                    presets: ['es2015', 'react', 'stage-2']
                },
            },
            {enforce: "pre", test: /\.js$/, loader: "source-map-loader"}
        ],
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        new CleanWebpackPlugin([path.resolve('./example/web')]),
        new HtmlWebpackPlugin({
            title: "React Form Handler",
            template: path.resolve('./example/templates/index.ejs'),
        }),
        new webpack.optimize.ModuleConcatenationPlugin(),
        new webpack.NodeEnvironmentPlugin(),
    ]
};