const webpack = require("webpack");
const path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
//alias
const Alias = require("./alias");

const config = {
    // mode: "development",
    entry: [
        "webpack/hot/only-dev-server",
        path.resolve(__dirname, "../../src/main.js")
    ],
    output: {
        path: path.resolve(__dirname, "../../build"),
        filename: "bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                use: [
                    {
                        loader: "vue-loader",
                        options: {
                            loaders: {
                                css: [
                                    "vue-style-loader",
                                    {
                                        loader: "css-loader",
                                        options: {
                                            sourceMap: true
                                        }
                                    }
                                ],
                                less: [
                                    "vue-style-loader",
                                    {
                                        loader: "css-loader",
                                        options: {
                                            sourceMap: true
                                        }
                                    },
                                    {
                                        loader: "less-loader",
                                        options: {
                                            sourceMap: true
                                        }
                                    }
                                ]
                            },
                            postLoaders: {
                                html: "babel-loader?sourceMap"
                            },
                            sourceMap: true
                        }
                    },
                    {
                        loader: "iview-loader",
                        options: {
                            prefix: false
                        }
                    }
                ]
            },
            {
                test: /\.js$/,
                exclude: /node_modules|vue\/dist|vue-router\/|vue-loader\/|vue-hot-reload-api\//,
                use: "babel-loader"
            },
            {
                test: /\.css$/,
                use: [
                    "style-loader",
                    {
                        loader: "css-loader",
                        options: {
                            minimize: true
                        }
                    }
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    "style-loader",
                    {
                        loader: "css-loader",
                        options: {
                            minimize: true
                        }
                    },
                    "sass-loader"
                ]
            },
            {
                test: /\.(gif|jpg|jpeg|png|woff|svg|eot|ttf)\??.*$/,
                use: "url-loader?limit=10000&name=./images/[name].[ext]"
            },
            {
                test: /\.(html|tpl)$/,
                loader: "html-loader"
            }
        ]
    },
    resolve: {
        alias: {},
        extensions: [".js", ".vue", ".coffee", ".html", ".css", ".scss"]
    },
    devServer: require("./devServer"),
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: '"production"'
            }
        })
    ]
};

Alias(config);

module.exports = config;
