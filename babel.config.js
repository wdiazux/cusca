module.exports = function(api) {
    api.cache(true);

    const presets = [
        '@babel/preset-typescript',
        [
            '@babel/preset-env',
            {
                useBuiltIns: 'usage',
                corejs: 3,
                targets: {
                    ie: 11,
                },
            },
        ],
    ];

    return {
        presets,
    };
};
