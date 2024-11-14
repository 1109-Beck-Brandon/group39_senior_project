const { defineConfig } = require('@vue/cli-service');
module.exports = defineConfig({
  transpileDependencies: true,

  publicPath: '/group39_senior_project/',
  outputDir: '../docs',

  pluginOptions: {
    vuetify: {
      // https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vuetify-loader
    },
  },

  chainWebpack: config => {
    config.module
      .rule('assets')
      .test(/\.(mp4|png|jpe?g|gif)$/)
      .use('file-loader')
      .loader('file-loader')
      .options({
        name: '[name].[hash:8].[ext]',
        outputPath: 'assets',
      });
  },
});
