/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/((?!maintenance).*)', // Redirects all routes except maintenance.html
        destination: '/maintenance.html',
        permanent: false, // Use temporary redirect (302)
      },
    ];
  },
};
 
module.exports = nextConfig; 