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
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
        modules: [path.resolve(__dirname), 'node_modules', 'app', 'app/config'],
    },

    entry: './app/config/server/index.tsx',

    output: {
        path: path.resolve('./build/public'),
        filename: '../server.js',
        publicPath: '/',
        libraryTarget: 'commonjs2'
    },
    node: {
        fs: "empty"
    },
    module: {
        loaders: [{
            test: /\.json$/,
            loader: 'json-loader'
        },
            {
                test: /\.jsx$/,
                loader: 'babel-loader'
            },
            {
                test: /\.tsx?$/,
                loader: 'awesome-typescript-loader',
                exclude: /node_modules/
            }]
    },

    node: {
        console: false,
        global: false,
        process: false,
        Buffer: false,
        __filename: false,
        __dirname: false
    }
};

const copySync = (src, dest, overwrite) => {
    if (overwrite && fs.existsSync(dest)) {
        fs.unlinkSync(dest);
    }
    const data = fs.readFileSync(src);
    fs.writeFileSync(dest, data);
}

const createIfDoesntExist = dest => {
    if (!fs.existsSync(dest)) {
        fs.mkdirSync(dest);
    }
}

createIfDoesntExist('./build');
createIfDoesntExist('./build/public');

module.exports = config;
