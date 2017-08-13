/**
 * Author: Alexander <Horat1us> Letnikow
 * Support: reclamme@gmail.com
 *
 * This file is Dark and full of Terrors
 */

const
    path = require('path'),
    webpack = require('webpack');

const debug = process.env.NODE_ENV !== 'production';
const env = debug ? 'local' : 'production';

const
    CleanWebpackPlugin = require('clean-webpack-plugin');

console.log("Building in " + env + " environment. Debug: " + debug.toString());

const config = {
        entry: ["./src/index.ts"],

        devServer: {
            publicPath: "/",
            contentBase: './web',
            noInfo: false,
            hot: true,
            inline: true,
            open: true,
            historyApiFallback: true,
            port: 8089,
        },

        output: {
            filename: debug ? '[name].[hash:6].js' : '[name].js',
            path: path.resolve('./build'),
            publicPath: "/",
        },

        devtool: debug ? "source-map" : false,

        resolve: {
            extensions: [".ts", ".js", ".json", ".jsx", ".tsx",],
            modules: [
                path.resolve('node_modules'),
                path.resolve('src'),
            ],
        },

        module: {
            loaders: [
                {
                    test: /\.ts$/,
                    loaders: [
                        {
                            loader: "babel-loader",
                            query: {
                                presets: ['es2015', 'stage-0', 'stage-1',],
                            },
                        },
                        "awesome-typescript-loader",
                    ],
                }
                ,
                {
                    test: /\.js$/,
                    exclude: [/node_modules/],
                    loader: "babel-loader",
                    query: {
                        presets: ['es2015', 'react', 'stage-0', 'stage-1',]
                    },
                },
                {
                    enforce: "pre",
                    test: /\.js$/,
                    loader: "source-map-loader",
                },
            ],
        },

        plugins: [
            new webpack.NamedModulesPlugin(),
            new CleanWebpackPlugin(path.resolve('./build')),
            new webpack.optimize.ModuleConcatenationPlugin(),
            new webpack.NodeEnvironmentPlugin(),
            new webpack.DefinePlugin({
                'process.env': {
                    'NODE_ENV': JSON.stringify(env),
                },
            }),
        ]
    }
;

if (debug) {
} else {
    config.plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            compressor: {
                warnings: false
            },
            minimize: true,
            comments: false,
        })
    );
}


module.exports = config;