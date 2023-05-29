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

    //if (!isServer) {
    //  config.module.rules.push({
    //    test: /\.worker\.js$/,
    //    use: { loader: "worker-loader" },
    //  });
    // }
    // Add rule for .pegjs files
    config.module.rules.push({
      test: /\.pegjs$/,
      loader: "pegjs-loader",
      options: {
        cache: true,
        optimize: "size",
        allowedStartRules: ["start", "game", "movetext"],
      },
    });

    return config;
  },
};

module.exports = nextConfig;
