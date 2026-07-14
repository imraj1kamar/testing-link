// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {

//   reactCompiler: true,
// };

// export default nextConfig;



import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    // 🔥 Bas yeh line add karni hai
    qualities: [75, 85], 
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;