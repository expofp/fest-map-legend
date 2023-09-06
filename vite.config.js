import { resolve } from "path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
    build: {
        lib: {
            entry: resolve(__dirname, "src/index.ts"),
            name: "FestMapLegend",
            fileName: "index",
            format: ["es"]
        },
        minify: "terser",
        terserOptions: {
            mangle: {
                toplevel: true
            },
            compress: {
                drop_console: true,
                pure_funcs: ["console.log"]
            },
            format: {
                comments: false
            }
        }
    },
    plugins: [dts()]
});
