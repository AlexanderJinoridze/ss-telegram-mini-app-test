import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      borderRadius: {
        inherit: "inherit",
        input: "14px",
      },
      padding: {
        input_border_width: "2px",
      },
      margin: {
        input_border_width: "2px",
      },
      boxShadow: {
        invalid_input: "0 0 0 2px var(--tgui--destructive_text_color) inset",
        input_border: "0 0 0 2px var(--tgui--outline)",
        input_border_focused: "0 0 0 2px var(--tgui--link_color)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
