
module.exports = {
    plugins: [
        require('postcss-flexbugs-fixes'),
        require('postcss-preset-env')({
            stage: 4,
            autoprefixer: false,
        }),
        require('autoprefixer'),
        require('cssnano')
    ]
};