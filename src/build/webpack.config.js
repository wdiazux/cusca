const eslint = require('eslint');
const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CheckerPlugin } = require('awesome-typescript-loader');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// Detect Node Environment Variable and load corresponding webpack config-extras
const prod = process.argv.indexOf('-p') !== -1 || process.env.NODE_ENV === 'production';
const ENV_CONF = prod ? require('./webpack.config.prod') : require('./webpack.config.dev');

// Webpack Base Configuration
const config = {
    // Tell Webpack where to start looking for your files.
    context: path.resolve(__dirname, '../'),
    // We are looking at the Bootstrap files you installed with NPM.
    entry: {
        'main' : [
            './scripts/app.ts',
            './styles/main.scss'
        ],
        'post' : [
            './scripts/post.ts',
            './styles/post.scss'
        ],
        'grid': [
            './scripts/grid.ts'
        ]
    },
    // This next line generates source maps to help with debugging.
    // Don't want source maps? Get rid of it.
    devtool: prod ? false : 'source-map',
    // Here we're defining the output of our bundled JS.
    output: {
        filename: 'scripts/[name].js',
        // Everything gets initially output to this directory.
        // /js and /fonts are odd because of how Font Awesome builds.
        path: path.resolve(__dirname, '../../assets/')
    },
    // This is the extra rules that we have to handle our SCSS and ES2015.
    module: {
        rules: [
            {
                enforce: 'pre',
                test: /\.ts$/,
                loader: 'eslint-loader',
                exclude: /(node_modules)/,
                options: {
                    formatter: eslint.CLIEngine.getFormatter('stylish'),
                    emitWarning: process.env.NODE_ENV !== 'production',
                },
            },
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                loader: 'babel-loader',
            },
            {
                test: /\.ts$/,
                use: {
                    loader: 'awesome-typescript-loader',
                    options: {
                        useBabel: true,
                        configFileName: 'tsconfig.json',
                        babelOptions: {
                            babelrc: true,
                        },
                        babelCore: '@babel/core'
                    }
                },
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true,
                            config: { path: path.resolve(__dirname, './postcss.config.js') }
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true,
                            sassOptions: {
                                includePaths: [
                                    './node_modules/foundation-sites/scss/',
                                ]
                            }
                        },
                    }
                ]
            },
            {
                test: /\.(jpg|png|gif|svg)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'img/',
                            publicPath: '../../assets/img/'
                        }
                    }
                ]
            },
            {
                test: /\.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
                exclude: /img/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'fonts/',
                            publicPath: '../../assets/fonts/'
                        }
                    }
                ]
            },
            {
                test: /\.worker.js$/,
                loader: 'worker-loader',
                options: { publicPath: '/assets/' }
            }
        ]
    },
    optimization: {
        splitChunks: {
            automaticNameDelimiter: '-',
            name: true,
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/](jquery|foundation-sites|particles.js)[\\/]/,
                    chunks: 'all',
                    name: 'main-vendors',
                    priority: 1
                }
            }
        }
    },
    resolve: {
        modules: ['src/scripts', 'node_modules'],
        extensions: ['*', '.js', '.ts'],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: 'styles/[name].css',
            chunkFilename: 'styles/[id].css',
        }),
        new CopyWebpackPlugin([
            { from: 'fonts/**/', to: 'fonts' }
        ], { copyUnmodified: true }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
        }),
        new CheckerPlugin()
    ]
};

// Export a merge of base- and dev/prod- config
module.exports = env => {
    return merge(config, ENV_CONF);
};
