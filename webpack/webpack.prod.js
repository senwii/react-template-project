const appDirName = process.cwd()

module.exports = {
  mode: 'production',
	output: {
		path: `${appDirName}/dist`,
    filename: '[name]/app.[hash].js',
    publicPath: 'https://senwii.github.io/awesome-drawing',
	},
}
