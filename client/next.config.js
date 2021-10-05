const { i18n } = require("./next-i18next.config");

let envVars = {};

module.exports = {
  i18n,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: "@svgr/webpack",
          options: {
            svgo: false,
            svgoConfig: {
              plugins: [{ removeViewBox: false }],
            },
          },
        },
      ],
    });

    return config;
  },
  devtool: "inline-source-map",
  env: envVars,
};
