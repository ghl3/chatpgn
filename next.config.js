const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    config.resolve.alias["@/styles"] = path.join(__dirname, "styles");
    config.resolve.alias["@/components"] = path.join(__dirname, "components");
    config.resolve.alias["@/pages"] = path.join(__dirname, "pages");

    if (!isServer) {
      config.module.rules.push({
        test: /\.worker\.js$/,
        use: { loader: "worker-loader" },
      });
    }

    return config;
  },
};

module.exports = nextConfig;
