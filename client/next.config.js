const createNextIntlPlugin = require("next-intl/plugin");

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
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

    config.externals = [...config.externals, { canvas: "canvas" }]; // required to make Konva & react-konva work

    return config;
  },
};

module.exports = withNextIntl(nextConfig);

// const { i18n } = require("./i18n.config");

// module.exports = {
//   i18n,
//   // webpack(config) {
//   //   config.module.rules.push({
//   //     test: /\.svg$/,
//   //     use: [
//   //       {
//   //         loader: "@svgr/webpack",
//   //         options: {
//   //           svgo: false,
//   //           svgoConfig: {
//   //             plugins: [{ removeViewBox: false }],
//   //           },
//   //         },
//   //       },
//   //     ],
//   //   });

//   //   return config;
//   // },
//   devtool: "inline-source-map",
// };
