"use strict";
const fs = require("fs");
const path = require("path");
const WorkboxWebpackPlugin = require("workbox-webpack-plugin");
const { URL } = require("url");

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath);

function getPublicUrlOrPath(isEnvDevelopment, homepage, envPublicUrl) {
  const stubDomain = "https://create-react-app.dev";

  if (envPublicUrl) {
    // ensure last slash exists
    envPublicUrl = envPublicUrl.endsWith("/")
      ? envPublicUrl
      : envPublicUrl + "/";

    // validate if `envPublicUrl` is a URL or path like
    // `stubDomain` is ignored if `envPublicUrl` contains a domain
    const validPublicUrl = new URL(envPublicUrl, stubDomain);

    return isEnvDevelopment
      ? envPublicUrl.startsWith(".")
        ? "/"
        : validPublicUrl.pathname
      : // Some apps do not use client-side routing with pushState.
        // For these, "homepage" can be set to "." to enable relative asset paths.
        envPublicUrl;
  }

  if (homepage) {
    // strip last slash if exists
    homepage = homepage.endsWith("/") ? homepage : homepage + "/";

    // validate if `homepage` is a URL or path like and use just pathname
    const validHomepagePathname = new URL(homepage, stubDomain).pathname;
    return isEnvDevelopment
      ? homepage.startsWith(".")
        ? "/"
        : validHomepagePathname
      : // Some apps do not use client-side routing with pushState.
      // For these, "homepage" can be set to "." to enable relative asset paths.
      homepage.startsWith(".")
      ? homepage
      : validHomepagePathname;
  }

  return "/";
}

const publicUrlOrPath = getPublicUrlOrPath(
  process.env.NODE_ENV === "development",
  require(resolveApp("package.json")).homepage,
  process.env.PUBLIC_URL
);

module.exports = function () {
  const isEnvProduction = process.env.NODE_ENV === "production";
  const shouldUseSourceMap = process.env.GENERATE_SOURCEMAP !== "false";
  const buildFolderPath = resolveApp("build");
  const devBuildFolderPath = resolveApp("public");
  const swFilePath = resolveApp("worker/sw.ts");
  return {
    mode: isEnvProduction ? "production" : "development",
    bail: isEnvProduction,
    devtool: isEnvProduction
      ? shouldUseSourceMap
        ? "source-map"
        : false
      : "cheap-module-source-map",
    entry: swFilePath,
    resolve: {
      extensions: [".ts", ".js"],
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          loader: "ts-loader",
          options: {
            configFile: "worker/tsconfig.json",
          },
        },
      ],
    },
    output: {
      path: isEnvProduction ? buildFolderPath : devBuildFolderPath,
      pathinfo: !isEnvProduction,
      filename: "service-worker.js",
      publicPath: publicUrlOrPath,
    },
    optimization: {
      minimize: isEnvProduction,
    },
    // resolve: {
    //   plugins: [
    //     new TsconfigPathsPlugin({
    //       configFile: "tsconfig.json",
    //     }),
    //   ],
    // },
    plugins: [
      new WorkboxWebpackPlugin.GenerateSW({
        swDest: "service-worker.js",
        clientsClaim: true,
        exclude: [/\.map$/, /asset-manifest\.json$/],
        navigateFallback: publicUrlOrPath + "index.html",
        navigateFallbackDenylist: [
          // Exclude URLs starting with /_, as they're likely an API call
          new RegExp("^/_"),
          // Exclude any URLs whose last part seems to be a file extension
          // as they're likely a resource and not a SPA route.
          // URLs containing a "?" character won't be blacklisted as they're likely
          // a route with query params (e.g. auth callbacks).
          new RegExp("/[^/?]+\\.[^/]+$"),
        ],
        sourcemap: false,
        skipWaiting: false,
      }),
    ],
  };
};
