/** @type {import('next').NextConfig} */
const nextConfig = {
    // output: 'export', 
    images: {
      domains: [
        "r2-us-west.photoai.com",
        "r2-us-east.photoai.com",
        "i0.wp.com",
        "encrypted-tbn1.gstatic.com",
        "v3.fal.media"
      ],
    },
  };

export default nextConfig;
