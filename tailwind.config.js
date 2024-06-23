/** @type {import('tailwindcss').Config} */
export const content = [
  "./app/**/*.{js,ts,jsx,tsx,mdx}",
  "./components/**/*.{js,ts,jsx,tsx,mdx}",
];
export const theme = {
  extend: {
    colors: {
      background: "hsl(var(--background))",
      foreground: "hsl(var(--foreground))",
      'blue_light': '#0086AC',
      'blue_deep': '#1181C8',
      'white': '#F2F0FC',
      'red': '#FF0000',
      btn: {
        background: "hsl(var(--btn-background))",
        "background-hover": "hsl(var(--btn-background-hover))",
      },
    },
  },
};
export const plugins = [];
