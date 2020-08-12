module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  pluginOptions: {
    electronBuilder: {
      preload: 'src/preload.js',
      externals: ['silhouette.node'],
      chainWebpackMainProcess: (config) => {
        // node-loader
        config.target('node')
        config.node.set('__dirname', false)
        config.module.rule('node')
          .test(/\.node$/)
          .use('node')
          .loader('node-loader')
      }
    },
  },
}