import type { Config } from 'tailwindcss';
import flowbitePlugin from 'flowbite/plugin';

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    'node_modules/flowbite-react/**/*.{js,ts,jsx,tsx}',
  ],
  plugins: [flowbitePlugin],
};

export default config;
