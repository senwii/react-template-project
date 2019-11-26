const fs = require('fs')
const webpack = require('webpack')

const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const projectName = require('../package.json').name

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

// 设置环境变量
function setEnvVariables(option) {
  const env = {}
  Object.entries(option || {}).map(item => {
    const [key, val] = item
    process.env[key] = val
    env[`process.env.${key}`] = val
  })

  return env
}

const  { entry, htmlWebpackPluginList } = getEntries()
const env = setEnvVariables({
  OUTPUT_DIR: 'dist',
  PATH_PREFIX: `/${projectName}/`,
})

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
            const pageName = parsedUrl
              .href
              .replace(new RegExp(`^${process.env.PATH_PREFIX}`), '/')
              .split('/')[1] || ''
            if (Object.keys(entry).find(name => name === pageName) !== undefined) {
              return `${process.env.PATH_PREFIX}${pageName}`
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
          outputPath: 'assets/',
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
    new CopyWebpackPlugin([
      {
        from: 'public/*.@(png|svg|jpe?g|gif)',
        to: 'assets/',
        flatten: true,
      },
    ]),
    new webpack.DefinePlugin(env),
	]
}
