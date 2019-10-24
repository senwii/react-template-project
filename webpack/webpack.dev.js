const appDirName = process.cwd()

module.exports = {
  mode: 'development',
	output: {
		path: `${appDirName}/dist`,
    filename: '[name]/app.[hash].js',
	},
}
