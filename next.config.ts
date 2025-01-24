/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/login',
        destination: 'http://localhost:3004/api/login',
      },
      {
        source: '/api/register',
        destination: 'http://localhost:3000/api/users',
      },
    ]
  },
}

module.exports = nextConfig