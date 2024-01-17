const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = () => {
  return {
    mode: 'production',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js',
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './index.html',
        title: 'J.A.T.E.',
        favicon: './favicon.ico',
      }),
      new MiniCssExtractPlugin(),
      new InjectManifest({
        swSrc: './src-sw.js',
        swDest: 'service-worker.js',
      }),
      new WebpackPwaManifest({
        filename: 'manifest.json',
        inject: true,
        fingerprints: false,
        name: 'Just Another Text Editor',
        short_name: 'J.A.T.E.',
        description: 'Take notes with JasvaScript syntax highlighting!',
        start_url: './',
        publicPath: './',
        purpose: 'maskable',
        theme_color: '#225ca3',
        background_color: '#225ca3',
        orientation: 'portrait',
        display: 'standalone',
        icons: [
          {
            src: path.resolve(__dirname, './src/images/logo.png'),
            sizes: [96, 128, 192, 256, 384, 512], // specify the sizes you want
            destination: path.join('assets', 'icons'), // specify the output directory
          },
        ],
        prefer_related_applications: true,
        related_applications: [
          {
            platform: 'webapp',
            url: 'https://text-editor-5000-f2edb74933f9.herokuapp.com/',
          },
        ],
      }),
    ],
    module: {
      rules: [
        // Add CSS loaders and babel to webpack.
        {
          test: /\.css$/i,
          use: [MiniCssExtractPlugin.loader, 'css-loader'],
        },
        { test: /\.(png|svg|jpg|jpeg|gif|ico)$/i, type: 'asset/resource' },
        {
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        },
      ],
    },
  };
};