const fs = require('fs')

const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const appDirName = process.cwd()

process.env.OUTPUT_DIR = 'dist'

// 入口+HTML模板配置
function getEntries() {
	const entry = {}
	const htmlWebpackPluginList = []

	fs.readdirSync(`${appDirName}/src/pages`).map(dirName => {
		entry[dirName] = `${appDirName}/src/pages/${dirName}/App.js`

		htmlWebpackPluginList.push(
			new HtmlWebpackPlugin({
				chunks: [dirName, 'vendor'],
				templateParameters: {
					title: dirName,
				},
				filename: `${dirName}/index.html`,
				template: `${appDirName}/public/index.html`,
			})
		)
	})

	return {
		entry,
		htmlWebpackPluginList,
	}
}

const  { entry, htmlWebpackPluginList } = getEntries()

module.exports = {
	entry,
	devServer: {
    contentBase: `${appDirName}/${process.env.OUTPUT_DIR}`,
    // host: '172.23.62.60',
		compress: true,
		historyApiFallback: {
			rewrites: [
        {
          from: /\/([\s\S]+)\//,
          to({ parsedUrl }) {
            const pageName = parsedUrl.href.split('/')[1] || ''
            if (Object.keys(entry).find(name => name === pageName) !== undefined) {
              return `/${pageName}`
            } else {
              return '/'
            }
          }
        },
			],
    },
  },
  resolve: {
    alias: {
      '@': appDirName + '/src/',
      '@@': appDirName,
    },
  },
	optimization: {
		splitChunks: {
			cacheGroups: {
				vendor: {
					test: /node_modules\/(react|react-dom|react-router-dom)\//,
          name: 'vendor',
          chunks: 'all',
				},
			},
		},
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /(node_modules|bower_components)/,
				loader: 'babel-loader',
			},
      {
				test: /\.(less|css)$/,
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader',
					'postcss-loader',
					'less-loader',
				],
      },
      {
        test: /\.(png|svg|jpe?g|gif)$/i,
        loader: 'file-loader',
        options: {
          name: '[name].[contenthash].[ext]',
          outputPath: '/assets/',
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader',
        ],
      },
		],
	},
	plugins: [
		...htmlWebpackPluginList,
		new CleanWebpackPlugin(),
		new MiniCssExtractPlugin({
			filename: '[name]/main.[contenthash].css',
			chunkFilename: '[name]/[id].[contenthash].css',
			ignoreOrder: true,
    }),
	]
}
