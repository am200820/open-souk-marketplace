/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    domains: ['res.cloudinary.com', 'localhost']
  },
  i18n: {
    locales: ['ar', 'en'],
    defaultLocale: 'ar'
  }
}

module.exports = nextConfig
