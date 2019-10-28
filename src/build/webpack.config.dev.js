const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

// Webpack Development Configuration

const config = {
    plugins: [
        new BrowserSyncPlugin(
            {
                host: 'localhost',
                port: 3000,
                cors: true,
                proxy: {
                    target: 'http://localhost:2368',
                    proxyReq: {
                        function (proxyReq) {
                            proxyReq.setHeader('Access-Control-Allow-Origin', '*');
                        }
                    }
                },
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
