/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    AWS_REGION: process.env.AWS_REGION,
    AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
    LAMBDA_ARN: process.env.LAMBDA_ARN,
  },
  reactStrictMode: false,
  images: {
    domains: ['info.kingcounty.gov'],
  },
};

export default nextConfig;
