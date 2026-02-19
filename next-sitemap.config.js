/** @type {import("next-sitemap").IConfig} */
module.exports = {
  siteUrl: "https://veltrixlabs.com",
  generateRobotsTxt: true,
  sitemapSize: 7000,
  exclude: ["/api/*"],
};
