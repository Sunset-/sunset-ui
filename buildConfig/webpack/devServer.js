const path = require('path');

module.exports = {
    contentBase: 'build',
    hot: true,
    inline: true,
    host: '0.0.0.0',
    port: 3000,
    disableHostCheck: true,
    proxy: {
        // '/service/*': {
        //     target: 'http://localhost:9090/',
        //     pathRewrite: {
        //         '^/service': '/'
        //     },
        //     secure: false,
        //     changeOrigin: true
        // },
        // '/upload/*': {
        //     target: 'http://192.168.0.148:10003/',
        //     secure: false,
        //     changeOrigin: true

        // },
        // '/test-upload/*': {
        //     target: 'http://192.168.0.114:9120/',
        //     secure: false,
        //     changeOrigin: true,
        //     pathRewrite: {
        //         '^/test-upload': '/'
        //     }
        // }
    }
};