/* eslint-disable @typescript-eslint/no-var-requires */
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    cssnano: process.env.NPM_ENV === "production" ? { preset: "default" } : false,
  },
};
