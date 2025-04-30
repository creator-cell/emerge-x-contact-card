import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    SERVER: process.env.NODE_ENV === 'production' ? 'http://3.29.44.158:3000/v1' : 'http://localhost:8081/v1',
    GOOGLE_API_KEY: 'AIzaSyAT-a4KE6-4BsnGdk_zdZmgWqwd_oAnGQg'
  }
};

export default nextConfig;
