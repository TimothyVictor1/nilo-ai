
import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px'
      }
    },
    extend: {
      colors: {
        // Enhanced color palette with better contrast
        primary: {
          DEFAULT: '#6366f1', // Indigo
          light: '#a5b4fc',
          dark: '#4338ca'
        },
        secondary: {
          DEFAULT: '#22d3ee', // Cyan
          light: '#67e8f9',
          dark: '#0891b2'
        },
        background: {
          DEFAULT: '#1e293b', // Dark slate
          light: '#334155',
          dark: '#0f172a'
        },
        text: {
          DEFAULT: '#f8fafc', // Light text
          muted: '#94a3b8'
        },
        assistant: {
          primary: '#6366f1', // Matches primary indigo
          accent: '#e2e8f0', // Light slate
          text: '#1e293b', // Dark slate for text
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'nilo-gradient': 'linear-gradient(135deg, #6366f1 0%, #22d3ee 100%)',
        'avatar-gradient': 'linear-gradient(to right, #6366f1, #22d3ee)',
      },
      boxShadow: {
        'nilo-glow': '0 0 20px 5px rgba(99, 102, 241, 0.3)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'gradient-shift': 'gradient-shift 5s ease infinite',
        'ripple': 'ripple 1.5s cubic-bezier(0, 0.2, 0.8, 1) infinite',
        'slide-up': 'slide-up 0.3s ease-out forwards',
      },
      keyframes: {
        'gradient-shift': {
          '0%, 100%': { 
            'background-position': '0% 50%'
          },
          '50%': { 
            'background-position': '100% 50%'
          }
        },
        'ripple': {
          '0%': {
            'transform': 'scale(0.8)',
            'opacity': '1'
          },
          '100%': {
            'transform': 'scale(1.2)',
            'opacity': '0'
          }
        },
        'slide-up': {
          '0%': {
            'transform': 'translateY(10px)',
            'opacity': '0'
          },
          '100%': {
            'transform': 'translateY(0)',
            'opacity': '1'
          }
        }
      }
    }
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
