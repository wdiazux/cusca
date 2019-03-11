const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

// Webpack Development Configuration
const config = {
    optimization: {
        minimizer: [
            new TerserPlugin({
                parallel: true,
                sourceMap: true,
                terserOptions: {
                    ecma: 6,
                    ie8: false,
                    safari10: false,
                    comments: false
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
