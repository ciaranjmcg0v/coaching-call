import type { NextConfig } from "next";
import type {
  Configuration as WebpackConfig,
  WebpackPluginInstance,
} from "webpack";

/**
 * Custom Webpack plugin for logging build errors in detail
 */
class BuildErrorLogger implements WebpackPluginInstance {
  apply(compiler: any) {
    compiler.hooks.done.tap("LogBuildError", (stats: any) => {
      if (stats.hasErrors()) {
        console.log("\n\n------------ DETAILED BUILD ERRORS ------------");
        const errors = stats.toJson({
          errors: true,
          errorDetails: true,
        }).errors;
        errors.forEach((error: any, index: number) => {
          console.log(`\nERROR ${index + 1}:`);

          // Log the module where the error occurred
          if (error.moduleName) {
            console.log(`Module: ${error.moduleName}`);
          }

          // Log the file where the error occurred
          if (error.file) {
            console.log(`File: ${error.file}`);
          }

          // Log detailed message
          console.log(`Message: ${error.message}`);

          // Log stack trace if available
          if (error.stack) {
            console.log(`\nStack trace:\n${error.stack}`);
          }

          console.log("-------------------------------------------\n");
        });
      }
    });
  }
}

const nextConfig: NextConfig = {
  reactStrictMode: true,

  // Add better error reporting for static generation
  onDemandEntries: {
    // Keep the pages in memory longer for debugging
    maxInactiveAge: 60 * 60 * 1000, // 1 hour
    // Don't dispose of pages as aggressively
    pagesBufferLength: 5,
  },

  // Custom webpack configuration with better error reporting
  webpack: (config: WebpackConfig, { isServer, dev }) => {
    // Add source maps for better debugging
    if (!config.devtool && !isServer) {
      config.devtool = "source-map";
    }

    // Add our custom error logger plugin
    if (config.plugins) {
      config.plugins.push(new BuildErrorLogger());
    }

    // Output module trace on errors
    if (config.optimization && config.optimization.moduleIds !== "named") {
      config.optimization.moduleIds = "named";
    }

    // Log more runtime details
    config.infrastructureLogging = {
      level: "error", // Change to 'verbose' for even more details
      debug: false,
    };

    return config;
  },

  // Enable more detailed logging
  logging: {
    fetches: {
      fullUrl: true,
    },
  },

  // Workaround for empty string issues in paths
  experimental: {
    // Safer static generation
    outputFileTracingIgnores: ["**/*.map"],
  },

  // Properly type-check the config file
} as NextConfig;

export default nextConfig;
