/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: '/iltb',
  async redirects() {
    return [{ source: '/', destination: '/iltb', basePath: false, permanent: false }];
  },
};

export default nextConfig;
