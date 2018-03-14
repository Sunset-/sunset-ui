const fs = require('fs');
const webpack = require('webpack');
const path = require('path');
//css样式提取公共文件
const ExtractTextPlugin = require('extract-text-webpack-plugin');
//alias
const Alias = require('./alias');

const vendors = require('./dll');

//CLEAN
require('./clean')(path.resolve(__dirname, '../../build/dll'));

const config = {
    entry: {
        "dll": vendors
    },
    output: {
        path: 'build/dll',
        filename: '[name].[chunkhash].js',
        library: '[name]',
    },
    module: {
        loaders: [{
            test: /\.css$/,
            loader: ExtractTextPlugin.extract('style-loader', 'css-loader', 'postcss-loader')
        }, {
            test: /\.(gif|jpg|jpeg|png|woff|svg|eot|ttf)\??.*$/,
            loader: 'url-loader?limit=10000&name=./images/[name].[ext]'
        }]
    },
    plugins: [
        new webpack.DllPlugin({
            path: 'manifest.json',
            name: '[name].[chunkhash]',
            context: path.resolve(__dirname, '../../'),
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
            'window.$': 'jquery',
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new ExtractTextPlugin('[name].[chunkhash].css')
    ]
};

Alias(config);


webpack(config, function () {
    fs.readdir(path.resolve(__dirname, '../../build/dll'), function (err, fileNameArray) {
        if (err) {
            console.error(err)
        } else {
            fileNameArray.forEach(name => {
                if (name.substring(name.length - 2, name.length) == 'js') {
                    var hashCode = name.substring(4, name.length - 3);
                    require('./replace')(path.resolve(__dirname, '../../src/template/index.html'), {
                        'dll\\.?\\w*\\.': `dll.${hashCode}.`
                    });
                }
            })
        }
    });
});