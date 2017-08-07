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
        publicPath: './public/',
        filename: "[name].js"
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
                test: /\.css$/,
                loader: "style-loader!css-loader!autoprefixer-loader",
                exclude: [/node_modules/, /public/]
            },
            {
                test: /\.styl$/,
                 loader: "style-loader!css-loader!autoprefixer-loader!stylus-loader",
                exclude: [/node_modules/, /public/]
            },
            {
                test: /\.(jpg|jpeg)$/,
                loader: require.resolve("url-loader")
            },
            {
                test: /\.png$/,
                loader: require.resolve("url-loader") 
            },
         
            {
               test: /\.(eot|woff|woff2|ttf|otf|svg)$/,
                loader: 'url-loader?limit=30000&name=[name].[ext]'  
            },
            {
                test: /\.json$/,
                loader: "json-loader"
            }
        ],
        loaders:[
            {
                test: /\.pug$/,
                loader: "pug-loader",
                exclude: [/node_modules/, /public/],
                options: {
                    pretty:true
                }
            },
            {
                test: /\.js$/,
                loader: "babel-loader",
                exclude: [/node_modules/, /public/]
            }
        ]
    }
}

