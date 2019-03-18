module.exports = function(paths) {
    return {
        module: {
            rules: [
                {
                    test: /\.scss$/,
                    include: paths,
                    use: [
                        'style-loader',
                        'css-loader',
                        {
                            loader: 'postcss-loader',
                            options: {
                                ident: 'postcss',
                                plugins: [
                                    require('autoprefixer')({
                                        'browsers': ['> 1%', 'last 2 versions'],
                                    }),
                                ],
                            },
                        },
                        'sass-loader',
                    ],
                },
            ],
        },
    };
};