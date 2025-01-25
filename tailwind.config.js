/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: false,
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "var(--primary)",
        secondary: "var(--secondary)",
        tertiary: "var(--tertiary)",
        purple: {
          900: "var(--purple-900)",
          600: "var(--purple-600)",
          500: "var(--purple-500)",
          200: "var(--purple-200)",
          100: "var(--purple-100)",
        },
        danger: {
          100: "var( --danger-100)",
          500: "var( --danger-500)",
          900: "var( --danger-900)",
        },
        success: "var(--success)",
        green: {
          100: "var(--green-100)",
          200: "var(--green-200)",
        },
        orange: {
          100: "var(--orange-100)",
          200: "var(--orange-200)",
          300: "var(--orange-300)",
        },
        default: {
          50: "var(--default-50)",
          100: "var(--default-100)",
          200: "var(--default-200)",
          300: "var(--default-300)",
          400: "var(--default-400)",
          500: "var(--default-500)",
          600: "var(--default-600)",
          700: "var(--default-700)",
          900: "var(--default-900)",
        },
        "surface-secondary": "var(--surface-secondary)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontSize: {
        "32px": "32px",
        "10px": "10px",
      },
      boxShadow: {},
    },
  },
  daisyui: {
    themes: ["light"],
  },

  plugins: [require("daisyui")],
};
