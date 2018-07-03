const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const postcssAssets = require('postcss-assets');
const postcssNext = require('postcss-cssnext');
const ManifestPlugin = require('webpack-manifest-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CheckerPlugin = require('awesome-typescript-loader').CheckerPlugin;

const config = {

    devtool: 'source-map',

    resolve: {
        extensions: ['.scss', '.ts', '.tsx', '.js', '.jsx'],
        modules: [path.resolve(__dirname), 'node_modules', 'app', 'app/modules'],
    },

    entry: {
        app: [
            'babel-polyfill',
            'react-hot-loader/patch',
            'webpack-hot-middleware/client?reload=false',
            './app/vendor/index.ts',
            './app/config/client/index.tsx'
        ]
    },

    output: {
        path: path.resolve('./build/public'),
        publicPath: '/',
        filename: 'js/[name].js',
        pathinfo: true
    },

    node: {
        fs: "empty"
    },

    module: {
        rules: [
            {
                enforce: 'pre',
                test: /\.tsx?$/,
                loader: 'tslint-loader'
            },
            {
                test: /\.json$/,
                loader: 'json-loader'
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
                test: /\.scss$/,
                loaders: [
                    'style-loader',
                    'css-loader?minimize&importLoaders=1',
                    'sass-loader',
                    'postcss-loader'
                ]
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
        new CheckerPlugin(),
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
                        })
                    ];
                }
            }
        }),
        new ExtractTextPlugin('styles.css'),
        new ManifestPlugin({
            fileName: '../assets.json'
        }),
        new webpack.DefinePlugin({
            'process.env': {
                BROWSER: JSON.stringify(true),
                NODE_ENV: JSON.stringify('development')
            }
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
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
