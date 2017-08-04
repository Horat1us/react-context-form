const
    path = require('path'),
    webpack = require('webpack');

// npm dependencies
const
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
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
        extensions: [".ts", ".tsx", ".js", ".json", ".jsx", ".css",],
        modules: [
            path.resolve('node_modules'),
            path.resolve('src'),
        ],
    },

    module: {
        loaders: [
            {
                test: /\.(css|scss)$/,
                include: /node_modules/,
                loaders: [
                    'style-loader',
                    'css-loader',
                ]
            },
            {
                test: /\.woff2?$|\.ttf$|\.eot$|\.otf$/,
                loaders: [
                    'file-loader?name=[name].[hash:6].[ext]',
                ],
            },
            {
                test: /\.(gif|png|jpe?g|svg)$/i,
                loaders: [
                    'file-loader?name=[name].[hash:6].[ext]',
                ]
            },
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
        new ExtractTextPlugin({
            filename: 'styles.[hash].css',
            publicPath: '/',
        }),
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