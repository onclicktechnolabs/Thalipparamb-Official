/** @type {import('next').NextConfig} */
// const { i18n } = require("./next-i18next.config");

const nextConfig = {
  reactStrictMode: true,
  i18n: {
    defaultLocale: "ml",
    locales: ["en", "ml"],
  },
};

module.exports = nextConfig;
