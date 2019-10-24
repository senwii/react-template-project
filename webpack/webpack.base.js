const fs = require('fs')

const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const appDirName = process.cwd()

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
				filename: `${dirName.toLowerCase()}/index.html`,
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
	// output: {
	// 	path: __dirname + '/dist',
  //   filename: '[name]/app.[hash].js',
  //   publicPath: 'https://senwii.github.io/react-template-project',
	// },
	devServer: {
		contentBase: `${appDirName}/dist`,
		compress: true,
		historyApiFallback: {
			rewrites: [
				{ from: /^\/$/, to: '/index\/index.html' },
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
					test: /node_modules\/(react|react-dom)/,
					filename: 'vendor.[hash].js',
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
		],
	},
	plugins: [
		...htmlWebpackPluginList,
		new CleanWebpackPlugin(),
		new MiniCssExtractPlugin({
			filename: '[name]/main.[hash].css',
			chunkFilename: '[name]/[id].[hash].css',
			ignoreOrder: true,
		}),
	]
}
