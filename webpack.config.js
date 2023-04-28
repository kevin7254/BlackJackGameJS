import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import {createRequire} from 'module';
import {dirname, join} from 'path';
import {fileURLToPath} from 'url';

const require = createRequire(import.meta.url);
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default {
    mode: 'development',
    entry: './public/javascripts/main.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                    },
                },
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './views/index.ejs',
            templateParameters: {
                title: 'My Phaser Game',
            },
            filename: 'index.html',
            inject: 'body',
        }),
    ],
    resolve: {
        alias: {
            phaser: path.join(__dirname, 'node_modules/phaser/dist/phaser.js'),
        },
    },
};
