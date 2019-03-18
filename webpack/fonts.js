module.exports = function() {
    return {
        module: {
            rules: [
                {
                    test: /\.(woff|woff2|eot|ttf)$/,
                    loader: 'url-loader?limit=100000'
                }
            ]
        }
    }
}