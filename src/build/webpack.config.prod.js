const UglifyJsPlugin= require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

// Webpack Development Configuration
const config = {
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                sourceMap: true,
                extractComments: true,
                uglifyOptions: {
                    screw_ie8: true,
                    sequences: true,
                    dead_code: true,
                    drop_debugger : true,
                    conditionals: true,
                    comparisons: true,
                    booleans: true,
                    loop: true,
                    unused: true,
                    if_return: true,
                    join_vars: true,
                    drop_console: true,
                    output: {
                        comments: /@license/i
                    }
                }
            }),
            new OptimizeCSSAssetsPlugin({
                cssProcessor: require('cssnano'),
                cssProcessorPluginOptions: {
                    preset: ['default', { discardComments: { removeAll: true } }],
                }
            })
        ]
    }
};

module.exports = config;
