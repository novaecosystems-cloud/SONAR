/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        sonar: {
          dark: "#080c14",
          card: "#0f172a",
          border: "#1e293b",
          cyan: "#06b6d4",
          teal: "#14b8a6",
          blue: "#3b82f6",
          purple: "#8b5cf6"
        }
      },
      animation: {
        'sonar-pulse': 'sonar-pulse 2.5s cubic-bezier(0, 0, 0.2, 1) infinite',
        'radar-sweep': 'radar-sweep 3.5s linear infinite',
      },
      keyframes: {
        'sonar-pulse': {
          '0%': { transform: 'scale(0.95)', opacity: '0.8', boxShadow: '0 0 0 0 rgba(6, 182, 212, 0.7)' },
          '70%': { transform: 'scale(1.05)', opacity: '0.3', boxShadow: '0 0 0 25px rgba(6, 182, 212, 0)' },
          '100%': { transform: 'scale(0.95)', opacity: '0.8', boxShadow: '0 0 0 0 rgba(6, 182, 212, 0)' },
        },
        'radar-sweep': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        }
      }
    },
  },
  plugins: [],
};
