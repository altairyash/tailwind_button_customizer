import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
  safelist: [
    {
      pattern: /rounded-(none|sm|md|lg|xl|2xl|3xl|full)/,
    },
    {
      pattern: /backdrop-blur-(none|sm|md|lg|xl|2xl|3xl|full)/,
    },
    {
      pattern: /bg-opacity-(0|5|10|20|25|30|40|50|60|70|75|80|90|95|100)/,
    },
    {
      pattern: /mx-(4)/,
    },
  ],
}
export default config
