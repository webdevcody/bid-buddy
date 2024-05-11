/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "pub-31881cc45b684c00abbff36f8d057ffc.r2.dev",
        protocol: "https",
        port: "",
      },
    ],
  },
};

export default nextConfig;
