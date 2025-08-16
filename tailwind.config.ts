import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        spiritual: {
          // Core colors from mobile app
          background: '#FAF8F5', // Warm off-white
          foreground: '#3D3B37', // Dark charcoal
          
          // Primary palette - earthy & calming
          primary: '#7B6B5C', // Warm brown (main CTA)
          secondary: '#C4A984', // Soft tan
          tertiary: '#E5D4B1', // Light beige
          
          // Accent colors
          accent: '#9B8F7F', // Muted taupe
          'accent-light': '#D4C8B8', // Light taupe
          
          // Semantic colors
          success: '#7D8471', // Sage green
          warning: '#D4A574', // Warm amber
          error: '#C17767', // Dusty rose
          info: '#8B95A7', // Soft blue-gray
          
          // UI elements
          border: '#E8E0D5',
          card: '#FFFFFF',
          overlay: 'rgba(0, 0, 0, 0.4)',
          
          // Text variations - IMPROVED FOR BETTER VISIBILITY
          'text-light': '#6B5B4F', // Much darker for better contrast
          'text-muted': '#8B7B6B', // Darker muted text that's readable
          'text-subtle': '#A09080', // For subtle text that's still readable
          'text-dark': '#3D3B37', // Dark charcoal for light backgrounds
          
          // Gradients
          'gradient-start': '#7B6B5C',
          'gradient-end': '#C4A984',
          
          shadow: 'rgba(0, 0, 0, 0.1)',
        },
        'spiritual-dark': {
          // Core colors for dark mode
          background: '#1A1815', // Deep charcoal
          foreground: '#F5E6D3', // Warm cream
          
          // Primary palette - earthy & calming
          primary: '#C4A984', // Soft tan (main CTA)
          secondary: '#7B6B5C', // Warm brown
          tertiary: '#3D3B37', // Dark charcoal
          
          // Accent colors
          accent: '#D4C8B8', // Light taupe
          'accent-light': '#9B8F7F', // Muted taupe
          
          // Semantic colors
          success: '#9BA88C', // Light sage
          warning: '#E5C399', // Light amber
          error: '#D49A8C', // Light dusty rose
          info: '#A5AFBF', // Light blue-gray
          
          // UI elements
          border: '#2D2B27',
          card: '#252320',
          overlay: 'rgba(0, 0, 0, 0.6)',
          
          // Text variations - IMPROVED FOR BETTER VISIBILITY
          'text-light': '#E5D4B1', // Much lighter for better contrast
          'text-muted': '#C4A984', // Lighter muted text that's readable
          'text-subtle': '#A09080', // For subtle text that's still readable
          'text-dark': '#F5E6D3', // Light cream for dark backgrounds
          
          // Gradients
          'gradient-start': '#C4A984',
          'gradient-end': '#7B6B5C',
          
          shadow: 'rgba(255, 255, 255, 0.1)',
        },
      },
      animation: {
        "spin-slow": "spin 15s linear infinite",
        "spin-ouroboros": "spin 3s linear infinite",
      },
      keyframes: {
        spin: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
