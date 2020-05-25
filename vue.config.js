const GoogleFontsPlugin = require("google-fonts-webpack-plugin")

module.exports = {
  "outputDir": "dist",
  "assetsDir": "static",
  "devServer": {
    "proxy": {
      "/api*": {
        "target": "http://localhost:8000/"
      }
    }
  },
  "transpileDependencies": [
    "vuetify"
  ],
}