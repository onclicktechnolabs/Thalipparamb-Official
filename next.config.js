/** @type {import('next').NextConfig} */
// const { i18n } = require("./next-i18next.config");

const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ["ml", "en"],
    defaultLocale: "ml",
    localeDetection: false,
  },
};

module.exports = nextConfig;
