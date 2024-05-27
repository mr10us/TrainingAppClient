import { defineConfig } from "vite";
import path from "path";
import react from "@vitejs/plugin-react";
// import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig({
  plugins: [react()], //splitVendorChunkPlugin(), visualizer()
  esbuild: {
    loader: "jsx",
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        ".js": "jsx",
      },
    },
  },
  resolve: {
    alias: {
      "@components": path.resolve(__dirname, "src/components"),
      "@pages": path.resolve(__dirname, "src/pages"),
      "@utils": path.resolve(__dirname, "src/utils"),
      "@hooks": path.resolve(__dirname, "src/hooks"),
      "@http": path.resolve(__dirname, "src/http"),
      "@consts": path.resolve(__dirname, "src/consts.js"),
    },
  },
  // build: {
  //   rollupOptions: {
  //     output: {
  //       manualChunks(id) {
  //         if (id.includes("antd")) {
  //           return "ant-design";
  //         }
  //       },
  //     },
  //   },
  // },
});
