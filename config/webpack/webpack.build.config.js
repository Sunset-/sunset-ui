var path = require('path'),
    autoprefixer = require('autoprefixer'),
    precss = require('precss');
//webpack
var webpack = require('webpack');
//css样式提取公共文件
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var entry = {
    'sunset-ui': './src/sunset-ui/index.js'
};
var output = {
    path: path.resolve(__dirname, '../../dist'),
    filename: '[name].js',
    // 组件采用UMD格式打包
    libraryTarget: "umd",
    library: "sunset-ui"
};

var config = {
    entry: entry,
    output: output,
    module: {
        noParse: [],
        loaders: [{
                test: /\.vue$/,
                loader: 'vue-loader'
            }, {
                test: /\.js$/,
                exclude: /node_modules|vue\/dist|vue-router\/|vue-loader\/|vue-hot-reload-api\//,
                loader: 'babel-loader'
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader', 'postcss-loader')
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader!sass-loader')
            },
            {
                test: /\.less$/,
                loader: 'style-loader!css-loader!less-loader'
            }, {
                test: /\.(gif|jpg|jpeg|png|woff|svg|eot|ttf)\??.*$/,
                loader: 'url-loader?limit=10000&name=./images/[name].[ext]'
            }
        ]
    },
    resolve: {
        root: [process.cwd() + '/src'],
        alias: {},
        extensions: ['', '.js', '.vue', '.coffee', '.html', '.css', '.scss']
    },
    postcss: function () {
        return [autoprefixer, precss];
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new webpack.optimize.OccurenceOrderPlugin(),
        new ExtractTextPlugin("style.css")
    ]
}

module.exports = config;