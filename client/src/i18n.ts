import { notFound } from "next/navigation";
import { getRequestConfig } from "next-intl/server";
import { locales } from "./messages/locales";

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale)) {
    notFound();
  }

  return {
    messages: (await import(`./messages/${locale}.json`)).default,
  };
});

// const path = require("path");

// module.exports = {
//   i18n: {
//     defaultLocale: "en",
//     locales: ["fr", "en"],
//     localePath: path.resolve("./public/locales"),
//   },
//   react: {
//     useSuspense: false,
//   },
// };
