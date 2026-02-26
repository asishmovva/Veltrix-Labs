/** @type {import("next-sitemap").IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://chronovera.com",
  generateRobotsTxt: true,
  sitemapSize: 7000,
  exclude: ["/api/*"],
};
