const MiniCssExtractPlugin = require('mini-css-extract-plugin');

if (process.argv[1].indexOf('build.js')!=-1) {
    // Build
    let version = process.argv[2];

    module.exports = config => {
        config.output.filename = `hb-${version}.js`;
        config.output.chunkFilename = `hb-${version}.js`;

        config.plugins = [
            new MiniCssExtractPlugin({
                filename: `hb-${version}.css`,
                chunkFilename: `hb-${version}.css`,
            })
        ]

        config.optimization.runtimeChunk = false;
        config.optimization.splitChunks = {
            cacheGroups: {
                default: false
            }
        };
        return config;
    };
} else {
    // Start
    module.exports = config => {
        config.optimization.runtimeChunk = false;
        config.optimization.splitChunks = {
            cacheGroups: {
                default: false
            }
        };
        return config;
    };
}

