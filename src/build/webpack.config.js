const path = require('path');
const merge = require('webpack-merge');
const CleanPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// Detect Node Environment Variable and load corresponing webpack config-extras
const prod = process.argv.indexOf('-p') !== -1 || process.env.NODE_ENV === 'production';
const ENV_CONF = prod ? require('./webpack.config.prod') : require('./webpack.config.dev');

// Webpack Base Configuration
const config = {
    // Tell Webpack where to start looking for your files.
    context: path.resolve(__dirname, '../'),
    // We are looking at the Bootstrap files you installed with NPM.
    entry: {
        'main' : [
            './scripts/app.js',
            './styles/main.scss'
        ]
    },
    // This next line generates source maps to help with debugging.
    // Don't want source maps? Get rid of it.
    devtool: 'source-map',
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
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.tsx?$/,
                use: {
                    loader: 'ts-loader'
                },
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                            sourceMap: true
                        }
                    },
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
                            includePaths: [
                                './node_modules/foundation-sites/scss/'
                            ]
                        }
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
                            outputPath: './img/'
                        }
                    }
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: './fonts/'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new CleanPlugin(['assets'], {
            root: path.resolve(__dirname, '../../'),
            allowExternal: true
        }),
        new MiniCssExtractPlugin({
            filename: 'styles/[name].css',
            chunkFilename: 'styles/[id].css',
        }),
        new CopyWebpackPlugin([ { from: './fonts' } ],
            { copyUnmodified: true }
        )
    ]
};

// Export a merge of base- and dev/prod- config
module.exports = env => {
    return merge(config, ENV_CONF)
};