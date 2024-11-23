import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        green: "#218c74",
        white: "#fbfffe",
        black: "#242424",
        "light-green": "#33d9b2",
        red: "#d80032",
        yellow: "#f0a202",
        blue: "#2980b9",
      },
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
      },
    },
    fontFamily: {
      sans: ["Poppins", "sans-serif"],
    },
  },
  plugins: [],
};
export default config;
