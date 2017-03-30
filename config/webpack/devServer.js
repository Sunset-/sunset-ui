const path = require('path');

module.exports = {
    contentBase: 'src/www',
    devtool: 'eval',
    hot: true,
    inline: true,
    host: '0.0.0.0',
    port: 3001,
    proxy: {
        '/service/*': {
            target: 'http://localhost:20002/',
            secure: false,
            changeOrigin: true
        },
        '/upload/*': {
            target: 'http://192.168.0.148:10003/',
            secure: false,
            changeOrigin: true

        }
    },
    outputPath: path.resolve(__dirname, './build'),
};