import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/cripto/",
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        silenceDeprecations: [
          "color-functions",
          "global-builtin",
          "if-function",
          "import",
          "slash-div",
        ],
      },
    },
  },
});
