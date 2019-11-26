const appDirName = process.cwd()

module.exports = {
  mode: 'production',
	output: {
		path: `${appDirName}/${process.env.OUTPUT_DIR}`,
    filename: '[name]/app.[contenthash].js',
    chunkFilename: 'chunks/[name].[contenthash].js',
    publicPath: `https://senwii.github.io${process.env.PATH_PREFIX}`,
	},
}
