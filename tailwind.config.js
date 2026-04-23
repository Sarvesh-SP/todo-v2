/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        background: '#0a0a0f',
        surface: '#13131a',
        card: '#1c1c27',
        border: '#2a2a3d',
        primary: '#6366f1',
        'primary-foreground': '#ffffff',
        secondary: '#7c3aed',
        muted: '#3f3f5a',
        'muted-foreground': '#8b8ba8',
        foreground: '#f0f0ff',
        'foreground-dim': '#c0c0d8',
        destructive: '#ef4444',
        success: '#22c55e',
      },
    },
  },
  plugins: [],
};
