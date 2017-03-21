var path = require('path'),
    autoprefixer = require('autoprefixer'),
    precss = require('precss');
//webpack
var webpack = require('webpack');
//html模板生成
var htmlWebpackPlugin = require('html-webpack-plugin');
//css样式提取公共文件
var ExtractTextPlugin = require('extract-text-webpack-plugin');
//alias
const Alias = require('./alias');

//CLEAN
require('./clean')(path.resolve(__dirname, '../../build/scripts'));
require('./clean')(path.resolve(__dirname, '../../build/style'));

var entry = {
    index: './src/app.js',
    opc: './src/opc.js'
};
var output = {
    path: path.resolve(__dirname, '../../build'),
    filename: 'scripts/[name].[chunkhash].js'
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
            // {
            // 	test: /\.css$/,
            // 	loader: 'style-loader!css-loader!postcss-loader'
            // },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader', 'postcss-loader')
            },
            // {
            // 	test: /\.scss$/,
            // 	loader: 'style-loader!css-loader!sass-loader'
            // },
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
        new webpack.DllReferencePlugin({
            context: path.resolve(__dirname, '../../'), // 指定一个路径作为上下文环境，需要与DllPlugin的context参数保持一致，建议统一设置为项目根目录
            manifest: require('../../manifest.json'),
            name: 'dll'
        }),
        // new webpack.optimize.CommonsChunkPlugin({
        // 	name: 'vendor',
        // 	filename: 'scripts/[name].[chunkhash].js',
        // 	chunks: ['index', 'vendor']
        // }),
        new htmlWebpackPlugin({
            title: '豌豆医学影像平台',
            template: './src/template/index.html',
            filename: 'index.html',
            chunks: ['vendor', 'index']
        }),
        new htmlWebpackPlugin({
            title: '豌豆医学影像工作站',
            template: './src/template/index.html',
            filename: 'opc.html',
            chunks: ['vendor', 'opc']
        }),
        new webpack.ProvidePlugin({
            '$': "jquery"
        }),
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

Alias(config);

module.exports = config;