const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const postcssAssets = require('postcss-assets');
const postcssNext = require('postcss-cssnext');
const ManifestPlugin = require('webpack-manifest-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const config = {

    devtool: 'source-map',

    resolve: {
        extensions: ['.scss', '.js', '.jsx'],
        modules: [path.resolve(__dirname), 'node_modules'],
        alias: {
            actions: path.resolve('src/actions'),
            components: path.resolve('src/components'),
            config: path.resolve('src/config'),
            constants: path.resolve('src/constants'),
            reducers: path.resolve('src/reducers'),
            routes: path.resolve('src/routes'),
            vendor: path.resolve('src/vendor'),
            utils: path.resolve('src/utils')
        }
    },

    entry: {
        app: [
            'babel-polyfill',
            'react-hot-loader/patch',
            'webpack-hot-middleware/client?reload=false',
            './src/vendor/index.js',
            './src/config/client/index.js'
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
                test: /\.json$/,
                loader: 'json-loader'
            },
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.scss$/,
                loaders: [
                    'style-loader',
                    'css-loader?minimize&importLoaders=1',
                    'sass-loader'
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

copySync('./src/assets/img/favicon/favicon.ico', './build/public/favicon.ico', true);

module.exports = config;
