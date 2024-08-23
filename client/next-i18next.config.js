const path = require("path");

module.exports = {
  i18n: {
    defaultLocale: "en",
    locales: ["fr", "en", "de"],
    localePath: path.resolve("./public/locales"),
  },
  react: {
    useSuspense: false,
  },
};
