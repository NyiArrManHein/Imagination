// /** @type {import('tailwindcss').Config} */
// export const content = [
//   "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
//   "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
//   "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
// ];
// export const theme = {
//   extend: {
//     colors: {
//       background: "var(--background)",
//       foreground: "var(--foreground)",
//     },
//   },
// };
// module.exports = {
//   content: [
//     "./src/**/*.{js,jsx,ts,tsx}",
//     "./node_modules/daisyui/dist/**/*.js",
//   ],
//   plugins: [require("daisyui")],
// };

// export const plugins = [];
/** @type {import('tailwindcss').Config} */
export const content = [
  "./src/**/*.{js,ts,jsx,tsx,mdx}",
  "./node_modules/daisyui/dist/**/*.js",
];
export const theme = {
  extend: {
    colors: {
      background: "var(--background)",
      foreground: "var(--foreground)",
    },
  },
};
export const plugins = [require("daisyui")];
