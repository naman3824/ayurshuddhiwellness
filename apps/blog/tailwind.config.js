const sharedConfig = require('@ayurshuddhi/config-tailwind');

/** @type {import('tailwindcss').Config} */
module.exports = {
  ...sharedConfig,
  content: [
    './app/**/*.{js,jsx,ts,tsx,md,mdx}',
    './components/**/*.{js,jsx,ts,tsx}',
    '../../packages/ui/**/*.{js,jsx,ts,tsx}',
  ],
};
