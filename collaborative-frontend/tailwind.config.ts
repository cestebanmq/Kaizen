import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // As per DESIGN_GUIDELINES.md: deep blues, charcoal grays for dark mode
        // Primary Theme: Dark mode by default
        background: "var(--background)", // #0A0A0A or similar dark color
        foreground: "var(--foreground)", // #EDEDED or similar light color for text

        // Accent Colors from DESIGN_GUIDELINES.md (examples)
        accent: {
          DEFAULT: "#00FFFF", // Electric Blue (example, can be user-configurable)
          hover: "#39FF14", // Neon Green for hover or alternative accent
          secondary: "#FF00FF", // Bright Magenta for another accent
        },
        // Specific component colors if needed
        button: {
          primary: "var(--accent-default, #00FFFF)", // Default to accent or a specific color
          primaryHover: "var(--accent-hover, #39FF14)",
          secondary: "var(--foreground-muted, #A0AEC0)", // Muted foreground for secondary button text
          secondaryHover: "var(--foreground, #EDEDED)",
          secondaryBorder: "var(--accent-secondary, #FF00FF)",
        }
      },
      // Futuristic typography (as per DESIGN_GUIDELINES.md)
      fontFamily: {
        sans: ["Inter", "Roboto", "Open Sans", "sans-serif"], // Example modern sans-serif stack
      },
      // Subtle animations (as per DESIGN_GUIDELINES.md)
      transitionProperty: {
        'height': 'height',
        'spacing': 'margin, padding',
      },
      animation: {
        'subtle-pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        pulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '.7' },
        }
      }
    },
  },
  darkMode: "class", // Or 'media' if you prefer OS-level dark mode detection
  plugins: [],
};
export default config;
