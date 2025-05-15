/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://yourdomain.com', // ← آدرس دامنه‌ی اصلی‌ات رو اینجا بذار
  generateRobotsTxt: true,           // ← robots.txt هم تولید بشه
  changefreq: 'daily',
  priority: 0.7,
  sitemapSize: 7000,
};
