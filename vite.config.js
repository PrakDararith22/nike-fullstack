import { defineConfig } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import AutoImport from "unplugin-auto-import/vite";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(__filename);

export default defineConfig({
  base: "./",
  server: {
    port: 3000,
    open: true,
  },
  resolve: {
    alias: {
      "@assets": path.resolve(dirname, "./src/assets/assets.js"),
      "@components": path.resolve(dirname, "./src/components/index.js"),
      "@data": path.resolve(dirname, "./src/data"),
    },
  },
  plugins: [
    AutoImport({
      imports: [
        {
          [path.resolve(__dirname, "src/components/base-component.js")]: ["BaseComponent"],
        },
      ],
      dts: true,
    }),
  ],
});
