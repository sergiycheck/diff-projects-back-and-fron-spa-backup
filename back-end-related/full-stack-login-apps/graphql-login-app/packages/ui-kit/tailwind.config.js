/** @type {import('tailwindcss').Config} */
export default {
  jit: true,
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", "./lib/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
  // corePlugins: {
  //   preflight: false,
  // },
  prefix: "uk-",
};
