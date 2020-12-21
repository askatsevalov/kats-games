module.exports = {
  chainWebpack: config => {
    config.module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap(options => {
        options.transformAssetUrls = {
          video: ['src', 'poster'],
          source: 'src',
          img: 'src',
          image: 'xlink:href',
          'b-avatar': 'src',
          'b-img': 'src',
          'b-img-lazy': 'src',
          'b-card': 'src',
          'b-card-img': 'src',
          'b-card-img-lazy': 'src',
          'b-carousel-slide': 'src',
          'b-embed': 'src',
        };
        return options;
      });
  },
};
