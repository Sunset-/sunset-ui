var webpack = require('webpack'),
    path = require('path'),
    autoprefixer = require('autoprefixer'),
    precss = require('precss'),
    node_modules_dir = path.join(__dirname, 'node_modules');

//alias
const Alias = require('./alias');


var entry = {   
    index: ['webpack/hot/only-dev-server', './src/main.js']
};

var output = {
    path: path.resolve(__dirname, './build'),
    filename: 'bundle.js'
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
        }, {
            test: /\.css$/,
            loader: 'style-loader!css-loader!postcss-loader'
        }, {
            test: /\.scss$/,
            loader: 'style-loader!css-loader!sass-loader'
        }, {
            test: /\.less$/,
            loader: 'style-loader!css-loader!less-loader'
        }, {
            test: /\.(gif|jpg|jpeg|png|woff|svg|eot|ttf)\??.*$/,
            loader: 'url-loader?limit=10000&name=./images/[name].[ext]'
        }]
    },
    resolve: {
        root: [process.cwd() + '/src'],
        alias: {},
        extensions: ['', '.js', '.vue', '.coffee', '.html', '.css', '.scss']
    },
    devServer: require('./devServer'),
    postcss: function () {
        return [autoprefixer, precss];
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
}


Alias(config);

module.exports = config;