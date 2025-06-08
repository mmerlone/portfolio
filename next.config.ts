import { NextConfig } from "next";

const config: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.jsdelivr.net",
        pathname: "/gh/devicons/devicon/icons/**",
      },
      {
        protocol: "https",
        hostname: "www.vectorlogo.zone",
        pathname: "/logos/**",
      },
      {
        protocol: "https",
        hostname: "phpipam.net",
        pathname: "/wp-content/uploads/**",
      },
      {
        protocol: "https",
        hostname: "www.bacula.org",
        pathname: "/wp-content/uploads/**",
      },
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
        pathname: "/devicons/devicon/**",
      },
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
        pathname: "/cypress-io/cypress-icons/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "www.gstatic.com",
        pathname: "/analytics-suite/**",
      },
      {
        protocol: "https",
        hostname: "21st.dev",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "ui.aceternity.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "tanstack.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.framer.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "gsap.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "threejs.org",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "lucide.dev",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "usehooks-ts.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "tailwindcss.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "nextjs.org",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "vercel.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "github.com",
        pathname: "/**",
      },
    ],
  },
};

export default config;
