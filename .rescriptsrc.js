const MiniCssExtractPlugin = require('mini-css-extract-plugin');

let version = process.argv[2];

module.exports = config => {
    config.output.filename = `hb-${version}.js`;
    config.output.chunkFilename = `hb-${version}.js`;

    // config.plugins = [
    //     new MiniCssExtractPlugin({
    //         // Options similar to the same options in webpackOptions.output
    //         // both options are optional
    //         filename: `hb-${version}.css`,
    //         chunkFilename: `hb-${version}.css`,
    //     })
    // ]

    config.optimization.runtimeChunk = false;
    config.optimization.splitChunks = {
        cacheGroups: {
            default: false
        }
    };
    return config;
};