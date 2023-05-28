const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    config.resolve.alias["@/styles"] = path.join(__dirname, "src/styles");
    config.resolve.alias["@/components"] = path.join(
      __dirname,
      "src/components"
    );
    config.resolve.alias["@/pages"] = path.join(__dirname, "src/pages");

    if (!isServer) {
      config.module.rules.push({
        test: /\.worker\.js$/,
        use: { loader: "worker-loader" },
      });
    }

    // Add pegjs-loader rule here
    config.module.rules.push({
      test: /\.pegjs$/,
      loader: "pegjs-loader",
    });

    return config;
  },
};

module.exports = nextConfig;
