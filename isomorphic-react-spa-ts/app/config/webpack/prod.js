const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const postcssAssets = require('postcss-assets');
const postcssNext = require('postcss-cssnext');
const ManifestPlugin = require('webpack-manifest-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const extractCSS = new ExtractTextPlugin('styles.css');

let config = {
    bail: true,
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
        modules: [path.resolve(__dirname), 'node_modules', 'app', 'app/config'],
    },
    entry: {
        app: [
            'react',
            'react-dom',
            'react-helmet',
            'react-redux',
            'react-router',
            'react-router-config',
            'react-router-dom',
            'react-router-redux',
            'react-router-server',
            'redux',
            'redux-thunk',
            './app/vendor/index.ts',
            './app/config/client/index.tsx'
        ]
    },

    node: {
        fs: "empty"
    },

    output: {
        path: path.resolve('./build/public'),
        publicPath: '/',
        filename: 'js/[name].[chunkhash].js'
    },

    module: {
        rules: [
            {
                enforce: 'pre',
                test: /\.tsx?$/,
                loader: 'tslint-loader'
            },
            {
                test: /\.tsx?$/,
                loader: 'react-hot-loader/webpack!awesome-typescript-loader'
            },
            {
                test: /\.jsx$/,
                loader: 'babel-loader'
            },
            {
                test: /\.json$/,
                loader: 'json-loader'
            },
            {
                test: /\.css$/,
                loaders: [
                    'isomorphic-style-loader',
                    'css-loader?modules&importLoaders=2&localIdentName=[local]___[hash:base64:5]'
                ]
            },
            {
                test: /\.scss$/,
                use: extractCSS.extract(['css-loader?minimize', 'postcss-loader', 'sass-loader'])
            },
            {
                test: /\.eot(\?.*)?$/,
                loader: 'file-loader?name=fonts/[name].[hash].[ext]'
            },
            {
                test: /\.(woff|woff2)(\?.*)?$/,
                loader: 'file-loader?name=fonts/[name].[hash].[ext]'
            },
            {
                test: /\.ttf(\?.*)?$/,
                loader: 'url-loader?limit=10000&mimetype=application/octet-stream&name=fonts/[name].[hash].[ext]'
            },
            {
                test: /\.svg(\?.*)?$/,
                loader: 'url-loader?limit=10000&mimetype=image/svg+xml&name=fonts/[name].[hash].[ext]'
            },
            {
                test: /\.(jpe?g|png|gif)$/i,
                loader: 'url-loader?limit=1000&name=images/[name].[hash].[ext]'
            }
        ]
    },
    plugins: [
        extractCSS,
        new webpack.LoaderOptionsPlugin({
            debug: true,
            options: {
                tslint: {
                    failOnHint: true
                },
                postcss: function () {
                    return [
                        postcssNext(),
                        postcssAssets({
                            relative: true
                        }),
                    ];
                },
            }
        }),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new ManifestPlugin({
            fileName: '../assets.json'
        }),
        new webpack.DefinePlugin({
            'process.env': {
                BROWSER: JSON.stringify(true),
                NODE_ENV: JSON.stringify('production')
            }
        })
    ]
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

copySync('./app/assets/img/favicon/favicon.ico', './build/public/favicon.ico', true);

module.exports = config;
