/** @type {import('next').NextConfig} */
const nextConfig = {
 images: {

  domains: ["images.unsplash.com"],


    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
    domains: ["lh3.googleusercontent.com"]
  },
};

export default nextConfig;
