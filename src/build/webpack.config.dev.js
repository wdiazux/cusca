const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

// Webpack Development Configuration

const config = {
    plugins: [
        new BrowserSyncPlugin(
            {
                host: 'localhost',
                port: 3000,
                proxy: 'http://localhost:2368',
                files: [
                    {
                        match: [
                            '**/*.hbs',
                            './src/*.*'
                        ]
                    }
                ]
            },
            {
                reload: true
            }
        )
    ],
};

module.exports = config;