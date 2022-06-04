/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
        'ipfs.infura.io',
        'i3al5fdaammr.usemoralis.com',
        'avatar.tobi.sh'
    ]
  }
}

module.exports = nextConfig
