module.exports = function(paths) {
    return {
        module: {
            rules: [
                {
                    test: /\.css$/,
                    include: paths,
                    use: [
                        'css-loader',
                    ],
                },
            ], 
        }, 
    }; 
};