var webpack = require('webpack');
var  HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');

var paths = {
    source: path.join(__dirname, 'src/'),
    build: path.join(__dirname, 'public/')
};

module.exports = {
    entry: paths.source + 'main.js',
    output: {
        path: paths.build,
        publicPath: '/public',
        filename: "[name].js"
    },
    devServer: {
        publicPath: "/public"
    },
    plugins:[
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery"  
        })
    ],
    module: {
    
        rules:[
            {
			    test: /\.js$/,
			    include: [
				path.join(__dirname, 'src/')
			],
                enforce: "pre",
                options: {
                fix: true,
            },
			    loader: 'eslint-loader',
			    exclude: /node_modules/,
		    },
            {
                test: /\.styl$/,
                loader: "style-loader!css-loader!autoprefixer-loader!stylus-loader",
                exclude: [/node_modules/, /public/]
            },
            {
               test: /\.(eot|woff|woff2|ttf|otf|svg)$/,
                loader: 'url-loader?limit=30000&name=[name].[ext]'  
            }
        ],
        loaders:[
            {
                test: /\.js$/,
                loader: "babel-loader",
                exclude: [/node_modules/, /public/]
            }
        ]
    }
}

