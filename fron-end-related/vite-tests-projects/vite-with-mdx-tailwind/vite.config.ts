import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(async () => {
  const mdx = await import("@mdx-js/rollup");
  mdx.default();

  return {
    plugins: [react(), mdx.default()],
  };
});
