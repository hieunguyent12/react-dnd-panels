/** @type {import('next').NextConfig} */
const withTM = require("next-transpile-modules")(["react-dnd-panels"]);

module.exports = withTM({
  reactStrictMode: true,
  swcMinify: true,
});
