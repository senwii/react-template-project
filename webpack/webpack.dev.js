const appDirName = process.cwd()

module.exports = {
  mode: 'development',
	output: {
    path: `${appDirName}/${process.env.OUTPUT_DIR}`,
    filename: '[name]/app.[contenthash].js',
    chunkFilename: 'chunks/[name].[contenthash].js',
    publicPath: process.env.PATH_PREFIX,
	},
}
