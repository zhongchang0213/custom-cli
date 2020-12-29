module.exports = {
  plugins: [
    require("autoprefixer"),
    require('cssnano')({
      preset: 'default',
    })
    // require("autoprefixer")({
    //   overrideBrowserslist: ["last 2 versions", ">1%"]
    // })
  ]
}
