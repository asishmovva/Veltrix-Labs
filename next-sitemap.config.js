/** @type {import("next-sitemap").IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://veltrix-labs.vercel.app",
  generateRobotsTxt: true,
  sitemapSize: 7000,
  exclude: ["/api/*"],
};
