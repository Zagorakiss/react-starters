const path = require('path');
const fs = require('fs');
const webpack = require('webpack');

const nodeModules = {};

fs.readdirSync('node_modules')
    .filter(function (x) {
        return ['.bin'].indexOf(x) === -1;
    })
    .forEach(function (mod) {
        nodeModules[mod] = 'commonjs ' + mod;
    });

const config = {
    externals: nodeModules,
    target: 'node',

    resolve: {
        extensions: ['.scss', '.js', '.jsx'],
        modules: [path.resolve(__dirname), 'node_modules'],
        alias: {
            actions: path.resolve('src/actions'),
            components: path.resolve('src/components'),
            config: path.resolve('src/config'),
            constants: path.resolve('./src/constants'),
            reducers: path.resolve('./src/reducers'),
            routes: path.resolve('./src/routes'),
            vendor: path.resolve('src/vendor'),
            utils: path.resolve('src/utils')
        }
    },

    entry: './src/config/server/index.js',

    output: {
        path: path.resolve('./build/public'),
        filename: '../server.js',
        publicPath: '/',
        libraryTarget: 'commonjs2'
    },

    module: {
        loaders: [
            {
                test: /\.json$/,
                loader: 'json-loader'
            },
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader'
                }
            }
        ]
    },

    node: {
        fs: 'empty',
        console: false,
        global: false,
        process: false,
        Buffer: false,
        __filename: false,
        __dirname: false
    }
};

const createIfDoesntExist = dest => {
    if (!fs.existsSync(dest)) {
        fs.mkdirSync(dest);
    }
}

createIfDoesntExist('./build');
createIfDoesntExist('./build/public');

module.exports = config;
